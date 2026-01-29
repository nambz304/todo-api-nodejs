import express, {type Request, type Response, type NextFunction} from 'express';
import {AppDataSource} from './config/database.js';//why dùng JS chỗ này
import todoRoutes from './routes/todoRouter.js'
import authRoutes from './routes/authRouter.js'
/*
- express dung để tạo 1 app/HTTP server: const app = express();
- Request - kiểu cho đối tượng request -> chút nữa mình sẽ khai báo biến req: Request -> lấy req.body hoặc req.param
- tương tự cho Response: res: Response -> res.send() hoặc res.json() để trả kết quả cho client
    + res.send() để gửi mã HTML hoặc Object đồ luôn
    + res.json() -> truyền vào 1 array/object nó sẽ tự parce ra JSON và gửi về cho client
    + NextFunction định nghĩa hàm next() - hàm next(). Hàm này cực kỳ quan trọng trong Middleware, 
    giúp chuyển giao quyền điều khiển từ hàm hiện tại sang hàm tiếp theo trong chu kỳ request-response
*/

// import json from 'body-parser';//giờ đã dùng express.json()) tích hợp trong express luôn rồi ko dùng body-parser nữa
/*
- module để tự động parse body của req thành object trong TS
app.use(json()); -> khai báo middleware
sau đó const a = req.body nó tự parse ra object - nếu ko dùng middleware này thì nó chỉ là string dạng JSON mà thôi
*/

// interface User {
//   id: number;
//   username: string;
//   email: string;
// }

//init express app
const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());


//các routes - to check
app.use('/todo', todoRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});


//init DB and server
AppDataSource.initialize()
.then(() => {app.listen(PORT,() => console.log("Server is running on PORT: " + PORT));})
.catch((err: any) => {
    console.log("Database init error", err);
    process.exit(1);
});



