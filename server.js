require('dotenv').config();
const express = require("express");
const cors = require('cors')
const app = express();
const shortid = require('shortid')
const Razorpay = require('razorpay')
const PORT = process.env.PORT;
const logger = require('./src/utils/logger');

const AuthRoutes = require('./src/routes/AuthRoutes') 
const couponRoutes = require('./src/routes/CouponRoutes');
app.use(require('cookie-parser')(process.env.COOKIE_SECRET));
require('./mysql');
require('./src/utils/memcache')

const  proddetRoutes  = require('./src/routes/productdetRoutes');
const  profileRoutes   = require('./src/routes/profileRoutes');
const  historyRoutes   = require('./src/routes/historyRoutes');

app.use(require('cookie-parser')());
app.use(cors())
app.use(express.json())


// const profile = require('./src/routes/profileRoutes');
// const productdet = require('./src/routes/productdetRoutes')
// const payment = require('./routes/payment');
const cookieParser = require('cookie-parser');
// app.use('/profile', profile);
// app.use('/productdet', productdet);
// app.use('/razorpay', payment);
app.use('/', AuthRoutes);
// app.use('/', uploadCouponRoutes);
app.use('/', proddetRoutes);
app.use('/', profileRoutes);
app.use('/', historyRoutes);
app.use('/', couponRoutes);

app.listen(PORT, () => {
  logger.info(`server running at 127.0.0.1:${PORT}`);
}); 