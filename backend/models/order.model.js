import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  items: [
  {
    item: {
      type: mongoose.Types.ObjectId,
      ref: "FoodItem",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }
],
  type: {
    type: String,
    enum: ["Dine In", "Take Away"],
  },
  total: {
    type: Number,
    required: true,
  },
  ordered_By: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  originalPrepTime: {
    type: Number,
    required: true,
  },
  prepTime: {
    type: Number,
    required: true,
  },
  table_No: {
    type: Number,
    required: true,
  },
  chef: {
    type: mongoose.Types.ObjectId,
    ref: "Chef",
  },
  status: {
    type: String,
    enum: ["Done", "Ongoing", "Picked up", "Not picked up"],
    default:"Ongoing"
  },
}, {
  timestamps: true,
});
const Order = mongoose.model("Order", orderSchema);
export default Order