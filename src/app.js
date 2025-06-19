const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Import routes
const quizRoutes = require('./routes/quiz');
const webhookRoutes = require('./routes/webhooks');
const archetypeRoutes = require('./routes/archetypes');
const aiRoutes = require('./routes/ai');

// Basic endpoints
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'AIHubHealing API', version: '1.0.0' });
});

// API routes
app.use('/api/quiz', quizRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/archetypes', archetypeRoutes);
app.use('/api/ai', aiRoutes);

module.exports = app;
