const express = require('express');
const router  = express.Router();
const controllerGrupo = require('../controller/controller.grupo');

router.get('/', controllerGrupo.getGrupo);
router.get('/:grupo_id', controllerGrupo.getGrupoID);
router.post('/', controllerGrupo.postGrupo);
router.patch('/', controllerGrupo.patchGrupo);
router.delete('/', controllerGrupo.deleteGrupo);

module.exports = router;