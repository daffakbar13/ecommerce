const express = require('express')
const BrandsRoute = require('./BrandsRoute')
const CustomersRoute = require('./CustomersRoute')
const ProductsRoute = require('./ProductsRoute')
const SellingsRoute = require('./SellingsRoute')
// Router
const router = express.Router()





// Customers Route
router.use(CustomersRoute.routes)
// Products Route
router.use(ProductsRoute.routes)
// Sellings Route
router.use(SellingsRoute.routes)
// Brands Route
router.use(BrandsRoute.routes)
// Sellings Route
router.use('/:any', (req, res) => {
    res.status(404)
    res.render('pages/authentication/error404')
})





module.exports = {
    routes: router
}