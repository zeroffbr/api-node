const express = require('express');
const router  = express.Router(); 
const controllerUtils = require('../controller/controller.Utils');

router.get('/boleto', controllerUtils.getBoletoNumero);
router.get('/boletos', controllerUtils.getBoletoCNPJ);

router.get('/', controllerUtils.getHome);

module.exports = router;