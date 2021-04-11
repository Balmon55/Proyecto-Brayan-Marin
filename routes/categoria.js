import {Router} from 'express';
import categoria from '../controllers/categoria.js';
import {check} from 'express-validator';

const router=Router(); 

router.get('/',categoria.CategoriaGet);

router.get('/:id',[
    check('id','Is not a valid Id').isMongoId
],categoria.CategoriaByid);

router.post('/',categoria.CategoriaPost);

router.put('/:id',categoria.CategoriaPut);

router.put('/activar/:id',categoria.CategoriaActivar);

router.put('/desactivar/:id',categoria.CategoriaDesactivar);

router.delete('/:id',categoria.CateogriaDelete);

export default router;
