require('dotenv').config();
const express = require('express');
const connectToDB = require('./db')
const passport = require('passport')
const bodyParser = require('body-parser');
require("./middleware/auth")
const userRoute = require('./routes/authRoutes')
const blogRoute = require('./routes/blogRoutes')
//const authController= require('./controller/authController')
const app = express();
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoute);
//app.use('/', blogRoute)
app.use('/', passport.authenticate('jwt', { session:false }), blogRoute)

//
const PORT = process.env.PORT || 4977

const MONGO_URI = process.env.MONGO_URI


//connectToDB
connectToDB(MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})