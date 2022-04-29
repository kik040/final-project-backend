require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require("connect-mongo");



const config = require('../src/config');
const PORT = config.port;
const userRouter = require('../src/routes/user');

const app = express();
app.set("trust proxy",1);

if (config.isVercel) {
  app.use(async (req, res, next) => {
    console.log(`commmmmmmm config.mongoUri=${config.mongoUri},config.mongoOptions=${config.mongoOptions}`);
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://reality-final-project.vercel.app", 
    // origin: "https://therealityapp.netlify.app", 
    credentials: true,
  })
);
// app.use(
//   cors({
//     origin: '*',
//     optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   })
// );
  app.use(
    session({
      secret: process.env.SESSION_SECRET,        
      resave: true,
      saveUninitialized: true,
      cookie: {secure: true, httpOnly: true,sameSite:"none"}
    })
  );
  
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("../src/passports/passportConfig")(passport);

app.use('/users', userRouter);

module.exports = app;
