const pool =require('../database'); 

async function obtenerUsuarios() {
    const [rows] =await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    return rows; 
}

async function obtenerUsuarioPorId(id) {
    const [rows] = await pool.query('SELECT * FROM usuario WHERE id = ?' , [id]);
    return rows;
}


async function crearUsuario({nombre, email, fecha_nacimiento}) {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, fecha_nacimiento) VALUES (?, ?, ?,)'
        [nombre, email, fecha_nacimiento]
    );
    return {id: result.insertId, nombre, email, fecha_nacimiento};
}


async function actualizarUsuario(id, { nombre, email, fecha_nacimiento}) {
    await pool.query('UPDATE usuarios SET nombre = ?, email = ?, fecha_nacimiento = ? WHERE id = ?', [nombre, email, fecha_nacimiento, id]);

}


async function eliminarUsuario(id) {
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return {mensaje: 'Usuario Eliminado'};
}

module.exports ={
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};