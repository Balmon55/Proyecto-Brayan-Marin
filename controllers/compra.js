import Compra from "../models/compra.js";
import modificarStock from "../db-helpers/modificarStock.js";


const controllerCompra={

    CompraGet: async (req, res) => {
        const { value } = req.query;
        const compra = await Compra
          .find({
            $or: [
              { TypeCheck: new RegExp(value, "i") },
              { NumCheck: new RegExp(value, "i") },
            ],
          })
          .sort({ createdAt: -1 })
          .populate("User", ["Name", "Email"])
          .populate("Person ", ["Name", "idDocument"]);
    
        res.json({
          compra,
        });
      },

    CompraById: async (req, res) => {
        const { id } = req.params;
        const compra = await Compra
          .findOne({ _id: id })
          .populate("User", ["Name", "Email"])
          .populate("Person ", ["Name", "idDocument"]);
    
        res.json({
         compra,
        });
    },

    CompraPost: async (req, res) => {
        const {User,Person,TypeCheck,SerieCheck,NumProof,Total,Tax,Details} = req.body;
        const compra = new Compra({User,Person,TypeCheck,SerieCheck,NumProof,Total,Tax,Details});
    //TOTAL
        compra.Total = compra.Details.reduce((acc, Article) => acc + (Article.Quantity * Article.Price), 0)
    //TAX
        compra.Tax = compra.Total * 0.19
        await compra.save();
        Details.map((article) => modificarStock.disminuirStock(Article._id,Article.Quantity))
        res.json({
          compra,
        });

    },
    CompraPut:async(req,res)=>{
        const {id}=req.params;
        const compra =await Compra.findByIdAndUpdate(id);
        res.json({
            compra,
        });
    },
    CompraActivar:async(req,res)=>{
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, { State: 1 });
        compra.Details.map((Article) => modificarStock.disminuirStock(Article._id,Article.Quantity))
        res.json({
          compra,
        });
    },
    CompraDesactivar:async(req,res)=>{
        const { id } = req.params;
        const compra = await Compra.findByIdAndUpdate(id, { State: 1 });
        compra.Details.map((Article) => modificarStock.aumentarStock(Article._id,Article.Quantity))
        res.json({
          compra,
        }); 
    },
    CompraDelete:async(req,res)=>{
        const {id}=req.params;
        const compra =await Compra.findByIdAndDelete(id);
        res.json({
            compra,
        });
    },

};
export default controllerCompra;
