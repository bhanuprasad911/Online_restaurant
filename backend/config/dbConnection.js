import mongoose from 'mongoose'
import { updateOrderTimePrep } from '../cronJobs/updateOrderPrepTime.js'


const dbConnection = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL)
        if(connection){
            updateOrderTimePrep()

            console.log('Db connection successful')
        }
    }catch(error){
        console.log(error)
    }
}
export default dbConnection