import Usuario from "../models/usuario.js";
import bcryptjs from 'bcryptjs'  

 const controllersUsuario={

    UsuarioGet: async (req, res)=>{
        const {value}=req.query;
    const usuarios = await Usuario
        .find({
          $or:[
              {Name: new RegExp(value,'i')},
              {Email: new RegExp(value,'i')}
              
          ] 
          
        })
        .sort({ CreatedAt: -1});
        res.json({
           usuarios,
        });

    },
    UsuarioById:async(req,res)=>{
        const {id}=req.param;
        const usuario = await Usuario.findOne({id});
        res.json({
            usuario
        })
    },

    UsuarioPost: async (req,res)=>{
        const {Name,Email,Password,Role} =req.body;

        const usuario =new Usuario({Name,Email,Password,Role});

        //ENCRYPT
        const  salt= bcryptjs.genSaltSync();
        usuario.Password = bcryptjs.hashSync(Password,salt)


        await usuario.save();
        res.json({
            usuario
        });
    },
    UsuarioPut: async (req,res)=>{
        const {id}=req.params;
        const {_id,CreatedAt,__V,State,Role,Email,Password,...rest}=req.body;
        if (Password){
        const  salt=bcryptjs.genSaltSync();
        rest.Password = bcryptjs.hashSync(Password,salt)
    };
        const usuario=await Usuario.findByIdAndUpdate(id,rest)

        res.json({
            usuario
        })
    },

    UsuarioActivar:async(req,res)=>{
        const {id}=req.params;
    const usuario=await Usuario.findByIdAndUpdate(id,{State:1})
    res.json({
      usuario
    })
    },
    UsuarioDesactivar:async(req,res)=>{
        const {id}=req.params;
    const usuario=await Usuario.findByIdAndUpdate(id,{State:0})
    res.json({
      usuario
    })
    },
    UsuarioDelete:async(req,res)=>{
    const {id}=req.params;
    const usuario=await Usuario.findByIdAndDelete(id);
    res.json({
        usuario
    })
    },
     
 };
   
    

    


export default controllersUsuario; 