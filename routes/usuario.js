const express = require('express');
const router  = express.Router(); 
const controllerUsuario = require('../controller/controller.usuario');

router.post('/login', controllerUsuario.postLogin);

module.exports = router;