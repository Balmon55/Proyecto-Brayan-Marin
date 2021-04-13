import Persona from '../models/persona.js';
const controllerPersona={

PersonaGet:async(req,res)=>{
  const { value } = req.query;
  const persona = await Persona
      .find({
        $or: [
          {Name: new RegExp(value, "i") },
          {Description: new RegExp(value, "i") },
        ],
      })
      .sort({ CreatedAt: -1 });
    res.json({
      persona,
    });
},
PersonaById:async(req,res)=>{
  const { id } = req.params;
  const persona = await Persona.findOne({id});

    res.json({
      persona,
    });
},
PersonaPost:async(req,res)=>{
    const {TypePerson,Name,Document,IdDocument,Address,Phone,Email,} = req.body;
      const persona = new Persona({TypePerson,Name,Document,IdDocument,Address,Phone,Email,});
      await persona.save();
      res.json({
        persona,})
  
},
PersonaPut:async(req,res)=>{
    const { id } = req.params;
    const { _id, CreatedAt, __v, State, ...rest} = req.body;
    const persona = await Persona.findByIdAndUpdate(id,rest);
    res.json({
     persona,
    });
},
PersonaActivar:async(req,res)=>{
    const {id} = req.params;
    const persona = await Persona.findByIdAndUpdate(id,{ State: 1});
    res.json({
      persona,
    });
},
PersonaDesactivar:async(req,res)=>{
    const {id} = req.params;
    const persona = await Persona.findByIdAndUpdate(id,{ State: 0});
    res.json({
      persona,
    });
},
PersonaDelete:async(req,res)=>{
    const {id}=req.params;
    const persona=await Persona.findByIdAndDelete(id);
    res.json({
        persona,
    });
},

};

export default controllerPersona;