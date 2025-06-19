const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

// Security & logging middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aihubhealing', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connected successfully');
});

connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Import routes
const quizRoutes = require('./routes/quiz');
const webhookRoutes = require('./routes/webhooks');
const archetypeRoutes = require('./routes/archetypes');
const aiRoutes = require('./routes/ai');

// Basic routes
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'AIHUBHEALING API',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.get('/', (req, res) => {
  res.json({
    message: '🎯 AIHUBHEALING.COM API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      quiz: '/api/quiz/process',
      archetypes: '/api/archetypes',
      protocols: '/api/ai/protocols',
      webhooks: {
        groove: '/api/webhooks/groove',
        stripe: '/api/webhooks/stripe',
        n8n: '/api/webhooks/n8n'
      }
    },
    documentation: 'https://aihubhealing.com/api-docs'
  });
});

// API routes
app.use('/api/quiz', quizRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/archetypes', archetypeRoutes);
app.use('/api/ai', aiRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    requested: req.originalUrl,
    available_endpoints: ['/health', '/api/quiz', '/api/archetypes', '/api/ai', '/api/webhooks']
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

module.exports = app;
