var jwt = require('jsonwebtoken');  // Uso de JWT
var moment = require('moment');   // Uso de Moment
var config = require('../config');  // Carga del secreto

// Función encargada de crear el token. Toma al usuario como parámetro.
exports.createToken = function(user) {
  var payload = {  // Construcción del payload.
    sub: user,  // Inclusión del usuario.
    iat: moment().unix(), // Inclusión de la fecha y hora actual.
    exp: moment().add(15, "minutes").unix(),  // Caducidad del token.
  };
  return jwt.sign(payload, config.TOKEN_SECRET);  // Creación del token 
};                                                // añadiendo el secreto.