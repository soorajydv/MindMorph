const express = require('express');
const path = require('path');

//Import API Routers
const authRouter = require('./router/auth');
const home = require('./controller/home');

//DB Connection
const pool = require('./db/connection');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { setupAuth } = require('./controller/auth');
// Use setupAuth to configure authentication in your app
setupAuth(app);

// app.get('/', function(req, res) {
//   res.render('pages/auth');
// });

// Use API Routers
app.use('/auth', authRouter);
app.use('/', home);
const port = 8000;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

// random
