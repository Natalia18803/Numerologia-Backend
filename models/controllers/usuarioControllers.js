const { obtenerUsuarios,
     obtenerUsuarioPorId,
    crearUsuario,
    actulizarUsuario,
     eliminarUsuario } = require('../models/usuario');


async function getUsuarios(req, res) {
    try {
        const usuarios = await obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios'});
    }
}

async function getUsuario(req, res) {
    try {
        const{id} =req.params;
        const usuario = await obtenerUsuarioPorId(id);
        if (!usuario = await)
    }
}