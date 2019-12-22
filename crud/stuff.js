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

module.exports = {
    getStuff,
    saveStuff,
    updateStuff,
    deleteStuff
};