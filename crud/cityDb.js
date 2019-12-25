const pool = require('../config/db');

const getCities = (request, response) => {
    pool.query('SELECT * FROM city', (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const saveCity = (request, response) => {
    const {title} = request.body;

    pool.query('INSERT INTO city (title) VALUES ($1)', [title], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`City was added with title: '${title}'`);
            response.status(201).redirect("/");
        }
    })
};

const updateCity = (request, response) => {
    const id = parseInt(request.params.id);
    const {title} = request.body;

    var oldTitle;

    pool.query('SELECT * FROM city WHERE id = ($1)', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            oldTitle = results.rows[0].title;
            console.log("oldTitle: " + oldTitle);
            console.log("new: " + results.rows[0].id);

            response.status(200).redirect("/");
        }

    });

    pool.query('UPDATE city SET title = ($2) WHERE id = ($1)', [id, title], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`City was updated with old title: '${oldTitle}', on title: '${title}'`);
            response.status(201);
        }
    })
};

const deleteCity = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM city WHERE id = ($1) RETURNING title', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`City - '${results.rows[0].title}' was deleted`);
            response.status(201).redirect("/");
        }
    });
};

module.exports = {
    getCities,
    saveCity,
    updateCity,
    deleteCity
};