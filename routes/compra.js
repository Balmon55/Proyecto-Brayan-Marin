import {Router} from 'express';
import {check } from 'express-validator';
import controllerCompra from '../controllers/compra.js';
import { existeCompraById } from '../db-helpers/compra.js' ;
import {validarCampos} from '../middlewares/validar-campos.js';
import { existeUsuarioById } from '../db-helpers/usuario.js';
import persona from '../db-helpers/persona.js';


const router=Router(); 

router.get('/',controllerCompra.CompraGet);

router.get('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos
  ],controllerCompra.CompraById);

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
  ],controllerCompra.CompraPost);

router.put('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos
  ],controllerCompra.CompraPut);

router.put('/activar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos
  ],controllerCompra.CompraActivar);

router.put('/desactivar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos
  ],controllerCompra.CompraDesactivar);

router.delete('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeCompraById),
    validarCampos
  ],controllerCompra.CompraDelete);

export default router;
 