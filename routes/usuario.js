import {Router} from 'express';
import {check} from 'express-validator';
import controllersUsuario from '../controllers/usuario.js';
import { existeUsuarioByEmail, existeUsuarioById } from '../db-helpers/usuario.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { ValidarJWT } from '../middlewares/validar.jwt.js';


const router=Router(); 

router.get('/',controllersUsuario.UsuarioGet);

router.get('/:id',[
    ValidarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioById);

router.post('/',[
    ValidarJWT, 
    check('Email','El email es requerido').not().isEmpty(),
    check('Email').custom(existeUsuarioByEmail),
    check('Name','El Nombre es requerido').not().isEmpty(),
    check('Password','La contraseña es requerida').not().isEmpty(),
    validarCampos
    
],controllersUsuario.UsuarioPost);

router.post('/login',[
    ValidarJWT, 
    validarCampos
],
controllersUsuario.Login);

router.put('/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('Email').custom(existeUsuarioByEmail),
    validarCampos 
],controllersUsuario.UsuarioPut);

router.put('/activar/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioActivar);

router.put('/desactivar/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioDesactivar);

router.delete('/:id',[
    ValidarJWT, 
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampos 
],controllersUsuario.UsuarioDelete);

export default router;
