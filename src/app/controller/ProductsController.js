const fs = require('fs')
const t_products = require("../models/tabel_products")
const m_brands = require("../models/master_brands")
const folder = 'pages/products'
const folder_img = './public/uploads/img/product'

exports.Home =
    async (req, res, next) => {
        data = {
            products: (await t_products.findAll()).rows
        }
        res.render(`${folder}/product-list`)
    }
exports.AddProduct =
    async (req, res) => {
        data = {
            brands: (await m_brands.findAll()).rows
        }
        res.render(`${folder}/add-product`)
    }
exports.
    EditProduct =
    async (req, res) => {
        data = {
            product: (await t_products.findOne(req.body.id)).rows[0],
            brands: (await m_brands.findAll()).rows
        }
        console.log(data.product);
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
        console.log(req.body);
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
            data = (await t_products.findOne(req.body.id)).rows[0]
            if (data.image !== 'default.png') {
                var filePath = `${folder_img}/${data.image}`;
                fs.unlinkSync(`${filePath}`);
            }
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
        data = (await t_products.findOne(req.body.id)).rows[0]
        if (data.image !== 'default.png') {
            var filePath = `${folder_img}/${data.image}`;
            fs.unlinkSync(`${filePath}`);
        }
        await t_products.deleteOne(
            req.body.id,
        )
        res.redirect('/products')
    }