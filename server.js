const express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var createError = require('http-errors');
var logger = require('morgan');

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

require('./routes/index')(app, cityDb, userDb);

app.use(logger('dev'));

app.listen(port, () => {
    console.log('We are live on ' + port);
});

// module.exports = app;


// var path = require('path');
// var cookieParser = require('cookie-parser');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//

// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });