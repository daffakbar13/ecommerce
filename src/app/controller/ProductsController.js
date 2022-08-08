const fs = require('fs')
const t_products = require("../models/tabel_products")
const m_brands = require("../models/master_brands")
const m_status = require("../models/master_status-products")
const { defineRole, defineUser } = require('./AuthController')
const folder = 'pages/products'

const products = async () => (await t_products.findAll()).rows
const product = async (e) => (await t_products.findOne(e)).rows[0]
const brands = async () => (await m_brands.findAll()).rows
const status = async () => (await m_status.findAll()).rows

exports.Home =
    async (req, res, next) => {
        let prod = await products()
        let stat = req.body.status
        if (stat !== undefined && stat !== 'All') {
            prod = (await products()).filter(e => e.status === stat)
        }
        if (defineRole(req.user) <= 1) {
            prod = (await products()).filter(e => e.status === 'Published')
        }
        data = {
            products: prod,
            status: await status(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            auth: req.isAuthenticated(),
            stat,
            url: req.url
        }
        res.render(`${folder}/product-list`)
    }
exports.AddProduct =
    async (req, res) => {
        data = {
            brands: await brands(),
            status: await status(),
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            role: defineRole(req.user),
            url: req.url
        }
        res.render(`${folder}/add-product`)
    }
exports.
    EditProduct =
    async (req, res) => {
        data = {
            product: await product(req.body.id),
            brands: await brands(),
            status: await status(),
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            role: defineRole(req.user),
            url: req.url
        }
        res.render(`${folder}/edit-product`)
    }
exports.Save =
    async (req, res) => {
        let avatar
        if (!req.files.find(e => e.filename)) {
            avatar = 'default.png'
        } else {
            avatar = req.files[0].filename
        }
        await t_products.insertOne(
            req.body.product_name,
            req.body.warehouse,
            req.body.price,
            req.body.status,
            avatar,
            req.body.brand
        )
        res.redirect('/products')
    }
exports.Update =
    async (req, res) => {
        let avatar
        let oldAvatar = req.body.oldImage
        if (!req.files.find(e => e.filename)) {
            avatar = oldAvatar
        } else {
            avatar = req.files[0].filename
        }
        await t_products.updateOne(
            req.body.id,
            req.body.product_name,
            req.body.warehouse,
            req.body.price,
            req.body.status,
            avatar,
            req.body.brand
        )
        res.redirect('/products')
    }
exports.Delete =
    async (req, res) => {
        await t_products.deleteOne(
            req.body.id,
        )
        res.redirect('/products')
    }
exports.checkStock = async (req, res, next) => {
    const allData = (await t_products.findAll()).rows
    allData.forEach(async (e) => {
        if (e.quantity === 0) {
            t_products.updateStatus(
                e.id,
                'Inactive'
            )
        }
    });
    next()
}