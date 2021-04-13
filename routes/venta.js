import {Router} from 'express';
import {check } from 'express-validator';
import controllerVenta from '../controllers/venta.js';
import venta from '../db-helpers/venta.js' ;
import {validarCampos} from '../middlewares/validar-campos.js';
import { existeUsuarioById } from '../db-helpers/usuario.js';
import persona from '../db-helpers/persona.js';
import { ValidarJWT } from '../middlewares/validar.jwt.js';


const router=Router(); 

router.get('/',[
  ValidarJWT, 
  validarCampos
],controllerVenta.VentaGet);

router.get('/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaById);

router.post('/',  [
  ValidarJWT, 
    check("User", "Tipo persona es requerido").not().isEmpty(),
    check("User", "Tipo persona es requerido").isMongoId(),
    check("Person", "Nombre es requerido").not().isEmpty(),
    check("Person", "Nombre es requerido").isMongoId(),
    check("TypeCheck", "Documento es requerido").not().isEmpty(),
    check("SerieCheck", "ID Documento es requerida").not().isEmpty(),
    check("NumCheck", "Dirección es requerido").not().isEmpty(),
    check("Details", "Detalles es requerido").not().isEmpty(),
    check("User").custom(existeUsuarioById),
    check("Person").custom(persona.existePersonaById),
    validarCampos
  ],controllerVenta.VentaPost);

router.put('/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaPut);

router.put('/activar/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaActivar);

router.put('/desactivar/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaDesactivar);

router.delete('/:id',[
  ValidarJWT, 
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaGetDelete);

export default router;
 