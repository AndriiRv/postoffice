module.exports = function (app, db) {

    app.get('/stuff', (req, resp) => {
        db.getStuff(req, resp);
    });
    app.post('/stuff', (req, resp) => {
        db.saveStuff(req, resp);
    });
    app.post('/update-stuff/:id', (req, resp) => {
        db.updateStuff(req, resp);
    });
    app.post('/delete-stuff/:id', (req, resp) => {
        db.deleteStuff(req, resp);
    });
};