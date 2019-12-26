module.exports = function (app, db) {

    app.get('/city', (req, resp) => {
        db.getCities(req, resp);
    });
    app.post('/city', (req, resp) => {
        db.saveCity(req, resp);
    });
    app.post('/update-city/:id', (req, resp) => {
        db.updateCity(req, resp);
    });
    app.post('/delete-city/:id', (req, resp) => {
        db.deleteCity(req, resp);
    });
};