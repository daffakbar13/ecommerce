// Express
const express = require('express')
// All controller
const Products = require('../controller/ProductsController')
// Body parser
var bodyParser = require('body-parser');
// Router
const router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/img/product')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.jpeg'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })






// Use body-parser
router.use(bodyParser.urlencoded({
    extended: false
}));
router.use(bodyParser.json())
// Use express
router.use(express.urlencoded({ extended: true }));





// Customer lists
router.get('/products', Products.Home)
router.get('/products/add', Products.AddProduct)
router.post('/products/add', upload.array('avatar', 1), Products.Save)
router.post('/products/edit-form', Products.EditProduct)
router.post('/products/update', upload.array('avatar', 1), Products.Update)
router.post('/products/delete', Products.Delete)





module.exports = {
    routes: router
}