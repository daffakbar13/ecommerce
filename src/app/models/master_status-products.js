const { pool } = require("../database/db.config");
const table = 'master_status-products'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    `)

    return query
}