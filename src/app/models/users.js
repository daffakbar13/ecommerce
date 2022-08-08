const { pool } = require("../database/db.config");
const table = 'users'

exports.findOne = async (column, val) => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    WHERE ${column} = ${val}
    `)

    return query
}
exports.findAll = async () => {
    const query = await pool.query(`
    SELECT *
    FROM 
    ${table}
    `)

    return query
}