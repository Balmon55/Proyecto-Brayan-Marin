import mongoose from "mongoose";

const CompraSchema=mongoose.Schema({
  User:{type: mongoose.Schema.Types.ObjectId, ref:"Usuario",required: true },
  Person:{type:mongoose.Schema.Types.ObjectId,ref:"Persona",required: true,},
  TypeCheck:{type: String, required: true, maxlength: 20 },
  SerieCheck:{type: String, maxlength: 10 },
  NumCheck:{type: String, maxlength: 10, required: true },
  Tax:{type: Number, required: true },
  Total:{type: Number, required: true },
  Details: [
    {
      _id: { type: String, required: true },
      Article: { type: String, required: true },
      Quantity: { type: Number, required: true },
      Price: { type: Number, required: true },
    },
  ],
  State: { type: Number, default: 1 },
  CreatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Compra", CompraSchema);
