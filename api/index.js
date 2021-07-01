const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();


const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use('/api', apiRoutes);
app.use(errorHandler);

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
