const pool = require('../config/database');

class Usuario {
  async create({ nombre, email, fecha_nacimiento }) {
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nombre, email, fecha_nacimiento, estado, fecha_registro) VALUES (?, ?, ?, ?, NOW())',
      [nombre, email, fecha_nacimiento, 'inactivo']
    );
    return result.insertId;
  }

  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM usuarios');
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  }

  async update(id, { nombre, email, fecha_nacimiento }) {
    await pool.execute(
      'UPDATE usuarios SET nombre = ?, email = ?, fecha_nacimiento = ? WHERE id = ?',
      [nombre, email, fecha_nacimiento, id]
    );
  }

  async updateEstado(id, estado) {
    await pool.execute('UPDATE usuarios SET estado = ? WHERE id = ?', [estado, id]);
  }

  async delete(id) {
    await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  }
}

module.exports = Usuario;
