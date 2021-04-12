import mongoose from 'mongoose'

const UsuarioSchema=mongoose.Schema({
    Name:{type:String,required:true,maxlength:50},
    Email:{type:String, required:true, maxlength:50,unique:true},
    Password:{type:String, required:true},
    Role:{type:String, required:true,maxlength:20 },
    State:{type:String, default:1},
    CreatedAt:{type:Date, default:Date.now}
});
export default mongoose.model('Usuario',UsuarioSchema);