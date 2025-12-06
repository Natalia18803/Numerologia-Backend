const Pago = require('../models/Pago');
const Usuario = require('../models/Usuario');

const pagoInstance = new Pago();
const usuarioInstance = new Usuario();

exports.getAllPagos = async (req, res) => {
  try {
    const pagos = await pagoInstance.findAll();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPagosByUsuario = async (req, res) => {
  try {
    const pagos = await pagoInstance.findByUsuarioId(req.params.usuario_id);
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPago = async (req, res) => {
  try {
    const { usuario_id, monto, fecha_pago, metodo } = req.body;
    const fecha_vencimiento = new Date(fecha_pago);
    fecha_vencimiento.setMonth(fecha_vencimiento.getMonth() + 1);
    const id = await pagoInstance.create({ usuario_id, monto, fecha_pago, fecha_vencimiento: fecha_vencimiento.toISOString().split('T')[0], metodo });
    await usuarioInstance.updateEstado(usuario_id, 'activo');
    res.status(201).json({ id, message: 'Pago registrado, usuario activado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEstadoMembresia = async (req, res) => {
  try {
    const pagos = await pagoInstance.findByUsuarioId(req.params.usuario_id);
    const hoy = new Date();
    const activo = pagos.some(pago => new Date(pago.fecha_vencimiento) > hoy);
    res.json({ activo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
