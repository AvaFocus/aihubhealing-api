// server.js - AIHUBHEALING API - ULTRA ROBUST VERSION
console.log("🟢 Step 1: Loading server.js...");

// BASIC MODULES - NO EXTERNAL DEPENDENCIES FIRST
const express = require('express');
console.log("🟢 Step 2: Express loaded");

const app = express();
const PORT = process.env.PORT || 3000;
console.log(`🟢 Step 3: Port configured: ${PORT}`);

// BASIC MIDDLEWARE - NO EXTERNAL DEPS
app.use(express.json());
console.log("🟢 Step 4: Basic middleware loaded");

// ULTRA-ROBUST ERROR HANDLERS
process.on('uncaughtException', (error) => {
  console.error('💥 UNCAUGHT EXCEPTION:', error);
  console.error('💥 Stack:', error.stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 UNHANDLED REJECTION:', reason);
});

// REQUEST LOGGING
app.use((req, res, next) => {
  console.log(`📡 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});
console.log("🟢 Step 5: Request logging enabled");

// CRITICAL ROOT ROUTE - PREVENT RAILWAY SHUTDOWN
app.get('/', (req, res) => {
  console.log("📡 Root route accessed");
  try {
    res.status(200).json({
      status: 'ACTIVE',
      service: 'AIHUBHEALING API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      env: process.env.NODE_ENV || 'development',
      endpoints: ['/health', '/quiz/process', '/ai/protocols']
    });
  } catch (error) {
    console.error("❌ Root route error:", error);
    res.status(500).json({ error: 'Root route failed', message: error.message });
  }
});
console.log("🟢 Step 6: Root route configured");

// HEALTH CHECK - ULTRA ROBUST
app.get('/health', (req, res) => {
  console.log("📡 Health check accessed");
  try {
    const healthData = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      },
      environment: process.env.NODE_ENV || 'development',
      port: PORT,
      version: '1.0.0'
    };

    // Check if MongoDB URI exists (without connecting)
    if (process.env.MONGODB_URI) {
      healthData.mongodb_uri_present = true;
      healthData.mongodb_uri_length = process.env.MONGODB_URI.length;
    } else {
      healthData.mongodb_uri_present = false;
    }

    res.status(200).json(healthData);
  } catch (error) {
    console.error("❌ Health check error:", error);
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});
console.log("🟢 Step 7: Health route configured");

// QUIZ ENDPOINT - BASIC VERSION
app.post('/quiz/process', (req, res) => {
  console.log("📡 Quiz endpoint accessed");
  try {
    const { responses, user_email } = req.body || {};
    
    if (!responses) {
      return res.status(400).json({ 
        error: 'Missing responses',
        received_body: req.body 
      });
    }

    // Mock response for now
    const mockResult = {
      success: true,
      user_email: user_email || 'anonymous',
      primary_archetype: 'Excellence Optimizer',
      scores: {
        alpha: 85,
        beta: 65, 
        gamma: 70,
        delta: 75,
        sigma: 60
      },
      processed_at: new Date().toISOString(),
      responses_count: Array.isArray(responses) ? responses.length : 0
    };

    console.log(`✅ Quiz processed for: ${user_email}`);
    res.status(200).json(mockResult);
  } catch (error) {
    console.error("❌ Quiz processing error:", error);
    res.status(500).json({
      error: 'Quiz processing failed',
      message: error.message
    });
  }
});
console.log("🟢 Step 8: Quiz route configured");

// AI PROTOCOLS ENDPOINT
app.post('/ai/protocols', (req, res) => {
  console.log("📡 AI Protocols endpoint accessed");
  try {
    const { archetype, user_data } = req.body || {};

    const mockProtocol = {
      success: true,
      archetype: archetype || 'unknown',
      protocol: {
        title: `${archetype || 'Generic'} Optimization Protocol`,
        duration: '4 weeks',
        modules: [
          'Week 1: Assessment & Analysis',
          'Week 2: Foundation Building', 
          'Week 3: Implementation',
          'Week 4: Integration & Mastery'
        ]
      },
      generated_at: new Date().toISOString(),
      user_data: user_data || {}
    };

    console.log(`✅ Protocol generated for archetype: ${archetype}`);
    res.status(200).json(mockProtocol);
  } catch (error) {
    console.error("❌ Protocol generation error:", error);
    res.status(500).json({
      error: 'Protocol generation failed',
      message: error.message
    });
  }
});
console.log("🟢 Step 9: AI Protocols route configured");

// WEBHOOK ENDPOINTS
app.post('/webhooks/groove', (req, res) => {
  console.log("📡 Groove webhook received");
  try {
    console.log("Groove webhook payload:", JSON.stringify(req.body, null, 2));
    res.status(200).json({ 
      received: true, 
      timestamp: new Date().toISOString(),
      payload_keys: Object.keys(req.body || {})
    });
  } catch (error) {
    console.error("❌ Groove webhook error:", error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

app.post('/webhooks/stripe', (req, res) => {
  console.log("📡 Stripe webhook received");
  try {
    res.status(200).json({ 
      received: true, 
      timestamp: new Date().toISOString() 
    });
  } catch (error) {
    console.error("❌ Stripe webhook error:", error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});
console.log("🟢 Step 10: Webhook routes configured");

// MONGODB CONNECTION - OPTIONAL (won't crash if fails)
console.log("🟢 Step 11: Attempting MongoDB connection...");
if (process.env.MONGODB_URI) {
  console.log("🔍 MongoDB URI found, attempting connection...");
  try {
    const mongoose = require('mongoose');
    console.log("🟢 Mongoose loaded successfully");
    
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
      socketTimeoutMS: 10000, // 10 second socket timeout
    })
    .then(() => {
      console.log('✅ MongoDB connected successfully');
    })
    .catch(err => {
      console.error('❌ MongoDB connection failed:', err.message);
      console.log('⚠️ Continuing without MongoDB...');
    });
  } catch (error) {
    console.error('❌ Mongoose require failed:', error.message);
    console.log('⚠️ Continuing without MongoDB...');
  }
} else {
  console.log("⚠️ No MONGODB_URI found, skipping database connection");
}

// KEEP-ALIVE SYSTEM
console.log("🟢 Step 12: Setting up keep-alive system...");
const KEEP_ALIVE_INTERVAL = 5 * 60 * 1000; // 5 minutes
setInterval(() => {
  const uptime = Math.round(process.uptime());
  const memory = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  console.log(`🔄 [${new Date().toISOString()}] Keep-alive ping - Uptime: ${uptime}s - Memory: ${memory}MB`);
}, KEEP_ALIVE_INTERVAL);

// CATCH-ALL ERROR ROUTE
app.use('*', (req, res) => {
  console.log(`❓ Unknown route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    error: 'Route not found',
    method: req.method,
    path: req.originalUrl,
    available_routes: ['/', '/health', '/quiz/process', '/ai/protocols']
  });
});

// GLOBAL ERROR HANDLER
app.use((error, req, res, next) => {
  console.error('💥 Global error handler:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: error.message,
    timestamp: new Date().toISOString()
  });
});

console.log("🟢 Step 13: All routes and middleware configured");

// START SERVER - WITH COMPREHENSIVE ERROR HANDLING
console.log("🟢 Step 14: Starting server...");
try {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 AIHUBHEALING API SUCCESSFULLY STARTED`);
    console.log(`🌐 Port: ${PORT}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`💾 Memory: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📊 Available routes: /, /health, /quiz/process, /ai/protocols`);
    console.log(`✅ SERVER IS READY TO ACCEPT CONNECTIONS`);
  });

  server.on('error', (error) => {
    console.error('💥 Server startup error:', error);
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
    }
  });

} catch (error) {
  console.error('💥 Critical server startup error:', error);
  console.error('💥 Stack trace:', error.stack);
  process.exit(1);
}

console.log("🟢 Step 15: Server startup sequence completed");

// STARTUP COMPLETION LOG
setTimeout(() => {
  console.log("🎉 STARTUP COMPLETE - API READY FOR TRAFFIC");
  console.log(`🔗 Test URLs:`);
  console.log(`   GET https://aihubhealing-api-production.up.railway.app/`);
  console.log(`   GET https://aihubhealing-api-production.up.railway.app/health`);
}, 1000);

module.exports = app;
