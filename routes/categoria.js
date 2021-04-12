import {Router} from 'express';
import {check} from 'express-validator';
import categoria from '../controllers/categoria.js';
import {existeCategoriaByName,existeCategoriaById } from '../db-helpers/categoria.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router=Router(); 

router.get('/',categoria.CategoriaGet);

router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaByid);

router.post('/',[
    check('Name','El nombre es requerido').not().isEmpty(),
    check('Name').custom(existeCategoriaByName),
    validarCampos
    
],categoria.CategoriaPost);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    check('Name').custom(existeCategoriaByName),
    validarCampos 
],categoria.CategoriaPut);

router.put('/activar/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaActivar);

router.put('/desactivar/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CategoriaDesactivar);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos 
],categoria.CateogriaDelete);

export default router;
