import {Router} from 'express';

import * as todoController from '../controllers/todoController.js';


const router = Router();

console.log("todoRoutes");
router.get('/', todoController.getAllTodo);
router.get('/:id', todoController.getTodoById);
router.post('/create', todoController.createTodo);


export default router;//chỉ có 1 cái export thì nó phải thêm default

