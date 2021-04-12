import {Router} from 'express';
import {check} from 'express-validator';
import controllerArticulo from "../controllers/articulo.js";
import {existeArticuloByCode, existeArticuloById, existeArticuloByName} from "../db-helpers/articulo.js";
import {validarCampos} from "../middlewares/validar-campos.js";
import {existeCategoriaById} from "../db-helpers/categoria.js";


const router=Router(); 

router.get('/',controllerArticulo.ArticuloGet);

router.get('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos
  ],controllerArticulo.ArticuloById);

router.post('/',[
    check("Category", "Categoria es requerida").not().isEmpty(),
    check("Category", "Categoria es requerida").isMongoId(),
    check("Code", "Codigo es requerido").not().isEmpty(),
    check("Name", "Nombre es requerido").not().isEmpty(),
    check("Description", "Descripción es requerida").not().isEmpty(),
    check("SalePrice", "Precio es requerido").not().isEmpty(),
    check("Stock", "Stock es requerido").not().isEmpty(),
    check("Name").custom(existeArticuloByName),
    check("Category").custom(existeCategoriaById),
    validarCampos
  ],controllerArticulo.ArticuloPost);

router.put('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeArticuloById),
    check("Name").custom(existeArticuloByName),
    check("Code").custom(existeArticuloByCode),
    validarCampos
  ],controllerArticulo.ArticuloPut);

router.put('/activar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos
  ],controllerArticulo.ArticuloActivar);

router.put('/desactivar/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos
  ],controllerArticulo.ArticuloDesavtivar);

router.delete('/:id',[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeArticuloById),
    validarCampos
  ],controllerArticulo.ArticuloDelete);

export default router;
