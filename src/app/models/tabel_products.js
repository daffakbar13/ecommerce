const { pool } = require("../database/db.config");
const table = 'tabel_products'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    ORDER BY id
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
exports.publish = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    WHERE status = 'Published'
    ORDER BY id
    `)

    return query
}
exports.insertOne = async (
    product_name,
    quantity,
    price,
    status,
    image,
    brand
) => {
    const query = await pool.query(`
    INSERT 
    INTO ${table}(
        product_name, 
        quantity, 
        price, 
        status, 
        image, 
        brand
        )
        VALUES (
            '${product_name}',
            '${quantity}',
            '${price}',
            '${status}',
            '${image}',
            '${brand}'
            );
    `)

    return query
}
exports.updateOne = async (
    id,
    product_name,
    quantity,
    price,
    status,
    image,
    brand
) => {
    const query = await pool.query(`
    UPDATE 
    ${table}
    SET
        product_name = '${product_name}',
        quantity =  '${quantity}', 
        price = '${price}',
        status = '${status}',
        image = '${image}',
        brand = '${brand}'
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
exports.updateStock = async (
    id,
    quantity
) => {
    const query = await pool.query(`
    UPDATE 
    ${table}
    SET
        quantity =  ${quantity}
    WHERE id = '${id}'
    `)

    return query
}
exports.updateStatus = async (
    id,
    status
) => {
    const query = await pool.query(`
    UPDATE 
    ${table}
    SET
        status =  '${status}'
    WHERE id = '${id}'
    `)

    return query
}
exports.stock = async () => {
    const query = await pool.query(`
    SELECT SUM(quantity) 
    FROM 
    ${table}
    `)

    return query
}