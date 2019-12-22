const pool = require('../config/db');

const getDispatch = (request, response) => {
    pool.query('SELECT d.id, u.name, u.surname, s.title, s.weight, c1.title AS from_city, c2.title AS to_city ' +
        'FROM dispatch AS d ' +
        'INNER JOIN "user" AS u ON u.id = d.user_id ' +
        'INNER JOIN stuff AS s ON s.id = d.stuff_id ' +
        'INNER JOIN city c1 on d.from_city_id = c1.id ' +
        'INNER JOIN city c2 on d.to_city_id = c2.id', (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            response.status(200).json(results.rows);
        }
    });
};

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours() - 2;

    newDate.setHours(hours - offset);

    return newDate;
}

const saveDispatch = (request, response) => {
    const {userId, stuffId, fromCityId, toCityId} = request.body;

    const date = convertUTCDateToLocalDate(new Date()).toLocaleDateString();
    const time = convertUTCDateToLocalDate(new Date()).toLocaleTimeString();

    pool.query('INSERT INTO dispatch (user_id, stuff_id, from_city_id, to_city_id, date, time) VALUES ($1, $2, $3, $4, $5, $6)',
        [userId, stuffId, fromCityId, toCityId, date, time], (error) => {
            if (error) {
                console.log(error.stack);
                pool.release();
            } else {
                console.log(`Dispatch was added, from cityId: '${fromCityId}', to cityId: '${toCityId}'`);

                response.status(201).send(`Dispatch was added, from cityId: '${fromCityId}', to cityId: '${toCityId}'`);
            }
        })
};

const updateDispatch = (request, response) => {
    const id = parseInt(request.params.id);
    const {fromCityId, toCityId} = request.body;

    pool.query('UPDATE dispatch SET from_city_id = ($2), to_city_id = ($3) WHERE id = ($1)', [id, fromCityId, toCityId], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Dispatch was updated on new fromCityId: '${fromCityId}' to toCityId: '${toCityId}'`);

            response.status(201).send(`Dispatch was updated on new fromCityId: '${fromCityId}' to toCityId: '${toCityId}'`);
        }
    })
};

const deleteDispatch = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM dispatch WHERE id = ($1) RETURNING id', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Dispatch - '${results.rows[0].id}' was deleted`);
            response.status(201).send(`Dispatch - '${results.rows[0].id}' was deleted`);
        }
    });
};

module.exports = {
    getDispatch,
    saveDispatch,
    updateDispatch,
    deleteDispatch
};