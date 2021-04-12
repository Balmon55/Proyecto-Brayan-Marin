import Usuario from "../models/usuario.js";

const existeUsuarioById=async(id)=>{
    const existe=await Usuario.findById(id)

    if( ! existe ) throw new Error(`No existe usuario para este ID ${id} `)
}
const existeUsuarioByEmail=async(Email)=>{
    const existe=await Usuario.findOne({Email})

    if(existe) throw new Error('Ya existe un usuario con ese Email')
}

export {existeUsuarioById, existeUsuarioByEmail}