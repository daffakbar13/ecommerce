const { pool } = require("../database/db.config")
const table = 'table_logger'

exports.findAll = async () => {
    const query = await pool.query(`
            SELECT *
	        FROM ${table}
            ORDER BY id DESC
            `)
    return query
}