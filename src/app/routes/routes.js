const { application } = require('express')
const express = require('express')
const { checkNotAuthenticated, roleAdmin, roleSuperAdmin } = require('../controller/AuthController')
const { logger } = require('../controller/LoggerController')
const { getProvince } = require('../helper/rajaongkir-api')
const AuthRoute = require('./AuthRoute')
const BrandsRoute = require('./BrandsRoute')
const CustomersRoute = require('./CustomersRoute')
const DashboardRoute = require('./DashboardRoute')
const OrdersRoute = require('./OrdersRoute')
const ProductsRoute = require('./ProductsRoute')
const SellingsRoute = require('./SellingsRoute')
// Router
const router = express.Router()






// Logger
router.get('/logger', checkNotAuthenticated, roleAdmin, logger)
router.get('/asd', (req, res) => {
    res.redirect('/')
})
// Customers Route
router.use(DashboardRoute.routes)
// Customers Route
router.use(CustomersRoute.routes)
// Products Route
router.use(ProductsRoute.routes)
// Sellings Route
router.use(SellingsRoute.routes)
// Brands Route
router.use(BrandsRoute.routes)
// Orders Route
router.use(OrdersRoute.routes)
// Login Route
router.use(AuthRoute.routes)
// Error Page
router.use('/:any', (req, res) => {
    res.status(404)
    res.render('pages/authentication/error404')
})





module.exports = {
    routes: router
}