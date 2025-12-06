const Lectura = require('../models/Lectura');
const Usuario = require('../models/Usuario');

const lecturaInstance = new Lectura();
const usuarioInstance = new Usuario();

// Función simulada para generar lectura con IA
const generarLecturaIA = (tipo, fecha_nacimiento) => {
  if (tipo === 'principal') {
    return `Lectura principal basada en tu fecha de nacimiento ${fecha_nacimiento}: Eres una persona equilibrada.`;
  } else {
    return `Lectura diaria: Hoy es un día propicio para nuevas oportunidades.`;
  }
};

exports.generarLecturaPrincipal = async (req, res) => {
  try {
    const usuario = await usuarioInstance.findById(req.params.usuario_id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    const existente = await lecturaInstance.findPrincipalByUsuarioId(req.params.usuario_id);
    if (existente) return res.status(400).json({ error: 'Lectura principal ya existe' });
    const contenido = generarLecturaIA('principal', usuario.fecha_nacimiento);
    const id = await lecturaInstance.create({ usuario_id: req.params.usuario_id, tipo: 'principal', contenido });
    res.status(201).json({ id, contenido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generarLecturaDiaria = async (req, res) => {
  try {
    const usuario = await usuarioInstance.findById(req.params.usuario_id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (usuario.estado !== 'activo') return res.status(403).json({ error: 'Usuario inactivo' });
    const contenido = generarLecturaIA('diaria', usuario.fecha_nacimiento);
    const id = await lecturaInstance.create({ usuario_id: req.params.usuario_id, tipo: 'diaria', contenido });
    res.status(201).json({ id, contenido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLecturasByUsuario = async (req, res) => {
  try {
    const lecturas = await lecturaInstance.findByUsuarioId(req.params.usuario_id);
    res.json(lecturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLecturaById = async (req, res) => {
  try {
    const lectura = await lecturaInstance.findById(req.params.id);
    if (!lectura) return res.status(404).json({ error: 'Lectura no encontrada' });
    res.json(lectura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
