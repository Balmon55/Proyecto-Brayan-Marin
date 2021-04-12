import Compra from "../models/compra.js";


const existeCompraById = async (id) => {
    const exist = await Compra.findById(id);
    if (!exist) throw new Error(`No existe una compra para este ID`);
  }


export {existeCompraById}