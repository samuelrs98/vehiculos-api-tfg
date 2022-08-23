var jwt = require('jsonwebtoken');  // Uso de JWT.
var moment = require('moment');
var config = require('../config');

// Función para comprobar si un usuario tiene acceso a cierto endpoint.
exports.ensureAuthenticated = function(req, res, next) {
  if(!req.headers.authorization) {  // Comprobar la existencia de autorización
    return res                      // en la cabecera.
    .status(403)
    .send({message: "Petición sin cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];  // Obtener el token.
  var payload = jwt.verify(token, config.TOKEN_SECRET, function(err, payload) {
    if (err) {
      switch (err.name) { // Comprobar errores.
        case 'JsonWebTokenError':
          return res.status(401).send({message: "Signatura incorrecta"});
        case 'TokenExpiredError':
          return res.status(401).send({message: "Token caducado"});
        default:
          return res.status(401).send(err);
      }
    }
    req.user = payload.sub; // Cargar datos del payload para pasar a la sig. etapa.
    next(); // Paso a la etapa siguiente.
  });
}