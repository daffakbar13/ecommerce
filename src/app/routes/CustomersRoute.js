// Express
const express = require('express')
// All controller
const Customers = require('../controller/CustomersController')
// Body parser
var bodyParser = require('body-parser');
const { checkNotAuthenticated, roleAdmin } = require('../controller/AuthController');
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
router.get('/customers', checkNotAuthenticated, roleAdmin, Customers.Home)
router.get('/customers/detail', checkNotAuthenticated, roleAdmin, Customers.Detail)





module.exports = {
    routes: router
}