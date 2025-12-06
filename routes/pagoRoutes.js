const express = require('express');
const router = express.Router();
const pagoControllers = require('../controllers/pagoControllers');

router.get('/', pagoControllers.getAllPagos);
router.get('/:usuario_id', pagoControllers.getPagosByUsuario);
router.post('/', pagoControllers.createPago);
router.get('/estado/:usuario_id', pagoControllers.getEstadoMembresia);

module.exports = router;
