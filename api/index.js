const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();
const config = require('../src/config');
const PORT = config.port;
const userRouter = require('../src/routes/user');

const app = express();
app.set("trust proxy",1);
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);

if (config.isVercel) {
  app.use(async (req, res, next) => {
    await mongoose.connect(config.mongoUri, config.mongoOptions);
    return next();
  });
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
