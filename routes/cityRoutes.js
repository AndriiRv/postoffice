module.exports = function (app, db) {

    app.get('/city', (req, resp) => {
        db.getCities(req, resp);
    });
    app.post('/city', (req, resp) => {
        db.saveCity(req, resp);
    });
    app.put('/city/:id', (req, resp) => {
        db.updateCity(req, resp);
    });
    app.delete('/city/:id', (req, resp) => {
        db.deleteCity(req, resp);
    });
};