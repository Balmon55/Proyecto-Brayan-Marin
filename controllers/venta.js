import Venta from "../models/venta.js";
import modificarStock from "../db-helpers/modificarStock.js";

const controllerVenta = {
  VentaGet: async (req, res) => {
    const { value } = req.query;
    const venta= await Venta
      .find({
        $or: [
          { TypeCheck: new RegExp(value, "i") },
          { NumCheck: new RegExp(value, "i") },
        ],
      })
      .sort({ CreatedAt: -1 })
      .populate("User", ["Name", "Email"])
      .populate("Person ", ["Name", "IdDocument"]);

    res.json({
     venta,
    });
  },
  VentaById: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta
      .findOne({  id })
      .populate("User", ["Name", "Email"])
      .populate("Person ", ["Name", "IdDocument"]);

    res.json({
     venta,
    });
  },
  VentaPost: async (req, res) => {
    const {User,Person,TypeCheck,SerieCheck,NumCheck,Total,Tax,Details} = req.body;
    const venta = new Venta({User,Person,TypeCheck,SerieCheck,NumCheck,Total,Tax,Details});
//TOTAL
    venta.Total = venta.Details.reduce((acc, Article) => acc + (Article.Quantity * Article.Price), 0)
//TAX
    venta.Tax = venta.Total * 0.19
    await venta.save();
    Details.map((Article) => modificarStock.disminuirStock(Article._id,Article.Quantity))
    res.json({
      venta,
    });
  },
  VentaPut: async (req, res) => {
    const {id}=req.params;
    const venta =await Venta.findByIdAndUpdate(id);
    res.json({
        venta,
    });
  },
  VentaActivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { State: 1 });
    venta.Details.map((Article) => modificarStock.disminuirStock(Article._id,Article.Quantity))
    res.json({
      venta,
    });
  },
  VentaDesactivar: async (req, res) => {
    const { id } = req.params;
    const venta = await Venta.findByIdAndUpdate(id, { State: 1 });
    venta.Details.map((Article) => modificarStock.aumentarStock(Article._id,Article.Quantity))
    res.json({
      venta,
    }); 
  },
  VentaGetDelete: async (req, res) => {
    CompraDelete:async(req,res)=>{
        const {id}=req.params;
        const venta =await Venta.findByIdAndDelete(id);
        res.json({
            venta,
        });
    }
  },
 
};

export default controllerVenta;
