import express from 'express'
import { addOrder, getAllOrders, updateOrderStatus } from '../controllers/orderController.js'


const orderRouter = express.Router()
orderRouter.post('/add', addOrder)
orderRouter.get('/', getAllOrders)
orderRouter.patch('/update', updateOrderStatus)



export default orderRouter