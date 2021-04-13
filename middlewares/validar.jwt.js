import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js'
 
const generarJWT=(id)=>{
    return new Promise((resolve,reject)=>{
        const payload={uid:id}
        jwt.sign(payload,process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token ')
            }else{
                resolve(token)
            }
        })  
    
      })

} 

const ValidarJWT=async(req,res,next)=>{
    const token=req.header('token')
//TOKEN VACIO
   if(! token){
    return res.status(401).json({
        msg:'No existe token en la peticion'
    });
}
  
    try {
        const { uid }=jwt.verify(token,process.env.SECRETPRIVATEKEY)
        const usuario= await Usuario.findById(uid)


        if(! usuario){
           return  res.status(401).json({
                msg:'Token no valido '
            })
        }
        if(usuario.State===0){
           return res.status(401).json({
                msg:'Token no valido  '
            })
        }
        req.usuario=usuario;
    
        next();
    } catch (error) {
        res.status(401).jason({
            msg:'token no válido'
        })
    }


//ESTADO==1

}


export {generarJWT,ValidarJWT}


