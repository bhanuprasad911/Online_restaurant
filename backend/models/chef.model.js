import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    ordersTaken:{
        type:Number,
        default:0
    },
    workingTime:{
        type:Number,
        default:0
    }
}, {timestamps:true});
const Chef = mongoose.model('Chef', chefSchema);
export default Chef