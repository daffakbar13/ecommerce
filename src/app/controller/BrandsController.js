const fs = require('fs')
const m_brands = require("../models/master_brands")
const t_products = require("../models/tabel_products")
const { defineRole, defineUser } = require('./AuthController')
const folder_img = './public/uploads/img/brand'
const folder = 'pages/brands'

exports.Home =
    async (req, res) => {
        data = {
            brands: (await m_brands.findAll()).rows,
            role: defineRole(req.user),
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/brands`)
    }
exports.AddBrand =
    async (req, res) => {
        data = {
            role: defineRole(req.user),
            auth: req.isAuthenticated(),
            user: defineUser(req.user),
            url: req.url
        }
        res.render(`${folder}/add-brand`)
    }
exports.EditBrand =
    async (req, res) => {
        const brand = (await m_brands.findOne(req.body.id)).rows[0]
        data = {
            brand,
            auth: req.isAuthenticated(),
            role: defineRole(req.user),
            user: defineUser(req.user),
            url: req.url
        }

        res.render(`${folder}/edit-brand`)
    }
exports.Save =
    async (req, res) => {
        let avatar
        if (!req.files.find(e => e.filename)) {
            avatar = 'default.png'
        } else {
            avatar = req.files[0].filename
        }
        await m_brands.insertOne(
            req.body.brand_name,
            avatar,
        )
        res.redirect('/brands')
    }
exports.Update =
    async (req, res) => {
        console.log(req.body);
        let avatar
        if (!req.files.find(e => e.filename)) {
            avatar = req.body.oldImage
        } else {
            data = (await m_brands.findOne(req.body.id)).rows[0]
            if (data.image !== 'default.png') {
                var filePath = `${folder_img}/${data.image}`;
                fs.unlinkSync(`${filePath}`);
            }
            avatar = req.files[0].filename
        }
        await m_brands.updateOne(
            req.body.id,
            req.body.brand_name,
            avatar,
        )
        res.redirect('/brands')
    }
exports.Delete =
    async (req, res) => {
        data = (await m_brands.findOne(req.body.id)).rows[0]
        if (data.image !== 'default.png') {
            var filePath = `${folder_img}/${data.image}`;
            fs.unlinkSync(`${filePath}`);
        }
        await m_brands.deleteOne(
            req.body.id,
        )
        res.redirect('/brands')
    }