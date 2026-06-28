require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const { PORT } = process.env;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const logger = require('./src/utils/logger');

require('./src/database/mysql');
require('./src/utils/memcache');

const AuthRoutes = require('./src/routes/AuthRoutes');
const couponRoutes = require('./src/routes/CouponRoutes');
const proddetRoutes = require('./src/routes/productdetRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const historyRoutes = require('./src/routes/historyRoutes');
const contactUsRoute = require('./src/routes/ContactUsRoute');
const couponsold = require('./src/routes/CouponSoldRoutes');
const profileimage = require('./src/routes/profileimageRoute');

// ── Core Middleware ─────────────────────────────────────
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// ── Request Logging ─────────────────────────────────────
app.use((req, res, next) => {
  const start = Date.now();
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  req.requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode >= 400 ? 'warn' : 'info';
    const level = res.statusCode >= 500 ? 'error' : status;
    logger[level](`${req.method} ${req.path} ${res.statusCode} ${duration}ms`, {
      requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration,
    });
  });

  next();
});

// ── Routes ───────────────────────────────────────────────
app.use('/', AuthRoutes);
app.use('/', proddetRoutes);
app.use('/', profileRoutes);
app.use('/', historyRoutes);
app.use('/', couponRoutes);
app.use('/', contactUsRoute);
app.use('/', couponsold);
app.use('/', profileimage);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ── Global Error Handler ────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, req, res) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    requestId: req.requestId,
    path: req.path,
  });
  res.status(500).json({
    error: 'Internal server error',
    requestId: req.requestId,
  });
});

// ── 404 Handler ──────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
