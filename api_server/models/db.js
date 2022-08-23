var mongoose = require('mongoose'); // Uso de mongoose

var dbURI = 'mongodb://localhost/vehiculosmunicipales'; // URI de nuestra BD
mongoose.connect(dbURI); // Conexion a la BD

// EVENTOS DE CONEXION
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// EVENTOS DE TERMINACION/REINICIO DE LA APLICACION
// Es llamado cuando la aplicación se termina/reinicia
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// Para reinicios de nodemon
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// Para terminacion de la aplicacion
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

// ESQUEMAS Y MODELOS
require('./vehiculo');
require('./user');