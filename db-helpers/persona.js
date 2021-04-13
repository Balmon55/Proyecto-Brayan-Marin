import Persona from "../models/persona.js";

const persona={
  existePersonaById: async (id) => {
    const exist = await Persona.findById(id);
    if (!exist) throw new Error(`No existe una persona para este ID`);
  },
   existePersonaByIdDocument: async (IdDocument) => {
    const exist = await Persona.findOne({ IdDocument });
    if (exist) throw new Error(`Ya existe una persona con este mismo documento`);
  },
   existePersonaByPhone: async (Phone) => {
    const exist = await Persona.findOne({ Phone });
    if (exist) throw new Error(`Ya existe una persona con este mismo numero de telefono`);
  },
   existePersonabyEmail: async (Email) => {
    const exist = await Persona.findOne({ Email });
    if (exist) throw new Error(`Ya existe una persona con esta misma dirección de correo`);
  },
}
   


export default persona;