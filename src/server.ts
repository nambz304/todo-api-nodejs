import express, {type Request, type Response, type NextFunction} from 'express';
import {AppDataSource} from './config/database.js';
import todoRoutes from './routes/todoRouter.js'
import authRoutes from './routes/authRouter.js'

//init express app
const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.json());

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



