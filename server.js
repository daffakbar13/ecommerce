// Require modules & initialize
const express = require('express')
const app = express()
const port = 3000
const host = 'http://localhost'
var expressLayouts = require('express-ejs-layouts');
const baseRoute = require('./src/app/routes/routes')
const session = require('express-session')
const flash = require('express-flash')
const passport = require('passport')

const initializePassport = require('./src/app/config/auth/passport.config');
const { logger } = require('./src/app/helper/logger');

initializePassport(passport)

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())




// Setup & use
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.use(express.static('public'));
app.use((req, res, next) => {
    console.log('<===========================================================>');
    console.log(Date(Date.now()));
    next()
})




app.use('/', logger)
// APP
app.use(baseRoute.routes)





// Listen Server
app.listen(port, () => {
    console.log(`App is running at : ${host}:${port}`);
})