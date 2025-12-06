const express = require('express');
const router = express.Router();
const lecturaControllers = require('../controllers/lecturaControllers');

router.post('/principal/:usuario_id', lecturaControllers.generarLecturaPrincipal);
router.post('/diaria/:usuario_id', lecturaControllers.generarLecturaDiaria);
router.get('/usuario/:usuario_id', lecturaControllers.getLecturasByUsuario);
router.get('/:id', lecturaControllers.getLecturaById);

module.exports = router;
