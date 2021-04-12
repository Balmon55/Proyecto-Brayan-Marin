import Venta from '../models/venta.js';

const venta = {
  existeVentaById: async (id) => {
    const exist = await Venta.findById(id);
    if (!exist) throw new Error(`No existe una venta para este ID`);
  },
};

export default venta;