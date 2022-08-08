// Express
const express = require('express')
// All controller
const Dashboard = require('../controller/DashboardController')
// Body parser
var bodyParser = require('body-parser');
// Router
const router = express.Router()
const multer = require('multer');
const { checkNotAuthenticated, roleAdmin } = require('../controller/AuthController');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/img/brand')
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
router.get('/', Dashboard.Home)





module.exports = {
    routes: router
}