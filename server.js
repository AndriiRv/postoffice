const express = require('express');
const bodyParser = require('body-parser');
let logger = require('morgan');

const app = express();

const port = 8080;

app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({
        extended: true
    })
);

const cityDb = require('./crud/cityDb');
const userDb = require('./crud/userDb');
const stuffDb = require('./crud/stuffDb');
const dispatchDb = require('./crud/dispatchDb');
const orderDb = require('./crud/orderDb');

require('./routes/index')(app, cityDb, userDb, stuffDb, dispatchDb, orderDb);

app.use(logger('dev'));

app.listen(port, () => {
    console.log('Backend work on ' + port + ' port');
});