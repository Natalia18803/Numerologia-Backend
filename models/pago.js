const pool = require('../config/database');

class Pago {
  async create({ usuario_id, monto, fecha_pago, fecha_vencimiento, metodo }) {
    const [result] = await pool.execute(
      'INSERT INTO pagos (usuario_id, monto, fecha_pago, fecha_vencimiento, metodo) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, monto, fecha_pago, fecha_vencimiento, metodo]
    );
    return result.insertId;
  }

  async findByUsuarioId(usuario_id) {
    const [rows] = await pool.execute('SELECT * FROM pagos WHERE usuario_id = ?', [usuario_id]);
    return rows;
  }

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM pagos');
    return rows;
  }
}

module.exports = Pago;
