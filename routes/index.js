const cityRoutes = require('./cityRoutes');
const userRoutes = require('./userRoutes');

module.exports = function (app, db1, db2) {

    cityRoutes(app, db1);
    userRoutes(app, db2);

    // Тут, позже, будут и другие обработчики маршрутов
};
