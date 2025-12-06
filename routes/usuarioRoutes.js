const express = require('express');
const router = express.Router();
const usuarioControllers = require('../controllers/usuarioControllers');

router.get('/', usuarioControllers.getAllUsuarios);
router.get('/:id', usuarioControllers.getUsuarioById);
router.post('/', usuarioControllers.createUsuario);
router.put('/:id', usuarioControllers.updateUsuario);
router.patch('/:id/estado', usuarioControllers.updateEstadoUsuario);
router.delete('/:id', usuarioControllers.deleteUsuario);

module.exports = router;
