import {Router} from 'express';

import * as userController from '../controllers/userController.js';


const router = Router();

// console.log("loginRoutes");
router.post('/register', userController.register);
router.post('/login', userController.login);


export default router;//chỉ có 1 cái export thì nó phải thêm default

