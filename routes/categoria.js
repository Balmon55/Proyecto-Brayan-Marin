import {Router} from 'express';
import {check} from 'express-validator';
import categoria from '../controllers/categoria.js';
import {existeCategoriaByName,existeCategoriaById } from '../db-helpers/categoria.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { ValidarJWT } from '../middlewares/validar.jwt.js';

const router=Router(); 

router.get('/',[
    ValidarJWT, 
    validarCampos
],categoria.CategoriaGet);

router.get('/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaByid);

router.post('/',[
    ValidarJWT, 
    check('Name','El nombre es requerido').not().isEmpty(),
    check('Name').custom(existeCategoriaByName),
    validarCampos
    
],categoria.CategoriaPost);

router.put('/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('Name').custom(existeCategoriaByName),
    validarCampos 
],categoria.CategoriaPut);

router.put('/activar/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaActivar);

router.put('/desactivar/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaDesactivar);

router.delete('/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CateogriaDelete);

export default router;
