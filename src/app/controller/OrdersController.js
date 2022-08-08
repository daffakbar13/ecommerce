const t_products = require("../models/tabel_products")
const tabel_sellings = require('../models/tabel_sellings')
const table_users = require('../models/users')
const tabel_customers = require('../models/tabel_customers')
const { findAll } = require('../models/table_payment_method')
const { defineRole, defineUser } = require("./AuthController")
const folder = 'pages/orders'

exports.Home =
    async (req, res) => {
        data = {
            products: (await t_products.publish()).rows,
            payment: (await findAll()).rows,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/add-order`)
    }
exports.Save =
    async (req, res) => {
        console.log(req.body);
        let status_selling = 'Pending'
        if (req.body.payment_method === 'Cash On Delivery (COD)') {
            status_selling = 'Proccess'
        }
        let productInput = req.body.products
        let quantityInput = req.body.qty

        let product = []
        let quantity = []
        let p = (await t_products.findAll()).rows

        if (Array.isArray(productInput)) {
            productInput.forEach(async (e) => {
                product.push(p.find(d => d.id == e))
            });
            quantityInput.forEach(e => {
                quantity.push(e)
            });
        } else {
            product.push(p.find(d => d.id == productInput))
            quantity.push(quantityInput)
        }
        const duplicateUser = (await tabel_customers.findAll()).rows.find(e => e.email === req.user.email)


        data = {
            idCustomer: ((Math.floor((Math.random() * (9999 - 1000) + 1000))) + '-' + Date.now()).toString(),
            statusSelling: status_selling,
            total: req.body.inputTotal,
            payment: req.body.payment_method,
            full_name: req.body.full_name,
            address: req.body.address,
            phone: req.body.phone,
            products: product,
            quantity,
            email: req.user.email
        }

        await tabel_sellings.insertOne(
            data.idCustomer,
            data.statusSelling,
            JSON.stringify(data.quantity),
            data.total,
            data.payment,
            data.full_name,
            data.address,
            data.phone,
            JSON.stringify(data.products),
            data.email
        )

        if (Array.isArray(productInput)) {
            productInput.forEach(async (e, i = 0) => {
                oldStock = (await t_products.findOne(e)).rows[0].quantity
                stockInput = quantityInput[i]
                stock = parseInt(oldStock) - stockInput

                await t_products.updateStock(
                    e,
                    stock
                )
                i++
            })
        } else {
            id = productInput
            oldStock = (await t_products.findOne(id)).rows[0].quantity
            stock = parseInt(oldStock) - quantityInput
            await t_products.updateStock(
                id,
                stock
            )
        }

        if (duplicateUser == undefined) {
            await tabel_customers.insertOne(
                req.user.name,
                req.user.email
            )
        }

        res.redirect(`/invoice/${data.idCustomer}`)
    }

exports.myOrders =
    async (req, res) => {
        const sellings = (await tabel_sellings.myOrders(req.user.email)).rows
        const products = sellings
        data = {
            sellings,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/my-orders`)
    }
exports.Cancel =
    async (req, res) => {
        const productOrder = JSON.parse((await tabel_sellings.findAll()).rows.find(e => e.id == req.body.id).product_id)
        const product = (await t_products.findAll()).rows
        const quantity = JSON.parse((await tabel_sellings.findAll()).rows.find(e => e.id == req.body.id).quantity)
        const id = (await tabel_sellings.findAll()).rows.find(e => e.id == req.body.id).id_order
        const status = 'Canceled'
        await tabel_sellings.updateStatus(
            id,
            status
        )
        productOrder.forEach(async (e, i = 0) => {
            let stock = parseInt(quantity[i]) + parseInt(product.find(d => d.id == e.id).quantity)
            console.log(e.quantity);
            console.log(product.find(d => d.id == e.id).quantity);
            await t_products.updateStock(
                e.id,
                stock
            )
            i++
        });

        res.redirect('/orders/myOrders')
    }