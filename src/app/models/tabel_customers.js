const { pool } = require("../database/db.config");
const table = 'tabel_customers'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    `)

    return query
}