const { findAll } = require("../models/tabel_customers")
const { defineRole, defineUser } = require("./AuthController")
const folder = 'pages/customers'

exports.Home =
    async (req, res) => {
        data = {
            customers: (await findAll()).rows,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/customer-list`)
    }
exports.Detail =
    async (req, res) => {
        data = {
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/customer-detail`)
    }