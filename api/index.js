const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes/index');

dotenv.config();


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use('/api', apiRoutes);

(async () => {
   try {
       await mongoose.connect(process.env.MONGO_URL, {
           useNewUrlParser: true,
           useUnifiedTopology: true
       }, () => {
           console.log('Connected to Mongo!');
       });

       app.listen(PORT, () => {
           console.log(`Server has been starting on localhost:${PORT}`);
       });
   } catch (e) {
       console.log('Connection error! ==> ', e.message);
   }
})();
