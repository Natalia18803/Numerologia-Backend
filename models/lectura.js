const pool = require('../config/database');

class Lectura {
  async create({ usuario_id, tipo, contenido }) {
    const [result] = await pool.execute(
      'INSERT INTO lecturas (usuario_id, tipo, contenido, fecha_lectura) VALUES (?, ?, ?, NOW())',
      [usuario_id, tipo, contenido]
    );
    return result.insertId;
  }

  async findByUsuarioId(usuario_id) {
    const [rows] = await pool.execute('SELECT * FROM lecturas WHERE usuario_id = ?', [usuario_id]);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM lecturas WHERE id = ?', [id]);
    return rows[0];
  }

  async findPrincipalByUsuarioId(usuario_id) {
    const [rows] = await pool.execute('SELECT * FROM lecturas WHERE usuario_id = ? AND tipo = "principal"', [usuario_id]);
    return rows[0];
  }
}

module.exports = Lectura;
