require('dotenv').config();
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit")
const publicRoute = require('./routes/publicRoutes')
const userRoute = require('./routes/authRoutes')
const blogRoute = require('./routes/blogRoutes')

//const authController= require('./controller/authController')
const app = express();
app.use(passport.initialize())
require("./middleware/auth")(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoute);
app.use('/', publicRoute)

app.use('/blog', passport.authenticate('jwt', { session:false }), blogRoute)

//Rate Limit
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

//
module.exports = app