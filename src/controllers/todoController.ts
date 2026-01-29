import {type Request, type Response} from 'express';
import { AppDataSource } from "../config/database.js"; // Your initialized DataSource instance
import { Todo } from "../entities/todo.js";




export async function getAllTodo(req: Request, res: Response){
        console.log("======11")

    const todoRepo = AppDataSource.getRepository(Todo);
        console.log("======22")

    try{
        const allUsers = await todoRepo.find();
        console.log("======allUsers", allUsers)
        res.json(allUsers);
    }catch(error){
        console.error("Fail to get all todo ", error);
        res.json(error);
    }
}

export async function getTodoById(req:Request, res: Response){
    try{
        const {id} = req.params;
        const user = (req.user as any);

        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const userRepo = AppDataSource.getRepository(Todo);
        const result = await userRepo.findOne({
            where: {id: parseInt(id)}
        });
        if(!result) {//neu ko tim thay id
            return res.status(404).json({message: 'Id not found'});
        }

        //check phai admin or user là chủ của task ko
        if((user.role !== 'admin') && (user.id !== result.userId)) {
            return res.status(403).json({message: 'Access denied'});
        }

        return res.status(200).json(result);
    }catch(error){
        console.error("Fail to get todo ", error);
        return res.status(500).send("Fail to get todo");
    }
}

export async function createTodo(req:Request, res: Response){
    //lấy thông tin todo từ body
    //create nó trong DB
    //trả về todo đã create hoặc lỗi
    // const newTodo = req.body;

    console.log("------------createTodo");
    const todoRepo = AppDataSource.getRepository(Todo);//loi dong nay
    let newTodo = req.body;
    newTodo.userId = (req.user as any).id;
    console.log(newTodo);
    try{
       let resp =  await todoRepo.save(newTodo);
        console.log("------------resp", resp);

        res.status(200).json(newTodo);
    }catch(error){
        console.error("Fail to create new todo: ", error);
        res.status(500).send("Fail to create new todo");
    }

}


export async function updateTodo(req:Request, res: Response){
    try{
        console.log('----------Update todo');
        const todo = req.body;
        const user = req.user as any;
        
        const userRepo = AppDataSource.getRepository(Todo);
        const result = await userRepo.findOne({
            where: {id: parseInt(todo.id)}
        });
        if(!result) {//neu ko tim thay id
            return res.status(404).json({message: 'Id not found'});
        }

        //check phai admin or user là chủ của task ko
        if((user.role !== 'admin') && (user.id !== result.userId)) {
            return res.status(403).json({message: 'Do not have permition to update this task'});
        }
        
        const updateResult = await userRepo.update({id: todo.id},todo);
        if(updateResult.affected === 0){
            return res.status(500).json({message: 'Nothing to update'});
        }
        const updateTodo = await userRepo.findOne({where: {id: todo.id}});
        if(!updateTodo) {
            return res.status(500).json({message: 'Update fail'});
        }
        
        return res.status(200).json({message: 'Updated', todo: updateTodo});
    }catch(error){
        console.error("Fail to update new todo: ", error);
        return res.status(500).send("Fail to create new todo");
    }

}


export async function deleteTodo(req:Request, res: Response){
    try{
        const {id} = req.params;
        const userRepo = AppDataSource.getRepository(Todo);
        const user = req.user as any;

        if (typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const result = await userRepo.findOne({
            where: {id: parseInt(id)}
        });
        if(!result) {//neu ko tim thay id
            return res.status(404).json({message: 'Id not found'});
        }

        //check phai admin or user là chủ của task ko
        if((user.role !== 'admin') && (user.id !== result.userId)) {
            return res.status(403).json({message: 'Do not have permition to delete this task'});
        }

        const deleteTodo = await userRepo.delete({id: parseInt(id)});
        if(deleteTodo.affected === 0) {
            return res.status(500).json({message: 'Nothing to delete'});
        }

        return res.status(200).json({message: 'Deleted', id: id});
    }catch(error){
        console.error("Fail to delete todo ", error);
        return res.status(500).send("Fail to delete new todo");
    }

}



