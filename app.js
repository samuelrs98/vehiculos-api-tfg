var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');  // Uso de Swagger
var swaggerDocument = require('./swagger.json'); 

// Conectar a la BD y cargar los modelos
require('./api_server/models/db');  

/* Archivo de rutas para direccionar las 
 * peticiones a sus correspondientes funciones. */
var apiRouter = require('./api_server/routes/index');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  // Establecer carpeta de vistas.
app.set('view engine', 'jade'); // Jade como motor de plantillas

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));  // Ruta
app.use(logger('dev'));                                             // de Swagger.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);     // Uso de las rutas de la API cuando  
//app.use('/', indexRouter);        // lleguen peticiones a /api.
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
