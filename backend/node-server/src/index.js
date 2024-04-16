const express = require('express');
require('dotenv').config();

//Import API Routers
const authRouter = require('./router/auth');
const home = require('./controller/home');
const courseRouter = require('./router/course');
const socialHandleRouter = require('./router/socialHandle');

// Start Express App
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Media URL
app.use('/media', express.static('media'));

// Use API Routers
app.use('/', authRouter);
app.use('/', home);
app.use('/course', courseRouter);
app.use('/', socialHandleRouter);

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
