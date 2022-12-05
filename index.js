require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const { PORT } = process.env;
const logger = require('./src/utils/logger');

const AuthRoutes = require('./src/routes/AuthRoutes');
const couponRoutes = require('./src/routes/CouponRoutes');
app.use(require('cookie-parser')(process.env.COOKIE_SECRET));
require('./src/database/mysql');
require('./src/utils/memcache');

const proddetRoutes = require('./src/routes/productdetRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const historyRoutes = require('./src/routes/historyRoutes');
const contactUsRoute = require('./src/routes/ContactUsRoute');
const couponsold = require('./src/routes/CouponSoldRoutes');

app.use(require('cookie-parser')());

app.use(cors());
app.use(express.json());

app.use('/', AuthRoutes);
app.use('/', proddetRoutes);
app.use('/', profileRoutes);
app.use('/', historyRoutes);
app.use('/', couponRoutes);
app.use('/', contactUsRoute);
app.use('/', couponsold);

app.listen(PORT, () => {
  logger.info(`server running at 127.0.0.1:${PORT}`);
});
