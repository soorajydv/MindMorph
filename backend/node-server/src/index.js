const express = require('express');
require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
require('./conf/passport')(passport);
const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');
require('ejs');
require('./conf/facebookPassport')(passport);
const http = require('http');

// Import API Routers
const authRouter = require('./router/auth');
const home = require('./controller/home');
const courseRouter = require('./router/course/course');
const socialHandleRouter = require('./router/socialHandle');
const courseDomainRouter = require('./router/course/courseDomain');
const courseCategoryRouter = require('./router/course/courseCategory');
const qnaRouter = require('./router/qna');
const courseReviewRouter = require('./router/course/courseReview');
const cartRouter = require('./router/cart');
const enrollCourseRouter = require('./router/enrolledCourse');
const oauthRouter = require('./router/oauth');
const oauthFbRouter = require('./router/oauthFb');
const chat = require('./router/chat');

const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);

const initializeSocket = require('./socket/socket');
initializeSocket(server); // Pass the server instance here

// Route for sending messages
app.post('/send-message', (req, res) => {
  const { senderId, receiverId, message } = req.body;

  // Your logic to save the message to the database goes here

  // Emit the message to the receiver's socket
  io.to(receiverId).emit('chat-message', { senderId, message });

  res.json({ success: true });
});

// Route for receiving messages
app.get('/receive-message/:userId', (req, res) => {
  const userId = req.params.userId;

  // Your logic to retrieve messages for the user from the database goes here

  res.json({ messages: " Retrieved messages" });
});


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
app.use(passport.initialize());
app.use(passport.session());

// Media URL
app.use('/media', express.static('media'));
app.use('/public', express.static("public"));

// Use API Routers
app.use('/', authRouter);
app.use('/', home);
app.use('/course', courseRouter);
app.use('/socialHandle', socialHandleRouter);
app.use('/courseDomain', courseDomainRouter);
app.use('/courseCategory', courseCategoryRouter);
app.use('/', qnaRouter);
app.use('/courseReview', courseReviewRouter);
app.use('/cart', cartRouter);
app.use('/enroll', enrollCourseRouter);
app.use('/', oauthRouter);
app.use('/', oauthFbRouter);
app.use('/', chat);

// The 404 Route
app.use('*', function (req, res, next) {
  res.status(404).send({ 'message': 'Requested resource doesn\'t exist' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ 'message': 'Something went wrong in Server' });
});

// Start Server
const port = process.env.PORT || 3000; // Use a default port if not specified
server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
