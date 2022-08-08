// Express
const express = require('express')
// All controller
const Sellings = require('../controller/SellingsController')
// Body parser
var bodyParser = require('body-parser');
const { checkNotAuthenticated, roleAdmin, roleUser } = require('../controller/AuthController');
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
router.get('/sellings', checkNotAuthenticated, roleAdmin, Sellings.Home)
router.post('/sellings', Sellings.Home)
router.post('/sellings/detail', Sellings.Detail)
router.get('/invoice/:any', checkNotAuthenticated, roleUser, Sellings.Invoice)
router.post('/sellings/status', Sellings.SetOrderStatus)





module.exports = {
    routes: router
}