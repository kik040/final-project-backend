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



// const config = require('../src/config');
// const PORT = config.port;
const userRouter = require('../src/routes/user');

const app = express();
app.set("trust proxy",1);

// if (config.isVercel) {
//   app.use(async (req, res, next) => {
//     console.log(`commmmmmmm config.mongoUri=${config.mongoUri},config.mongoOptions=${config.mongoOptions}`);
//     await mongoose.connect(config.mongoUri, config.mongoOptions);
//     return next();
//   });
// }
//mongodb+srv://m001-student:<password>@sandbox.vmugl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
if (true) {
  app.use(async (req, res, next) => {
  const URI = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/' + process.env.MONGO_DATABASE + '?retryWrites=true&w=majority'
  await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
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
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET,        
  //     resave: true,
  //     saveUninitialized: true,
  //     cookie: {secure: true, httpOnly: true,sameSite:"none"}
  //   })
  // );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {secure: true, httpOnly: true, sameSite:"none"},
      store: MongoStore.create({
        mongoUrl: 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/' + process.env.MONGO_DATABASE + '?retryWrites=true&w=majority'
      })
    })
  );
  
  app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("../src/passports/passportConfig")(passport);

app.use('/users', userRouter);

module.exports = app;
