import {Router} from 'express';
import {authenticationMiddleware, authorizationMiddleware} from '../middleware/auth.js';
// import * as todoController from '../controllers/todoController.js';
import { getAllTodo, getTodoById, createTodo, updateTodo, deleteTodo } from '../controllers/todoController.js';


const router = Router();
router.use(authenticationMiddleware);//all route need authen

// console.log("todoRoutes");
//get all chi co admin
router.get('/', authorizationMiddleware(['admin']), getAllTodo);

router.get('/:id',authorizationMiddleware(['admin', 'user']), getTodoById);
router.post('/create', authorizationMiddleware(['admin', 'user']), createTodo);
router.put('/update', authorizationMiddleware(['admin', 'user']), updateTodo);
router.delete('/delete/:id', authorizationMiddleware(['admin', 'user']), deleteTodo);


export default router;//chỉ có 1 cái export thì nó phải thêm default

