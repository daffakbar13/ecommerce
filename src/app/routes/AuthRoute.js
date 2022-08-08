// Express
const express = require('express')
// All controller
const Auth = require('../controller/AuthController')
// Body parser
var bodyParser = require('body-parser');
// Router
const router = express.Router()
const passport = require('passport')
const session = require('express-session')


const initializePassport = require('../config/auth/passport.config.js');


initializePassport(passport)


router.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))


router.use(passport.initialize())
router.use(passport.session())




// Use body-parser
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json())
// Use express
router.use(express.urlencoded({ extended: true }));





// Customer lists
router.get('/login', Auth.checkAuthenticated, Auth.Login)
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }))
router.get('/users/register', Auth.checkAuthenticated, Auth.RegisterFormUser)
router.post('/users/register', Auth.RegisterUser)
router.get('/admin/register', Auth.checkAuthenticated, Auth.RegisterFormAdmin)
router.post('/admin/register', Auth.RegisterAdmin)
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash('Success', 'Success logout')
        res.redirect('/')
    })
})







module.exports = {
    routes: router
}