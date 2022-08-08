const { decodeBase64 } = require("bcryptjs");
const { pool } = require("../database/db.config");
const table = 'master_brands'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    ORDER BY id ASC
    `)

    return query
}
exports.findOne = async (id) => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    WHERE id = ${id}
    `)

    return query
}
exports.insertOne = async (
    brand_name,
    image,
) => {
    const query = await pool.query(`
    INSERT 
    INTO ${table}(
        brand_name, 
        image
        )
        VALUES (
            '${brand_name}',
            '${image}'
            );
    `)

    return query
}
exports.updateOne = async (
    id,
    brand_name,
    image,
) => {
    const query = await pool.query(`
    UPDATE 
    ${table}
    SET
        brand_name = '${brand_name}',
        image = '${image}'
    WHERE id = '${id}'
    `)

    return query
}
exports.deleteOne = async (
    id
) => {
    const query = await pool.query(`
    DELETE
    FROM ${table}
    WHERE id = '${id}'
    `)

    return query
}