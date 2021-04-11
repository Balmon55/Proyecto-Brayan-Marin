import {Router} from 'express';
import categoria from '../controllers/categoria.js';

const router=Router(); 

router.get('/',categoria.CategoriaGet);

router.get('/:id',categoria.CategoriaByid);

router.post('/',categoria.CategoriaPost);

router.put('/:id',categoria.CategoriaPut);

router.put('/activar/:id',categoria.CategoriActivar);

router.put('/desactivar/:id',categoria.CategoriaDesactivar);

router.delete('/:id',categoria.CateogriaDelete);

export default router;
