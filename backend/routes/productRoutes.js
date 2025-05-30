import express from 'express'
import { addItem, getAllItems } from '../controllers/productControllers.js'
const ProductRouter = express.Router()

ProductRouter.post('/add', addItem)
ProductRouter.get('/', getAllItems)



export default ProductRouter

