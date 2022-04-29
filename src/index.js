require("dotenv").config();
const mongoose = require('mongoose');
const app = require('../api/index');

const config = require('./config');
const boot = async () => {
  // Connect to mongodb
   console.log(`config.mongoUri=${config.mongoUri} config.mongoOptions=${config.mongoOptions.user}`);
  await mongoose.connect(config.mongoUri, config.mongoOptions, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // Start express server
  app.listen(config.port, () => {
    console.log(`Server is running on port${config.port}`);
  });
};

// const boot = async () => {
//   const URI = 'mongodb+srv://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.PROJECT_NAME + '.mongodb.net/' + process.env.MONGO_DATABASE + '?retryWrites=true&w=majority'
//   mongoose.connect(URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//   app.listen(4000, () => {
//       console.log('Server is running');
//   }); 
// };


boot();