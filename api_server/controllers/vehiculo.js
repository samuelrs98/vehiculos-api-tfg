var mongoose = require('mongoose'); // Uso de Mongoose
var Vehiculo = mongoose.model('Vehiculo');  // Modelo

/* 
 * Función para enviar una respuesta JSON
 * Entradas: res -> respuesta HTTP
 *           status -> Código de estado HTTP
 *           content -> Contenido JSON que se desea enviar en la respuesta
*/
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

// Controlador para encontrar un vehículo cualquiera (usado para probar la API).
module.exports.vehiculoFindOne = function(req, res) {
    console.log('Finding vehicle details', req.params);
    Vehiculo    // Uso del modelo
    .findOne()  // Búsqueda de un vehículo cualquiera
    .exec(function(err, vehiculo) {
        if (!vehiculo) {    // Si no hay vehículo, se manda 200 con mensaje.
            sendJSONresponse(res, 200, {
                "message": "vehicle not found"
            });
            return;
        } else if (err) {    // Para cualquier otro error, se manda 404 con mensaje.
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        console.log(vehiculo);                  // Si todo está bien, se manda
        sendJSONresponse(res, 200, vehiculo);   // código 200 con el vehículo.
    });
};

// Controlador para devolver el listado completo de vehículos.
module.exports.vehiculoFindAll = function(req, res) {
    console.log('Finding vehicles details', req.params);
    Vehiculo
    .find()
    .exec(function(err, vehiculos) {
        if (vehiculos.length == 0) {    // Si la lista no tiene vehículos, 
            sendJSONresponse(res, 200, {// se manda 200 con mensaje.
                "message": "vehicles not found"
            });
            return;
        } else if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, vehiculos);
    });
};

// Controlador para devolver un vehículo con tal matrícula
module.exports.vehiculoFindByMatricula = function(req, res) {
    if (req.params && req.params.matricula) { 
        Vehiculo
        .findOne({matricula: req.params.matricula}) // Obtenemos el vehículo con
        .exec(                                      // la matrícula del param.
            function(err, vehiculo) {
                if (!vehiculo) { 
                    return res
                    .status(200)
                    .send({"message": "vehicle not found"});
                } else if (err) {
                    return res
                    .status(404)
                    .send(err);
                }
                return res 
                .status(200)
                .send(vehiculo);
            }
        );
    } else {
        return res
        .status(404)                    // Mandamos un 404 con mensaje si no se
        .send({"message": "No licence-plate in request"});  //  pasa parámetro.
    }
};

// Controlador para devolver el listado de vehículos de cierto tipo.
module.exports.vehiculoFindByTipo = function(req, res) {
    if (req.params && req.params.tipo) { 
        Vehiculo
        .find({tipo: req.params.tipo}) 
        .exec(
            function(err, vehiculos) {
                if (vehiculos.length == 0) { 
                    return res
                    .status(200)
                    .send({"message": "vehicles not found"});
                } else if (err) {
                    return res
                    .status(404)
                    .send(err);
                }
                return res 
                .status(200)
                .send(vehiculos);
            }
        );
    } else {
        return res
        .status(404)
        .send({"message": "No type in request"});
    }
};

// Controlador para devolver el listado de vehículos de cierta marca.
module.exports.vehiculoFindByMarca = function(req, res) {
    if (req.params && req.params.marca) { 
        Vehiculo
        .find({marca: req.params.marca}) 
        .exec(
            function(err, vehiculos) {
                if (vehiculos.length == 0) { 
                    return res
                    .status(200)
                    .send({"message": "vehicles not found"});
                } else if (err) {
                    return res
                    .status(404)
                    .send(err);
                }
                return res 
                .status(200)
                .send(vehiculos);
            }
        );
    } else {
        return res
        .status(404)
        .send({"message": "No manufacturer in request"});
    }
};

/* Controlador para devolver el listado de vehículos que entraron en servicio
 * cierto año.                                                              */
module.exports.vehiculoFindByAnioAlta = function(req, res) {
    if (req.params && req.params.anio_alta) { 
        Vehiculo
        .find({anio_alta: req.params.anio_alta}) 
        .exec(
            function(err, vehiculos) {
                if (vehiculos.length == 0) { 
                    return res
                    .status(200)
                    .send({"message": "vehicles not found"});
                } else if (err) {
                    return res
                    .status(404)
                    .send(err);
                }
                return res 
                .status(200)
                .send(vehiculos);
            }
        );
    } else {
        return res
        .status(404)
        .send({"message": "No year in request"});
    }
};

// Controlador para devolver el listado de vehículos operativos.
module.exports.vehiculoFindOperativos = function(req, res) {
    Vehiculo
    .find({"estado": true})
    .exec(function(err, vehiculos) {
        if (vehiculos.length == 0) {
            sendJSONresponse(res, 200, {
                "message": "vehicles not found"
            });
            return;
        } else if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
        sendJSONresponse(res, 200, vehiculos);
    });
};

// Controlador para devolver el listado de vehículos operativos en cierto año.
module.exports.vehiculoFindByAnio = function(req, res) {
    if (req.params && req.params.anio) { 
        Vehiculo
        .find({   // Filtramos los vehículos que hayan estado en servicio entre
            "anio_alta": {$lte: req.params.anio},   // los años de alta
            $or: [{"anio_baja": {$gte: req.params.anio}}, {"anio_baja":  null}]    // y de baja.
        })
        .exec(
            function(err, vehiculos) {
                if (vehiculos.length == 0) { 
                    return res
                    .status(200)
                    .send({"message": "vehicles not found"});
                } else if (err) {
                    return res
                    .status(404)
                    .send(err);
                }
                return res 
                .status(200)
                .send(vehiculos);
            }
        );
    } else {
        return res
        .status(404)
        .send({"message": "No year in request"});
    }
};

// Controlador para introducir un nuevo vehículo en la base de datos
module.exports.vehiculoCreate = function(req, res) {
    Vehiculo
    .create({   // Creamos un vehículo asignando a cada campo
        tipo: req.body.tipo,    // su correspondiente de la petición.
        marca: req.body.marca,
        modelo: req.body.modelo,
        matricula: req.body.matricula,
        anio_alta: req.body.anio_alta,
        uso: req.body.uso,
        institucion: req.body.institucion,
        regimen: req.body.regimen,
        estado: req.body.estado,
        anio_baja: req.body.anio_baja
    },function(err, book) {
        if (err) {  // Si hay un error, se manda mensaje con código 400.
            return res
            .status(400)
            .send(err);
        }
        return res  // Si se guarda correctamente, se devuelve código 201.
        .status(201)
        .send(book);
    });
};

// Controlador para borrar de la base de datos un vehículo con cierta matrícula.
module.exports.vehiculoDelete = function(req, res) {
    if (req.params && req.params.matricula) { 
        Vehiculo
        .findOneAndDelete({matricula: req.params.matricula}) // Encontramos y 
        .exec(          // borramos el vehículo con la matrícula introducida.
            function(err, vehiculo) {
                if (err) {  // Si no se puede borrar, se devuelve error 400.
                    return res
                    .status(400)
                    .send(err);
                }
                return res  // Si se borra correctamente, 
                .status(204)    // se devuelve código 204.
                .send(null);
            }
        );
    } else {
        return res  // Si no se pasa matrícula, 
        .status(404)    // se devuelve código 404 con mensaje.
        .send({"message": "No matricula in the request"});
    }
};

// Controlador para actualizar los datos un vehículo con cierta matrícula.
module.exports.vehiculoUpdate = function(req, res) {
    if (req.params && req.params.matricula) { 
        Vehiculo
        .findOne({matricula: req.params.matricula}) // Usamos el vehículo con
        .exec(                                      // la matrícula introducida.
            function(err, vehiculo) {
                if (!vehiculo) { 
                    return res  // Si no se encuentra el vehículo,
                    .status(404)    // devolvemos 404 con mensaje.
                    .send({"message": "no vehicle found"});
                } else {    // Actualizamos con el contenido de los campos 
                    if (req.body.tipo) {    // pasados por parámetro.
                        vehiculo.tipo = req.body.tipo;
                    }
                    if (req.body.marca) { 
                        vehiculo.marca = req.body.marca;
                    }
                    if (req.body.modelo) { 
                        vehiculo.modelo = req.body.modelo;
                    }
                    if (req.body.anio_alta) { 
                        vehiculo.anio_alta = req.body.anio_alta;
                    }
                    if (req.body.uso) { 
                        vehiculo.uso = req.body.uso;
                    }
                    if (req.body.institucion) { 
                        vehiculo.institucion = req.body.institucion;
                    }
                    if (req.body.regimen) { 
                        vehiculo.regimen = req.body.regimen;
                    }
                    if (req.body.estado) { 
                        vehiculo.estado = req.body.estado;
                    }
                    if (req.body.anio_baja) { 
                        vehiculo.anio_baja = req.body.anio_baja;
                    }
                    vehiculo.save(function (err, vehiculo) { 
                        if (err) {  // Si hay algún error, 
                            return res  // devolvemos 404 con mensaje.
                            .status(404)
                            .send(err);
                        }
                        else {  // Si se ha realizado la operación 
                            return res  // correctamente, devolvemos 200 con la
                            .status(200)    // info. del vehículo.
                            .send(vehiculo);
                        }
                    });
                }
            }
        );
    } else {
        return res  // Si no se pasa parámetro, devolvemos 404 con mensaje.
        .status(404)
        .send({"message": "No matricula in the request"});
    }
};