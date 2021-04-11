import {Router} from 'express';
import controllersUsuario from '../controllers/usuario.js';


const router=Router(); 

router.get('/',controllersUsuario.UsuarioGet);

router.get('/:id',controllersUsuario.UsuarioById);

router.post('/',controllersUsuario.UsuarioPost);

router.put('/:id',controllersUsuario.UsuarioPut);

router.put('/activar/:id',controllersUsuario.UsuarioActivar);

router.put('/desactivar/:id',controllersUsuario.UsuarioDesactivar);

router.delete('/:id',controllersUsuario.UsuarioDelete);

export default router;
