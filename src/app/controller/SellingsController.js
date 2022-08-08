const t_products = require("../models/tabel_products")
const t_payment = require("../models/table_payment_method")
const m_status = require("../models/master_status-sellings")
const tabel_sellings = require("../models/tabel_sellings")
const { findAll, updateStatus } = require("../models/tabel_sellings")
const { defineRole, defineUser } = require("./AuthController")
const t_users = require("../models/Users")
const folder = 'pages/sellings'

const ProductOrder = async (id_order) => {
    const invoice = (await findAll()).rows.find(e => e.id_order === id_order)
    if (invoice === undefined) {
        return
    }
    let id = []
    const product_id = JSON.parse(invoice.product_id)
    if (Array.isArray(product_id)) {
        id = product_id
    } else {
        id.push(product_id)
    }

    let qty = []
    const quantity = JSON.parse(invoice.quantity)
    if (Array.isArray(quantity)) {
        qty = quantity
    } else {
        qty.push(quantity)
    }

    let products = []
    let allProduct = (await t_products.findAll()).rows
    id.forEach(async (e) => {
        let product = allProduct.find(p => p.id == e)
        products.push(product)
    })

    return [products, qty]
}
exports.Home =
    async (req, res) => {
        const status = (await m_status.findAll()).rows
        let sellingList = (await findAll()).rows
        let stat = req.body.status
        if (stat !== undefined && stat !== 'All') {
            sellingList = (await findAll()).rows.filter(e => e.status_selling === stat)
        }
        let customer = (await t_users.findAll()).rows
        if (defineRole(req.user) === 1) {
            sellingList = (await findAll()).rows.find(e => e.email_user === req.user.email)
        }
        if (sellingList === undefined) {
            sellingList = []
        }
        data = {
            sellingList,
            status,
            stat,
            role: defineRole(req.user),
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            customer,
            url: req.url
        }
        res.render(`${folder}/selling-list`)
    }
exports.Detail =
    async (req, res) => {
        const sellings = (await findAll()).rows.find(e => e.id_order == req.body.id)
        const products = JSON.parse(sellings.product_id)
        const quantity = (await ProductOrder(req.body.id))[1]
        const status = (await m_status.findAll()).rows

        data = {
            sellings,
            products,
            quantity,
            status,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/selling-detail`)
    }
exports.Invoice =
    async (req, res, next) => {
        const invoice = (await findAll()).rows.find(e => e.id_order === req.params.any)
        if (invoice === undefined) {
            next()
            return
        }
        let id = []
        const product_id = JSON.parse(invoice.product_id)
        if (Array.isArray(product_id)) {
            id = product_id
        } else {
            id.push(product_id)
        }

        let qty = []
        const quantity = JSON.parse(invoice.quantity)
        if (Array.isArray(quantity)) {
            qty = quantity
        } else {
            qty.push(quantity)
        }

        let products = JSON.parse(invoice.product_id)

        let payment = (await t_payment.findAll()).rows.find(e => e.payment_method === invoice.payment_method)

        data = {
            invoice: invoice,
            products: products,
            quantity: qty,
            payment: payment,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }


        res.render(`${folder}/invoice`)
    }
exports.SetOrderStatus =
    async (req, res) => {
        if (req.body.status === 'Canceled') {
            const productOrder = JSON.parse((await tabel_sellings.findAll()).rows.find(e => e.id_order == req.body.id).product_id)
            const product = (await t_products.findAll()).rows
            const quantity = JSON.parse((await tabel_sellings.findAll()).rows.find(e => e.id_order == req.body.id).quantity)

            productOrder.forEach(async (e, i = 0) => {
                let stock = parseInt(quantity[i]) + parseInt(product.find(d => d.id == e.id).quantity)
                console.log(quantity[i]);
                console.log(product.find(d => d.id == e.id).quantity);
                await t_products.updateStock(
                    e.id,
                    stock
                )
                i++
            });
        }
        await updateStatus(
            req.body.id,
            req.body.status
        )
        res.redirect('/sellings')
    }