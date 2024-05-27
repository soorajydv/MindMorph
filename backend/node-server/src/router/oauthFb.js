const passport = require('passport');
const express = require('express');
require('passport-facebook')

const router = express.Router();

router.get('/oauthFb', function (req, res) {
    res.render('login.ejs'); // load the index.ejs file
});

router.get('/profile', function (req, res) {
    res.render('profile.ejs', {
        user: req.user // get the user out of session and pass to template
    });
});

router.get('/error', function (req, res) {
    res.render('error.ejs');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
}));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/profile',
        failureRedirect: '/error'
    }));

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;