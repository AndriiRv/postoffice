const pool = require('../config/db');

const getStuff = (request, response) => {
    pool.query('SELECT * FROM stuff', (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const saveStuff = (request, response) => {
    const {title, weight} = request.body;

    pool.query('INSERT INTO stuff (title, weight) VALUES ($1, $2)',
        [title, weight], (error) => {
            if (error) {
                console.log(error.stack);
                pool.release();
            } else {
                console.log(`Stuff was added with title: '${title}' and weight: '${weight}'`);

                response.status(201).send(`Stuff was added with title: '${title}' and weight: '${weight}'`);
            }
        })
};

const updateStuff = (request, response) => {
    const id = parseInt(request.params.id);
    const {title, weight} = request.body;

    var oldTitle;
    var oldWeight;

    pool.query('SELECT * FROM stuff WHERE id = ($1)', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            oldTitle = results.rows[0].title;
            oldWeight = results.rows[0].weight;
            response.status(200);
        }
    });

    pool.query('UPDATE stuff SET title = ($2), weight = ($3) WHERE id = ($1)', [id, title, weight], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Stuff was updated with old title: '${oldTitle}', on new title: '${title}' and old weight: '${oldWeight}' on new weight: '${weight}'`);

            response.status(201).send(`Stuff was updated with old title: '${oldTitle}', on new title: '${title}' and old weight: '${oldWeight}' on new weight: '${weight}'`);
        }
    })
};

const deleteStuff = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM stuff WHERE id = ($1) RETURNING title, weight', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`Stuff - '${results.rows[0].title}' with weight: '${results.rows[0].weight}' was deleted`);
            response.status(201).send(`Stuff - '${results.rows[0].title}' with weight: '${results.rows[0].weight}' was deleted`);
        }
    });
};

module.exports = {
    getStuff,
    saveStuff,
    updateStuff,
    deleteStuff
};