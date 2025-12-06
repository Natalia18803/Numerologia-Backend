import usuario from '../models/usuario.js';

export const existeUsuarioPorId=async(id)=>{
    const existId = await usuario.findById(id);
    if (!existId) {
        throw new Error (` ${id} No existe`);
    }
}

export const validarEmail = async(email)=>{
    const existeEmail = await usuario.findOne({email});
    if (existeEmail) {
        throw new Error (` El email: ${email} ya está registrado`);
    }
} 