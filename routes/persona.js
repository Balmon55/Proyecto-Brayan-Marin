import {Router} from 'express';
import {check} from 'express-validator';
import controllerPersona from '../controllers/persona.js';
import persona from '../db-helpers/persona.js';
import {validarCampos} from '../middlewares/validar-campos.js';

const router=Router(); 

router.get('/',controllerPersona.PersonaGet);

router.get('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaById);

router.post('/',[
    check("TypePerson", "Tipo de persona es requerida").not().isEmpty(),
    check("Name", "El Nombre es requerido").not().isEmpty(),
    check("document", "El Documento es requerido").not().isEmpty(),
    check("IdDocument", "Numero  de documento es requerido").not().isEmpty(),
    check("Address", "La dirección es requerida").not().isEmpty(),
    check("Phone", "El numero de Celular es requerido").not().isEmpty(),
    check("Email", " el Email es requerido").not().isEmpty(),
    check("IdDocument").custom(persona.existePersonaByIdDocument),
    check("Phone").custom(persona.existePersonaByPhone),
    check("Email").custom(persona.existePersonabyEmail),
    validarCampos
  ],controllerPersona.PersonaPost);

router.put('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    check("IdDocument").custom(persona.existePersonaByIdDocument),
    check("Phone").custom(persona.existePersonaByPhone),
    check("Email").custom(persona.existePersonabyEmail),
    validarCampos
  ],controllerPersona.PersonaPut);

router.put('/activar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaActivar);

router.put('/desactivar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaDesactivar);

router.delete('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaDelete);

export default router;
