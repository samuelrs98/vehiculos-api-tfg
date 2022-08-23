var express = require('express');
var router = express.Router();

// Archivos con el código de los controladores
var ctrlVeh = require('../controllers/vehiculo');   // Vehículos
var ctrlAuth = require('../controllers/auth');      // Registro y login
var middleware = require('../controllers/middleware');  // Comprobación de acceso

// Rutas a endpoints GET
router.get('/', ctrlVeh.vehiculoFindOne);
router.get('/todos', ctrlVeh.vehiculoFindAll);
router.get('/matricula/:matricula', ctrlVeh.vehiculoFindByMatricula);
router.get('/tipo/:tipo', ctrlVeh.vehiculoFindByTipo);
router.get('/marca/:marca', ctrlVeh.vehiculoFindByMarca);
router.get('/alta/:anio_alta', ctrlVeh.vehiculoFindByAnioAlta);
router.get('/operativos', ctrlVeh.vehiculoFindOperativos);
router.get('/anio/:anio', ctrlVeh.vehiculoFindByAnio);

// Rutas a endpoints POST
router.post('/vehiculo', middleware.ensureAuthenticated, ctrlVeh.vehiculoCreate);

// Rutas a endpoints DELETE
router.delete('/vehiculo/:matricula', middleware.ensureAuthenticated, ctrlVeh.vehiculoDelete);

// Rutas a endpoints PUT
router.put('/vehiculo/:matricula', middleware.ensureAuthenticated, ctrlVeh.vehiculoUpdate);

// Rutas de registro y login (POST)
router.post('/auth/signup', ctrlAuth.signup); 
router.post('/auth/login', ctrlAuth.login);

module.exports = router;