import {Router} from 'express';
import {check} from 'express-validator';
import controllersUsuario from '../controllers/usuario.js';
import { existeUsuarioByEmail, existeUsuarioById } from '../db-helpers/usuario.js';
import { validarCampos } from '../middlewares/validar-campos.js';


const router=Router(); 

router.get('/',controllersUsuario.UsuarioGet);

router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioById);

router.post('/',[
    check('Email','El email es requerido').not().isEmpty(),
    check('Email').custom(existeUsuarioByEmail),
    check('Name','El Nombre es requerido').not().isEmpty(),
    check('Password','La contraseña es requerida').not().isEmpty(),
    validarCampos
    
],controllersUsuario.UsuarioPost);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('Email').custom(existeUsuarioByEmail),
    validarCampos 
],controllersUsuario.UsuarioPut);

router.put('/activar/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioActivar);

router.put('/desactivar/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioDesactivar);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioDelete);

export default router;
