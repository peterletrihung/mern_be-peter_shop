const express = require('express');
const mongoose= require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyparser=require("body-parser");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

routes(app);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});