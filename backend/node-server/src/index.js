const express = require('express');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
require('./conf/passport')(passport);
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
require('ejs')
require('./conf/facebookPassport')(passport)
//Import API Routers
const authRouter = require('./router/auth');
const home = require('./controller/home');
const courseRouter = require('./router/course/course');
const socialHandleRouter = require('./router/socialHandle');
const courseDomainRouter = require('./router/course/courseDomain');
const courseCategoryRouter = require('./router/course/courseCategory');
const qnaRouter = require('./router/qna')
const courseReviewRouter = require('./router/course/courseReview')
const cartRouter = require('./router/cart')
const enrollCourseRouter = require('./router/enrolledCourse')
const oauthRouter = require('./router/oauth')
const oauthFbRouter = require('./router/oauthFb')


// Start Express App
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));
app.set('view engine', 'ejs');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL // Replace with your PostgreSQL connection string
});

app.use(
  session({
    store: new pgSession({
      pool, tableName: "session" // Optionally, specify the name of the session table
    }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
);


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())






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
app.use('/courseReview', courseReviewRouter)
app.use('/cart', cartRouter)
app.use('/enroll', enrollCourseRouter)
app.use('/', oauthRouter)
app.use('/', oauthFbRouter)



//The 404 Route 
app.use('*', function (req, res, next) {
  res.status(404).send({ 'message': 'Requested resource doesn\'t exist' });
});


// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send({ 'message': 'Something went wrong in Server' })
})


// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});



