const router = require('express').Router()
const passport = require('passport')

router.get('/oauth', (req, res) => {
    res.render('login')
})

router.get("/success", async (req, res) => {
    res.render('index', { userinfo: res.user })
})

router.get('/auth/logout', (req, res) => {
    res.redirect('/',)
})

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/success',
        failureRedirect: '/auth/google/failure'
    })
)

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

module.exports = router;