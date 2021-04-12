import mongoose from "mongoose";

const ArticuloSchema = mongoose.Schema({
  Category:{type: mongoose.Schema.Types.ObjectId,ref: "Categoria",required: true,},
  Code:{ type:String, required:true, maxlenght:70, unique: true},
  Name: {type:String, required:true, maxlenght: 50, unique: true },
  Description: {type: String, maxlenght:255 },
  SalePrice: {type: Number, required: true, default: 0 },
  Stock: {type: Number, default: 0 },
  State: {type: Number, default: 1 },
  CreatedAt: {type: Date, default:Date.now },
});
export default mongoose.model('Articulo', ArticuloSchema);