const cityRoutes = require('./cityRoutes');
const userRoutes = require('./userRoutes');
const stuffRoutes = require('./stuffRoutes');
const dispatchRoutes = require('./dispatchRoutes');
const orderRoutes = require('./orderRoutes');

module.exports = function (app, db1, db2, db3, db4, db5) {

    cityRoutes(app, db1);
    userRoutes(app, db2);
    stuffRoutes(app, db3);
    dispatchRoutes(app, db4);
    orderRoutes(app, db5);
};
