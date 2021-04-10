import mongoose from "mongoose";

const CategoriaSchema= mongoose.Schema({
    Name: {type: String, required:true, maxLength:50, unique:50},
    Description:{type:String,maxlength:150},
    Condition:{type:Number,default:1},//Activo:1 Incativo:0
    Created:{type:Date, default:Date.now}
});

export default mongoose.model('Categoria', CategoriaSchema)
