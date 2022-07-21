// Express
const express = require('express')
// All controller
const Customers = require('../controller/CustomersController')
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
router.get('/customers', Customers.Home)
router.get('/customers/detail', Customers.Detail)





module.exports = {
    routes: router
}