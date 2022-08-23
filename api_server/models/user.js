var mongoose = require('mongoose');

// Esquema de usuario
var userSchema = mongoose.Schema({ 
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creación del modelo a partir del esquema
mongoose.model('User', userSchema);