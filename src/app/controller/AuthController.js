const { pool } = require("../database/db.config")
const bcrypt = require('bcryptjs')
const { logger } = require("../helper/logger")


const folder = 'auth'
const layout_basic = 'layouts/auth-basic'

exports.Login =
    (req, res) => {
        res.render(`${folder}/user/login`, { layout: layout_basic })
    }
exports.RegisterFormUser =
    async (req, res, next) => {
        data = {
            layout: layout_basic
        }
        res.render(`${folder}/user/register`, { layout: layout_basic })
    }
exports.RegisterFormAdmin =
    async (req, res, next) => {
        data = {
            layout: layout_basic
        }
        res.render(`${folder}/admin/register`, { layout: layout_basic })
    }
exports.RegisterUser =
    async (req, res, next) => {
        console.log(req.body);
        const { name, email, password, password2 } = req.body

        let errors = []

        if (!name || !email || !password || !password2) {
            errors.push({ message: "Please enter all field!" })
        }

        if (password.length < 6) {
            errors.push({ message: "Password should be at least 6 characters!" })
        }

        if (password != password2) {
            errors.push({ message: "Password do not match!" })
        }

        if (errors.length > 0) {
            data = {
                errors
            }
            res.render(`${folder}/user/register`, { layout: layout_basic, data })
            return
        } else {
            let hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);
            pool.query(
                `SELECT * FROM users
                WHERE email = $1 AND role=1`,
                [email],
                (err, results) => {
                    if (err) {
                        throw err
                    }
                    if (results.rows.length > 0) {
                        data = {
                            errors
                        }
                        errors.push({ message: "Email already registered!" })
                        res.render(`${folder}/user/register`, { layout: layout_basic, data })
                    } else {
                        pool.query(
                            `INSERT INTO users (name, email, password)
                            VALUES ($1, $2, $3)
                            RETURNING id, password`,
                            [name, email, hashedPassword],
                            (err, results) => {
                                if (err) {
                                    throw err
                                }
                                req.flash("Success_msg", "You are now registered. Please log in!")
                                res.redirect('/login')
                            }
                        )
                    }
                }
            )
        }
    }
exports.RegisterAdmin =
    async (req, res, next) => {
        console.log(req.body);
        const { name, email, password, password2 } = req.body

        let errors = []

        if (!name || !email || !password || !password2) {
            errors.push({ message: "Please enter all field!" })
        }

        if (password.length < 6) {
            errors.push({ message: "Password should be at least 6 characters!" })
        }

        if (password != password2) {
            errors.push({ message: "Password do not match!" })
        }

        if (errors.length > 0) {
            data = {
                errors
            }
            res.render(`${folder}/admin/register`, { layout: layout_basic, data })
            return
        } else {
            let hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword);
            pool.query(
                `SELECT * FROM users
                WHERE email = $1 AND role = 2`,
                [email],
                (err, results) => {
                    if (err) {
                        throw err
                    }
                    if (results.rows.length > 0) {
                        data = {
                            errors
                        }
                        errors.push({ message: "Email already registered!" })
                        res.render(`${folder}/admin/register`, { layout: layout_basic, data })
                    } else {
                        pool.query(
                            `INSERT INTO users (name, email, password, role)
                            VALUES ($1, $2, $3, 2)
                            RETURNING id, password`,
                            [name, email, hashedPassword],
                            (err, results) => {
                                if (err) {
                                    throw err
                                }
                                req.flash("Success_msg", "You are now registered. Please log in!")
                                res.redirect('/login')
                            }
                        )
                    }
                }
            )
        }
    }
exports.checkAuthenticated =
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/')
        }
        next()
    }

exports.checkNotAuthenticated =
    (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/error404')
    }
exports.roleUser =
    (req, res, next) => {
        if (req.user !== undefined) {
            if (req.user.role >= 1) {
                return next()
            }
        }

        res.redirect('/error404')
    }
exports.roleAdmin =
    (req, res, next) => {
        if (req.user !== undefined) {
            if (req.user.role >= 2) {
                return next()
            }
        }

        res.redirect('/error404')
    }
exports.roleSuperAdmin =
    (req, res, next) => {
        if (req.user !== undefined) {
            if (req.user.role === 3) {
                return next()
            }
        }

        res.redirect('/error404')
    }
exports.defineRole =
    (req) => {
        let role = req
        if (role === undefined) {
            role = 0
        } else {
            role = role.role
        }
        return role
    }
exports.defineUser =
    (req) => {
        let user = req
        if (user !== undefined) {
            user = req.name
        }

        return user
    }