import express from 'express';
import { addTable, deleteTable, getAllTables, updateTableStatus } from '../controllers/tableController.js';

const tableRouter = express.Router();
tableRouter.get('/', getAllTables);
tableRouter.post('/add', addTable);
tableRouter.post('/update', updateTableStatus);
tableRouter.delete('/delete/:serialNo', deleteTable);


export default tableRouter;