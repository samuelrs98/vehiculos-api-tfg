var mongoose = require('mongoose');
var User = mongoose.model('User');
var service = require('./service'); // Carga del archivo con la función createToken.

// Función para el registro de usuarios.
module.exports.signup = function(req, res) { 
  User
  .create({username: req.body.username, password: req.body.password}, 
    function(err, user) { 
    if (err) {
      return res.status(400).send(err); // Devolver error si no 
    }                                   // se ha creado el usuario.
    return res
    .status(200)
    .send({token: service.createToken(req.body.username)}); 
  });                        // Devolver token si se crea el usuario con éxito.
};

// Función para iniciar sesión.
module.exports.login = function(req, res) { 
  if (req.body.username && req.body.password) {
    User
    .count({username: req.body.username, password: req.body.password}) // Contar 
    .exec(function(err, user) { // el número de usuarios cón ese nombre y contraseña.
      if (!user) {  // Si no existe usuario con esas credenciales, se envía un error.
        return res.status(401).send({"message": "Invalid user and/or password"}); 
      } else if (err) { // Devolver error si ha habido un error al
        return res.status(404).send(err); // realizar la consulta.
      }
      return res
      .status(200)  // Si existen las credenciales, se devuelve un token de acceso.
      .send({token: service.createToken(req.body.username)}); 
    });
  } else {  // Devolver error si falta algún parámetro.
    return res.status(401).send({"message": "Invalid user and/or password"}); 
  }
};