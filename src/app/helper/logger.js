const { pool } = require("../database/db.config")
const table = 'table_logger'

const insert =
    async (
        link,
        user,
        method,
        role
    ) => {
        await pool.query(`
        INSERT INTO ${table}(
            url, 
            "user",
            method,
            role
        )
    	VALUES (
            '${link}',
            '${user}',
            '${method}',
            '${role}'
        )
`)
    }

exports.logger =
    async (
        req, res, next
    ) => {
        let user
        const link = req.url
        const method = req.method
        let role
        if (req.user === undefined) {
            role = '-'
            user = 'Anonymous'
        } else {
            if (req.user.role === 1) {
                role = 'User'
            }
            if (req.user.role === 2) {
                role = 'Admin'
            }
            if (req.user.role === 3) {
                role = 'Super Admin'
            }
            user = req.user.name
        }

        await insert(
            link,
            user,
            method,
            role
        )
        next()
    }

