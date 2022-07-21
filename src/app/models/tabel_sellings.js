const { pool } = require("../database/db.config");
const table = 'tabel_sellings'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    `)

    return query
}