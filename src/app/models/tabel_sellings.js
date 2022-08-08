const { pool } = require("../database/db.config");
const table = 'tabel_sellings'

exports.findAll = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    ORDER BY date_modified DESC    
    `)

    return query
}
exports.insertOne = async (
    id_order,
    status_selling,
    quantity,
    total,
    payment_method,
    full_name,
    address,
    phone,
    products,
    email
) => {
    const query = await pool.query(`
    INSERT 
    INTO ${table}(
        id_order, 
        status_selling, 
        date_added, 
        date_modified, 
        quantity,
        grand_total,
        payment_method,
        full_name,
        address,
        phone,
        product_id,
        email_user
        )
        VALUES (
            '${id_order}',
            '${status_selling}',
             NOW(),
             NOW(),
             '${quantity}',
             ${total},
            '${payment_method}',
            '${full_name}',
            '${address}',
             ${phone},
             '${products}',
             '${email}'
            );
    `)

    return query
}
exports.updateStatus = async (
    id_order,
    status_selling
) => {
    const query = await pool.query(`
    UPDATE 
    ${table}
    SET
        status_selling =  '${status_selling}',
        date_modified = NOW()
    WHERE id_order = '${id_order}'
    `)

    return query
}
exports.deliveredOrder = async () => {
    const query = await pool.query(`
    SELECT * 
    FROM 
    ${table}
    WHERE status_selling = 'Delivered'
    ORDER BY date_modified DESC
    LIMIT 5
    `)

    return query
}
exports.myOrders =
    async (
        email
    ) => {
        const query = await pool.query(`
        SELECT * 
        FROM 
        ${table}
        WHERE email_user = '${email}'
        ORDER BY date_modified DESC
        `)

        return query
    } 