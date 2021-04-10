import {Router} from 'express';
import categoria from '../controllers/categoria.js';

const router=Router(); 

router.get('/',categoria.CategoriaGet);

router.get('/:id',categoria.CategoriaByid);

router.post('/',categoria.CategoriaPost);

router.put('/:id');

router.put('/activar/:id');

router.put('/desactivar/:id');

router.delete('/:id');

export default router;
