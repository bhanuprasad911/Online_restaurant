import FoodItem from "../models/Fooditems.model.js";


export const addItem = async(req,res)=>{
    try {
        const {name,price,prepTime,category, image, description} = req.body;
        const newFoodItem = new FoodItem({
            name,
            price,
            prepTime,
            category,
            image,
            description
        })
        await newFoodItem.save();
        res.status(201).json({message:"Food item added successfully"});
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({messasge:'internal server error'})
    }
}
export const getAllItems = async(req,res)=>{
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json(foodItems);
    } catch (error) {
        
        console.log(error.message);
        return res.status(500).json({messasge:'internal server error'})
    }
}