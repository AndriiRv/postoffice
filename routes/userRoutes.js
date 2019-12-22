module.exports = function (app, db) {

    app.post('/user', (req, resp) => {
        db.saveUser(req, resp);
    });
    app.get('/user', (req, resp) => {
        db.getUsers(req, resp);
    });
    app.put('/user/:id', (req, resp) => {
        db.updateUser(req, resp);
    });
    app.delete('/user/:id', (req, resp) => {
        db.deleteUser(req, resp);
    });
};