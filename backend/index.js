import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import dbConnection from './config/dbConnection.js';
import tableRouter from './routes/tableRoutes.js';
import chefRouter from './routes/chefRoutes.js';
import ProductRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'http://localhost:5002'],
  credentials: true
}));

// API routes
app.use('/api/table', tableRouter);
app.use('/api/chef', chefRouter);
app.use('/api/product', ProductRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

// Your API test route
app.get('/', (req, res) => {
  console.log('GET /now called');
  res.send(new Date().toString());
});


if (process.env.NODE_ENV === 'production') {
  app.use('/admin', express.static(path.join(__dirname, '../frontend/dist')));
  app.use('/user', express.static(path.join(__dirname, '../frontend-user/dist')));

  // Admin SPA fallback — serve index.html only for HTML requests
  app.get('/admin/*path', (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    } else {
      next();
    }
  });

  // User SPA fallback — serve index.html only for HTML requests
  app.get('/user/*path', (req, res, next) => {
    if (req.accepts('html')) {
      res.sendFile(path.join(__dirname, '../frontend-user/dist/index.html'));
    } else {
      next();
    }
  });
}

const startServer = async () => {
  await dbConnection();
  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
};

startServer();
