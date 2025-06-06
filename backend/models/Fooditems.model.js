import mongoose from 'mongoose';

const FoodItemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    prepTime:{
        type:Number,
        required:true
    }
})
const FoodItem = mongoose.model('FoodItem',FoodItemSchema);
export default FoodItem