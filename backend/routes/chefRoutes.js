import express from 'express';
import { addChef, getAllChefs, updateChef } from '../controllers/cherfController.js';
const chefRouter = express.Router();

chefRouter.get('/', getAllChefs)
chefRouter.post('/add', addChef)
chefRouter.put('/update/:id', updateChef)



export default chefRouter;
