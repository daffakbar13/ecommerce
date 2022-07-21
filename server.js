// Require modules & initialize
const fs = require('fs')
var path = require('path')
const express = require('express')
const app = express()
const port = 3000
const host = 'http://localhost'
var expressLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
const baseRoute = require('./src/app/routes/routes')





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
app.use(morgan('dev'));





// APP
app.use(baseRoute.routes)





// Listen Server
app.listen(port, () => {
    console.log(`App is running at : ${host}:${port}`);
})