import {Router} from 'express';
import {check} from 'express-validator';
import controllerPersona from '../controllers/persona.js';
import persona from '../db-helpers/persona.js';
import {validarCampos} from '../middlewares/validar-campos.js';
import { ValidarJWT } from '../middlewares/validar.jwt.js';

const router=Router(); 

router.get('/',[
  ValidarJWT, 
  validarCampos
],controllerPersona.PersonaGet);

router.get('/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaById);

router.post('/',[
  ValidarJWT, 
    check("TypePerson", "Tipo de persona es requerida").not().isEmpty(),
    check("Name", "El Nombre es requerido").not().isEmpty(),
    check("Document", "El Documento es requerido").not().isEmpty(),
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
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    check("IdDocument").custom(persona.existePersonaByIdDocument),
    check("Phone").custom(persona.existePersonaByPhone),
    check("Email").custom(persona.existePersonabyEmail),
    validarCampos
  ],controllerPersona.PersonaPut);

router.put('/activar/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaActivar);

router.put('/desactivar/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaDesactivar);

router.delete('/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(persona.existePersonaById),
    validarCampos
  ],controllerPersona.PersonaDelete);

export default router;
