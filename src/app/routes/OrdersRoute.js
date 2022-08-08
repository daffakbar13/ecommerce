// Express
const express = require('express')
// All controller
const Orders = require('../controller/OrdersController')
// Body parser
var bodyParser = require('body-parser');
const { checkNotAuthenticated, roleUser } = require('../controller/AuthController');
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
router.get('/orders', checkNotAuthenticated, roleUser, Orders.Home)
router.post('/orders/save', Orders.Save)
router.get('/orders/myOrders', Orders.myOrders)
router.post('/orders/cancel', Orders.Cancel)






module.exports = {
    routes: router
}