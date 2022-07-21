const { findAll } = require("../models/tabel_customers")
const folder = 'pages/customers'

exports.Home =
    async (req, res) => {
        data = {
            customers: (await findAll()).rows
        }
        res.render(`${folder}/customer-list`)
    }
exports.Detail =
    async (req, res) => {
        res.render(`${folder}/customer-detail`)
    }