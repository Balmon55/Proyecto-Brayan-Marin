import mongoose from "mongoose";

const PersonaSchema = mongoose.Schema({
  TypePerson:{type: String, required: true,maxlength: 20},
  Name:{type: String, required: true, maxlength: 50 },
  Document:{type: String, maxlength: 50, required: true },
  IdDocument:{type: String, maxlength: 10, required: true, unique: true },
  Address:{type: String, required: true },
  Phone:{type: String, unique: true, maxlength: 20},
  Email:{type: String, unique: true, lowercase: true, required: true },
  State:{type: Number, default: 1 },
  CreateAt:{type: Date, default: Date.now },
});

export default mongoose.model("Persona", PersonaSchema);
