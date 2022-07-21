const { findAll } = require("../models/tabel_sellings")
const folder = 'pages/sellings'

exports.Home =
    async (req, res) => {
        data = {
            sellingList: (await findAll()).rows
        }
        res.render(`${folder}/selling-list`)
    }
exports.Detail =
    async (req, res) => {
        res.render(`${folder}/selling-detail`)
    }