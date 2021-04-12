import Articulo from "../models/articulo.js";

const controllerArticulo={

ArticuloGet:async (req,res)=>{
    const {value}=req.query;
    const articulo = await Articulo
        .find({
          $or:[
              {Name: new RegExp(value,'i')},
              {Code: new RegExp(value,'i')},
              {Description: new RegExp(value,'i')}
              
          ] 
          
        })
        .sort({ CreatedAt: -1});
        res.json({
           articulo,
        });

},

ArticuloById:async (req,res)=>{
    const {id}=req.param;
    const articulo = await Articulo.findOne({id});
    res.json({
        articulo
    })
},
ArticuloPost:async (req,res)=>{
    const {Category,Code,Name,Description,SalePrice,Stock} =req.body;

    const articulo =new Articulo ({Category,Code,Name,Description,SalePrice,Stock});

    await articulo.save();
    res.json({
        articulo
    });
},
ArticuloPut:async (req,res)=>{
    const { id } = req.params;
    const { _id, CreatedAt, __v, State, ...rest} = req.body;
    const articulo = await Articulo.findByIdAndUpdate(id,rest);
    res.json({
      articulo,
    });
},
ArticuloActivar:async (req,res)=>{
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { State: 1 });
    res.json({
      articulo,
    });
},
ArticuloDesavtivar:async (req,res)=>{
    const { id } = req.params;
    const articulo = await Articulo.findByIdAndUpdate(id, { State: 0 });
    res.json({
      articulo,
    });
},
ArticuloDelete:async (req,res)=>{
    const {id}=req.params;
    const articulo=await Articulo.findByIdAndDelete(id);
    res.json({
        articulo
    });
},

};

export default controllerArticulo;