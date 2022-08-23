var mongoose = require('mongoose');

// Esquema del vehículo
var vehicleSchema = mongoose.Schema({ 
    tipo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String
    },
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    anio_alta: {
        type: Number,
        required: true
    },
    uso: {
        type: String
    },
    institucion: {
        type: String
    },
    regimen: {
        type: String
    },
    estado: {
        type: Boolean,
        required: true
    },
    anio_baja: {
        type: Number
    }
});

// Creación del modelo a partir del esquema
mongoose.model('Vehiculo', vehicleSchema);  