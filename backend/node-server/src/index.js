const express = require('express');
require('dotenv').config();

//Import API Routers
const authRouter = require('./router/auth');
const home = require('./controller/home');
const courseRouter = require('./router/course/course');
const socialHandleRouter = require('./router/socialHandle');
const courseDomainRouter = require('./router/course/courseDomain');
const courseCategoryRouter = require('./router/course/courseCategory');
const qnaRouter = require('./router/qna');

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
app.use('/socialHandle', socialHandleRouter);
app.use('/courseDomain', courseDomainRouter);
app.use('/courseCategory', courseCategoryRouter);
app.use('/', qnaRouter);


//The 404 Route 
app.use('*', function(req, res,next){
  res.status(404).send({'message':'Requested resource doesn\'t exist'});
});


// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({'message':'Something went wrong in Server'})
})


// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});



