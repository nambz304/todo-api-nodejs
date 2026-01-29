//import typeorm
import {type Request, type Response} from 'express';
import { AppDataSource } from "../config/database.js"; // Your initialized DataSource instance
// import { Todo } from "../entities/todo.js"; // Your User entity
import { Todo } from "../entities/todo.js";

async function getAllTodo(req: Request, res: Response){
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

function getTodoById(req:Request, res: Response){

}

async function createTodo(req:Request, res: Response){
    //lấy thông tin todo từ body
    //create nó trong DB
    //trả về todo đã create hoặc lỗi
    // const newTodo = req.body;

    console.log("------------createTodo");
    const todoRepo = AppDataSource.getRepository(Todo);//loixo dong nay
    let newTodo = req.body;
    console.log(newTodo);
    try{
       let resp =  await todoRepo.save(newTodo);
        console.log("------------resp", resp);

        res.json(newTodo);
    }catch(error){
        console.error("Fail to create new todo: ", error);
        res.send("Fail to create new todo");
    }

}

export {getAllTodo, getTodoById, createTodo}
