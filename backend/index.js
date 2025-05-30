import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import cors from 'cors';
import dbConnection from './config/dbConnection.js';
import tableRouter from './routes/tableRoutes.js';
import chefRouter from './routes/chefRoutes.js'
import ProductRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';





const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true
}))


app.use('/api/table', tableRouter);
app.use('/api/chef', chefRouter);
app.use('/api/product', ProductRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

const startServer = async () => {
  await dbConnection(); 
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
startServer();