const pool = require('../config/db');

const saveUser = (request, response) => {
    const {roleId, username, password} = request.body;

    pool.query('INSERT INTO credential (role_id, username, password) VALUES ($1, $2, $3) RETURNING id',
        [roleId, username, password], (error, results) => {
            if (error) {
                console.log(error.stack);

                pool.release();
                response.status(500).send(error.stack);
            } else {
                saveUserWithCredentialId(request, response, username, results.rows[0].id);

                console.log(`User was added with username: '${username}'`);
                response.status(201).redirect("/");
            }
        });
};

function saveUserWithCredentialId(request, response, username, credentialId) {
    const {name, surname, cityId, address, email, telephone} = request.body;

    pool.query('INSERT INTO "user" (credential_id, name, surname, city_id, address, email, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [credentialId, name, surname, cityId, address, email, telephone], (error) => {
            if (error) {
                console.log(error.stack);
                pool.release();
            }
        });
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "user" AS u RIGHT JOIN credential AS c ON c.id = u.credential_id', (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            response.status(200).json(results.rows);
        }
    });
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const {password, name, surname, cityId, address, email, telephone} = request.body;

    var userId;

    pool.query('SELECT * FROM "user" AS u INNER JOIN credential AS c ON c.id = u.credential_id WHERE u.id = ($1)', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            userId = results.rows[0].id;

            updateCredentialById(userId, password, response);
            updateUserById(userId, name, surname, cityId, address, email, telephone, response);

            console.log(`User with username: '${results.rows[0].username}' was updated`);
            response.status(201).redirect("/");
        }
    });
};

function updateCredentialById(userId, newPassword) {
    pool.query('UPDATE credential SET password = ($2) WHERE id = ($1)', [userId, newPassword], (error) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        }
    });
}

function updateUserById(userId, name, surname, cityId, address, email, telephone) {
    pool.query('UPDATE "user" SET name = ($2), surname = ($3), city_id = ($4), address = ($5), email = ($6), telephone = ($7) WHERE id = ($1)',
        [userId, name, surname, cityId, address, email, telephone], (error) => {
            if (error) {
                console.log(error.stack);
                pool.release();
            }
        });
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM credential WHERE id = ($1) RETURNING username', [id], (error, results) => {
        if (error) {
            console.log(error.stack);
            pool.release();
        } else {
            console.log(`User with '${results.rows[0].username}' was deleted`);
            response.status(201).redirect("/");
        }
    });
};

module.exports = {
    saveUser,
    getUsers,
    updateUser,
    deleteUser
};