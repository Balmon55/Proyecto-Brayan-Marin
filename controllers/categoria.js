import Categoria from "../models/categoria.js";
const categoria = {
  CategoriaGet: async (req, res) => {
    const {value}=req.query;
    const categoria = await Categoria
        .find({
          $or:[
              {Name: new RegExp(value,'i')},
              {Description: new RegExp(value,'i')}
          ] 
          
        })
        .sort({ CreatedAt: -1});
    res.json({
      categoria,
    });
  },

  CategoriaPost: async (req, res) => {
    const { Name, Description } = req.body;
    const categoria = new Categoria({ Name, Description });
    await categoria.save();

    res.json({
      categoria,
    });
  },

  CategoriaByid: async (req, res) => {
    const { id } = req.params;
    const categoria = await Categoria.findOne({ _id: id });

    res.json({
      categoria
    });
  },

  CategoriaPut: async (req,res)=>{
    const {id}= req.params;
    const {_id,CreatedAt,__V,Condition,...rest}=req.body;
    
    const categoria=await Categoria.findByIdAndUpdate(id,rest)
    
    res.json({
      categoria
    })
  },

  CategoriaActivar: async(req,res)=>{
    const {id}=req.params;
    const categoria=await Categoria.findByIdAndUpdate(id,{Condition:1})
    res.json({
      categoria
    })
  },
  CategoriaDesactivar:async (req,res)=>{
    const {id}=req.params;
    const categoria=await Categoria.findByIdAndUpdate(id,{Condition:0})
    res.json({
      categoria
    })
  },
  CateogriaDelete:async (req,res)=>{
    const {id}=req.params;
    const categoria =await Categoria.findByIdAndDelete(id);
    res.json({
      categoria
    })
  }
};
export default categoria;
