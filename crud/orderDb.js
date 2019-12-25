const pool = require('../config/db');

const getOrder = (request, response) => {
    pool.query('SELECT o.id, u.name, u.surname, s.title, o.price ' +
        'FROM "order" AS o ' +
        'INNER JOIN dispatch AS d ON d.id = o.dispatch_id ' +
        'INNER JOIN "user" AS u ON u.id = d.user_id ' +
        'INNER JOIN stuff AS s ON s.id = d.stuff_id', (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const saveOrder = (request, response) => {
    const {dispatchId, price} = request.body;

    pool.query('INSERT INTO "order" (dispatch_id, price) VALUES ($1, $2)',
        [dispatchId, price], (error) => {
            if (error) {
                console.log(error.stack);
                pool.release();
            } else {
                console.log(`Order was added with dispatchId: '${dispatchId}' and price: '${price}'`);

                response.status(201).redirect("/");
            }
        })
};

const updateOrder = (request, response) => {
    const id = parseInt(request.params.id);
    const {price} = request.body;

    pool.query('UPDATE "order" SET price = ($2) WHERE id = ($1)', [id, price], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Order was updated on new price: '${price}'`);

            response.status(201).redirect("/");
        }
    })
};

const deleteOrder = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM "order" WHERE id = ($1) RETURNING id', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Order - '${results.rows[0].id}' was deleted`);

            response.status(201).redirect("/");
        }
    });
};

module.exports = {
    getOrder,
    saveOrder,
    updateOrder,
    deleteOrder
};