const { findAll } = require("../models/table_logger")
const { defineRole, defineUser } = require("./AuthController")

const file = 'pages/logger'

exports.logger =
    async (req, res) => {
        const db = (await findAll()).rows
        data = {
            auth: req.isAuthenticated(),
            logger: db,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${file}/logger`)
    }