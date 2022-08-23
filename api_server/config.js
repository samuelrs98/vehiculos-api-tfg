// Este archivo contiene el secreto con el que se encriptan los tokens.
module.exports = {
    TOKEN_SECRET: process.env.TOKEN_SECRET || "password"
};