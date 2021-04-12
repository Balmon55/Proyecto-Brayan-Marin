import Categoria from "../models/categoria.js";

const existeCategoriaById=async(id)=>{
    const existe=await Categoria.findById(id)

    if( ! existe ) throw new Error(`No existe categoria para este ID ${id} `)
}
const existeCategoriaByName=async(Name)=>{
    const existe=await Categoria.findOne({Name})

    if(existe) throw new Error('Ya existe una categoria con ese Nombre')
}
export {existeCategoriaById, existeCategoriaByName}