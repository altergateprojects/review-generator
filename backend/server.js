require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const reviewRoutes = require('./routes/review');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html for business-specific routes
app.get('/:businessId', (req, res, next) => {
  const { businessId } = req.params;
  
  // Load config to check if businessId is valid
  delete require.cache[require.resolve('../config')];
  const config = require('../config');
  
  if (config.MULTI_BUSINESS_MODE && config.BUSINESSES) {
    const business = config.BUSINESSES.find(b => b.id === businessId);
    if (business) {
      // Valid business ID - serve index.html
      return res.sendFile(path.join(__dirname, '../frontend/index.html'));
    }
  }
  
  // Not a valid business ID - continue to next middleware (static files or 404)
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 3600000, // 1 hour
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Routes
app.use('/api', reviewRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Review Generator API running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  WARNING: GEMINI_API_KEY not set in .env file');
  } else {
    console.log('✅ Gemini API key configured');
  }
});

module.exports = app;
