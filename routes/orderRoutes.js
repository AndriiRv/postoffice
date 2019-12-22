module.exports = function (app, db) {

    app.get('/order', (req, resp) => {
        db.getOrder(req, resp);
    });
    app.post('/order', (req, resp) => {
        db.saveOrder(req, resp);
    });
    app.put('/order/:id', (req, resp) => {
        db.updateOrder(req, resp);
    });
    app.delete('/order/:id', (req, resp) => {
        db.deleteOrder(req, resp);
    });
};