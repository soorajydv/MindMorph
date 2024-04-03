const express = require('express');
const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// validation functions
const validateUser = require('../validation/auth');

//POST Signup
const signupController = (request, response) => {
  const { fullName, email, password, role, avatar, birthdate } = request.body;
  const result = validateUser(fullName, email, password);
  if (result) {
    return response.json(result);
  }

  try {
    const result = pool.query(
      'SELECT * FROM Users WHERE username = $1',
      [email],
      (error, result) => {
        if (error) {
          throw error;
        } else if (result.rows.length !== 0) {
          return response.json({
            status: 'Failed',
            message: 'Email already exists',
          });
        }
      }
    );
  } catch (error) {
    throw error;
  }

  //password hashing
  bcrypt
    .genSalt(11)
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then(async (hash) => {
      pool.query(
        'INSERT INTO users (fullName, email, password,role,avatar, birthdate) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hash],
        (error, results) => {
          if (error) {
            throw error;
          }
          const insertedUser = results.rows[0];
          return response.json(insertedUser);
        }
      );
    })
    .catch((err) => console.error(err.message));
};

//POST Login
const loginController = async (request, response) => {
  const { email, password } = request.body;

  try {
    if (email === '' || password === '') {
      return response.json({
        status: 'Failed',
        message: 'Empty inputs',
      });
    }
  } catch (error) {
    throw error;
  } finally {
    bcrypt
      .genSalt(11)
      .then((salt) => {
        return bcrypt.hash(password, salt);
      })
      .then(async (hash) => {
        const result = pool.query(
          'SELECT * FROM users WHERE email = $1 OR password = $2',
          [email, hash],
          (error, result) => {
            if (error) {
              throw error;
            } else if (result.rows.length === 1) {
              return response.json({
                message: 'Login successful',
              });
            } else {
              response.status(400);
              return response.json({
                message: 'Invalid Credentials',
              });
            }
            // } else {
            //   if (result.rows[0].password === hash) {
            //     return response.json({
            //       status: 'Success',
            //       message: 'Login successful'
            //     });
            //   } else {
            //     return response.json({
            //       status: 'Failed',
            //       message: 'Invalid password'
            //     });
            //   }
            // }
          }
        );
      });
  }
};

var loginedData;
module.exports = {
  signupController,
  loginController,
  setupAuth: function (app) {
    app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: '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',
      })
    );

    /*  PASSPORT SETUP  */
    var userProfile;
    app.use(passport.initialize());
    //app.use(passport.session());

    app.get('/success', (req, res) => res.send(userProfile));
    app.get('/error', (req, res) => res.send('error logging in'));
    app.get(
      '/auth/login/google',
      passport.authenticate('google', { scope: ['profile', 'email'] })
    );

    app.get(
      '/auth/google/callback',
      passport.authenticate('google', { failureRedirect: '/error' }),
      function (req, res) {
        // Successful authentication, redirect success.
        // console.log('Successfully logged in: ',loginedData)
        // console.log('Successfully : ',userProfile)

        // // console.log('Request: ',req.user._json);
        // console.log('Request: ',req.user.sooraj);
        // res.json(loginedData)
        res.json(req.user._json);
      }
    );
  },
};

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */
const GOOGLE_CLIENT_ID =
  '894514061627-oss0rhjl80ucj4lr0avoh63r97vcrjod.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // proceed to login

      // Fetch the profile
      const { id, displayName, emails, photos, provider } = profile;
      const email = emails[0].value;
      const avatar = photos[0].value;

      // If id + oauthprovider is not present save data
      pool.query(
        'SELECT * FROM o_auth_user WHERE oauth_id = $1 AND   oauth_source = $2',
        [id, provider],
        (error, result) => {
          if (error) {
            throw error;
          } else if (result.rows.length === 0) {
            pool.query(
              'INSERT INTO o_auth_user (oauth_id,oauth_source,full_name ,email , avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
              [id, provider, displayName, email, avatar],
              (error, results) => {
                if (error) {
                  throw error;
                }

                // loginedData = {oauth_id,oauth_source,full_name ,email , avatar}
              }
            );
          }
        }
      );

      userProfile = profile;
      // userProfile.sooraj = loginedData;
      // console.log('Userprofile: ',userProfile);
      return done(null, userProfile);
    }
  )
);

//module.exports = { };
