import Articulo from "../models/articulo.js"


  const existeArticuloById= async (id) => {
    const exist = await Articulo.findById(id);
    if (!exist) throw new Error(`No existe un articulo para este ID`);
  }

  const existeArticuloByName= async (Name) => {
    const exist = await Articulo.findOne({ Name });
    if (exist) throw new Error(`Ya existe un aritculo con este nombre`);
  }

  const existeArticuloByCode= async (Code) => {
    const exist = await articleModel.findOne({ Code });
    if (exist) throw new Error(`Ya existe un articulo con este codigo`);
  }


export {existeArticuloById, existeArticuloByName, existeArticuloByCode};
