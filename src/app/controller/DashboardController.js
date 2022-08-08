const { defineRole, defineUser } = require("./AuthController")
const t_sellings = require('../models/tabel_sellings')
const t_products = require('../models/tabel_products')

const file = 'pages/dashboard'

exports.Home =
    async (req, res) => {
        if (defineRole(req.user) <= 1) {
            res.redirect('/products')
        }
        const sellings = (await t_sellings.findAll()).rows
        const delivered = (await t_sellings.deliveredOrder()).rows
        const products = (await t_products.findAll()).rows
        const stock = (await t_products.stock()).rows[0].sum
        data = {
            sellings,
            delivered,
            products,
            stock,
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            role: defineRole(req.user),
            url: req.url
        }
        res.render(`${file}/dashboard`)
    }