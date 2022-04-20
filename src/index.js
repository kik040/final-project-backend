const mongoose = require('mongoose');
const app = require('../api/index');

const config = require('./config');
const boot = async () => {
  // Connect to mongodb
   console.log(`config.mongoUri=${config.mongoUri}config.mongoOptions${config.mongoOptions.user}`);
  await mongoose.connect(config.mongoUri, config.mongoOptions, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Start express server
  app.listen(config.port, () => {
    console.log(`Server is running on port${config.port}`);
  });
};

boot();