import {type Request, type Response} from 'express';
import { AppDataSource } from "../config/database.js"; // Your initialized DataSource instance
import { User } from "../entities/user.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export async function register(req:Request, res:Response){
    try{
        const userRepo = AppDataSource.getRepository(User);
        const { username, email, password, role } = req.body;//trích xuất 3 trường username, email, pass từ req.body
        
        //neu chua nhap 1 trong 3 field thi tra ve
        if(!username || !email || !password) {
            res.status(400).send('username, email and password are required');
        }
        const user = await userRepo.findOne({where: {username: req.body.username}}); //see: https://typeorm.io/docs/working-with-entity-manager/find-options/
        console.log(user);
        if(user){//co ton tai user -> da ton tai user
            res.status(409).send('User exists');
        }else{
            //tao user moi
            //luu vao BD
            //res -> register ok
            const hashPass = await bcrypt.hash(password, 10);
            const newUser = userRepo.create();
            newUser.username = req.body.username;
            newUser.email = req.body.username;
            newUser.password = hashPass;
            if(role == 'admin') newUser.role = 'admin';
            else newUser.role = 'user';

            await userRepo.save(newUser);
            res.status(200).json({id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role});
        }
    }catch(error){
        let message = 'register fail: ' + error;
        console.error(message);
        res.status(500).json({message: 'register fail'});
    }

}

export async function login(req:Request, res: Response){
    //nhận username, pass từ req
    //đọc DB - so sánh pass
        //nếu sai res login fail
        //nếu đúng:
            //gen JWT
                //header - payload - signature
            //res JWT
    try{
        console.log('---------login');
        const {username, password} = req.body;
        const userRepo = AppDataSource.getRepository(User); //trả về 1 object là 1 repo(table) với các thông tin login, DB name từ AppDataSource -  với các properties và method(find, insert...) để thao tác với table đó  => nghĩa là nó connect tới table. Usser
        const user = await userRepo.findOne({where: {username: username}}); //see: https://typeorm.io/docs/working-with-entity-manager/find-options/
        if(!user){
            return res.status(404).send('Unregister user');
        }
        const isPasswordValid = await bcrypt.compare(password, <string>user.password);
        if(!isPasswordValid) {
            return res.status(409).json({ message: 'Invalid credentials' });
        }
        //password ok -> gen JWT
        const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '24h' }
        );
        
        return res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, username: user.username, email: user.email, role: user.role }
        });
    
    }catch(error){
        let message = 'login fail: ' + error;
        console.error(message);
        return res.status(500).json({message: 'login fail'});
    }
}


