module.exports = function (app, db) {

    app.get('/dispatch', (req, resp) => {
        db.getDispatch(req, resp);
    });
    app.post('/dispatch', (req, resp) => {
        db.saveDispatch(req, resp);
    });
    app.put('/dispatch/:id', (req, resp) => {
        db.updateDispatch(req, resp);
    });
    app.delete('/dispatch/:id', (req, resp) => {
        db.deleteDispatch(req, resp);
    });
};