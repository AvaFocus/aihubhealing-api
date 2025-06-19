// server.js - AIHUBHEALING API - RAILWAY FIX
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'active',
    service: 'AIHUBHEALING API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      quiz: '/quiz/process',
      protocols: '/ai/protocols'
    }
  });
});

app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const dbStatusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbStatus] || 'unknown';

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      database: dbStatusText,
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

app.post('/quiz/process', (req, res) => {
  const { responses, user_email } = req.body;

  if (!responses || responses.length !== 25) {
    return res.status(400).json({ error: 'Invalid quiz data' });
  }

  const mockResult = {
    user_email,
    primary_archetype: 'Excellence Optimizer',
    scores: { alpha: 85, beta: 65, gamma: 70, delta: 75, sigma: 60 },
    processed_at: new Date().toISOString()
  };

  res.status(200).json(mockResult);
});

app.post('/ai/protocols', (req, res) => {
  const { archetype } = req.body;

  const mockProtocol = {
    archetype,
    protocol: {
      title: `${archetype} Protocol`,
      duration: '4 weeks',
      modules: ['Assessment', 'Framework', 'Implementation', 'Integration']
    },
    generated_at: new Date().toISOString()
  };

  res.status(200).json(mockProtocol);
});

app.post('/webhooks/groove', (req, res) => {
  console.log('Groove webhook received');
  res.status(200).json({ received: true });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB error:', err));

setInterval(() => {
  console.log(`[${new Date().toISOString()}] 🔄 Keep-alive - Uptime: ${Math.round(process.uptime())}s`);
}, 5 * 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AIHUBHEALING API running on port ${PORT}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// server.js - AIHUBHEALING API - RAILWAY FIX
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'active',
    service: 'AIHUBHEALING API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      quiz: '/quiz/process',
      protocols: '/ai/protocols'
    }
  });
});

app.get('/health', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const dbStatusText = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }[dbStatus] || 'unknown';

    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      uptime: process.uptime(),
      database: dbStatusText,
      memory: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      error: error.message
    });
  }
});

app.post('/quiz/process', (req, res) => {
  const { responses, user_email } = req.body;

  if (!responses || responses.length !== 25) {
    return res.status(400).json({ error: 'Invalid quiz data' });
  }

  const mockResult = {
    user_email,
    primary_archetype: 'Excellence Optimizer',
    scores: { alpha: 85, beta: 65, gamma: 70, delta: 75, sigma: 60 },
    processed_at: new Date().toISOString()
  };

  res.status(200).json(mockResult);
});

app.post('/ai/protocols', (req, res) => {
  const { archetype } = req.body;

  const mockProtocol = {
    archetype,
    protocol: {
      title: `${archetype} Protocol`,
      duration: '4 weeks',
      modules: ['Assessment', 'Framework', 'Implementation', 'Integration']
    },
    generated_at: new Date().toISOString()
  };

  res.status(200).json(mockProtocol);
});

app.post('/webhooks/groove', (req, res) => {
  console.log('Groove webhook received');
  res.status(200).json({ received: true });
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => console.error('❌ MongoDB error:', err));

setInterval(() => {
  console.log(`[${new Date().toISOString()}] 🔄 Keep-alive - Uptime: ${Math.round(process.uptime())}s`);
}, 5 * 60 * 1000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 AIHUBHEALING API running on port ${PORT}`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

