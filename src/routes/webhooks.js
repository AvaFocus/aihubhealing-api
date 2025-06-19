const express = require('express');
const router = express.Router();
const { User, QuizResponse } = require('../models');

// POST /api/webhooks/groove - Handle Groove.cm webhooks
router.post('/groove', async (req, res) => {
  try {
    console.log('Groove webhook received:', JSON.stringify(req.body, null, 2));
    
    const { contact_email, quiz_responses, completion_time, source } = req.body;

    if (!contact_email || !quiz_responses) {
      return res.status(400).json({
        error: 'Missing required fields: contact_email and quiz_responses'
      });
    }

    // Process quiz data (same logic as direct quiz endpoint)
    const quizData = {
      responses: quiz_responses,
      user_email: contact_email,
      user_data: {
        source: source || 'groove_webhook',
        completion_time: completion_time
      }
    };

    // Here you would call the same processing logic as quiz route
    // For now, just acknowledge receipt
    res.json({
      success: true,
      message: 'Groove webhook processed successfully',
      contact_email: contact_email,
      responses_count: quiz_responses.length,
      timestamp: new Date().toISOString()
    });

    // TODO: Trigger N8N workflow or direct quiz processing

  } catch (error) {
    console.error('Groove webhook error:', error);
    res.status(500).json({
      error: 'Error processing Groove webhook',
      message: error.message
    });
  }
});

// POST /api/webhooks/stripe - Handle Stripe webhooks
router.post('/stripe', async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    const event = req.body;

    console.log('Stripe webhook received:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const customerEmail = session.customer_details.email;
        
        // Update user subscription status
        const user = await User.findOne({ email: customerEmail.toLowerCase() });
        if (user) {
          user.subscription.status = 'active';
          user.subscription.stripe_subscription_id = session.subscription;
          user.subscription.started_at = new Date();
          await user.save();
          
          console.log(`Subscription activated for user: ${customerEmail}`);
        }
        break;

      case 'invoice.payment_succeeded':
        console.log('Payment succeeded:', event.data.object.customer);
        break;

      case 'customer.subscription.deleted':
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer);
        
        const canceledUser = await User.findOne({ email: customer.email.toLowerCase() });
        if (canceledUser) {
          canceledUser.subscription.status = 'cancelled';
          await canceledUser.save();
          
          console.log(`Subscription cancelled for user: ${customer.email}`);
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });

  } catch (error) {
    console.error('Stripe webhook error:', error);
    res.status(400).json({
      error: 'Error processing Stripe webhook',
      message: error.message
    });
  }
});

// POST /api/webhooks/n8n - Handle N8N workflow triggers
router.post('/n8n', async (req, res) => {
  try {
    console.log('N8N webhook received:', JSON.stringify(req.body, null, 2));
    
    const { workflow_type, data } = req.body;

    switch (workflow_type) {
      case 'quiz_completed':
        // Trigger email sequence based on archetype
        break;
      case 'payment_received':
        // Trigger welcome sequence
        break;
      case 'protocol_request':
        // Generate AI protocol
        break;
      default:
        console.log(`Unknown N8N workflow type: ${workflow_type}`);
    }

    res.json({
      success: true,
      workflow_type: workflow_type,
      processed_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('N8N webhook error:', error);
    res.status(500).json({
      error: 'Error processing N8N webhook',
      message: error.message
    });
  }
});

module.exports = router;
