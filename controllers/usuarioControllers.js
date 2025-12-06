const Usuario = require('../models/Usuario');

const usuarioInstance = new Usuario();

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioInstance.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await usuarioInstance.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, email, fecha_nacimiento } = req.body;
    const id = await usuarioInstance.create({ nombre, email, fecha_nacimiento });
    res.status(201).json({ id, message: 'Usuario creado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { nombre, email, fecha_nacimiento } = req.body;
    await usuarioInstance.update(req.params.id, { nombre, email, fecha_nacimiento });
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEstadoUsuario = async (req, res) => {
  try {
    const { estado } = req.body;
    await usuarioInstance.updateEstado(req.params.id, estado);
    res.json({ message: 'Estado actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    await usuarioInstance.delete(req.params.id);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
