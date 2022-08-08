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
exports.insertOne = async (
    customer_name,
    email
) => {
    const query = await pool.query(`
    INSERT 
    INTO ${table}(
       customer_name,
       email
        )
        VALUES (
            '${customer_name}',
            '${email}'
            );
    `)

    return query
}