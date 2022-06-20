const express = require('express');
const router  = express.Router();
const controllerModelo = require('../controller/controller.modelo');

router.get('/', controllerModelo.getModelo);
router.get('/:modelo_id', controllerModelo.getModeloID);
router.post('/', controllerModelo.postModelo);
router.patch('/', controllerModelo.patchModelo);
router.delete('/', controllerModelo.deleteModelo);

module.exports = router;