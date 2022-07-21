// Express
const express = require('express')
// All controller
const Sellings = require('../controller/SellingsController')
// Body parser
var bodyParser = require('body-parser');
// Router
const router = express.Router()





// Use body-parser
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json())
// Use express
router.use(express.urlencoded({ extended: true }));





// Customer lists
router.get('/sellings', Sellings.Home)
router.get('/sellings/detail', Sellings.Detail)





module.exports = {
    routes: router
}