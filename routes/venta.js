import {Router} from 'express';
import {check } from 'express-validator';
import controllerVenta from '../controllers/venta.js';
import venta from '../db-helpers/venta.js' ;
import {validarCampos} from '../middlewares/validar-campos.js';
import { existeUsuarioById } from '../db-helpers/usuario.js';
import persona from '../db-helpers/persona.js';


const router=Router(); 

router.get('/',controllerVenta.VentaGet);

router.get('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaById);

router.post('/',  [
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
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaPut);

router.put('/activar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaActivar);

router.put('/desactivar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaDesactivar);

router.delete('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(venta.existeVentaById),
    validarCampos
  ],controllerVenta.VentaGetDelete);

export default router;
 