import Usuario from "../models/usuario.js";
import bcryptjs from 'bcryptjs'  
import { generarJWT } from "../middlewares/validar.jwt.js";

 const controllersUsuario={

    UsuarioGet: async (req, res)=>{
        const {value}=req.query;
    const usuario = await Usuario
        .find({
          $or:[
              {Name: new RegExp(value,'i')},
              {Email: new RegExp(value,'i')}
              
          ] 
          
        })
        .sort({ CreatedAt: -1});
        res.json({
           usuario,
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
    Login:async(req,res)=>{
        const {Email,Password}=req.body;
        const usuario =await Usuario.findOne({Email});

        if(! usuario){
            return res.json({
                msg:'Usuario/Password no son correctos usu '
            })
            
        }
        if(! usuario.State===0){
            return res.json({
                msg:'Usuario/Password no son correctos estado '
            })
            
        }
        const ValidarPassword=bcryptjs.compareSync(Password,usuario.Password)
        if(! ValidarPassword){
            return res.json({
                msg:'Usuario/Password no son correctos contra'
            });

             
        }
        const token= await generarJWT(usuario._id)
        return res.json({
            usuario,
            token
        })
        
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