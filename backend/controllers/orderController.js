import Chef from "../models/chef.model.js";
import Order from "../models/order.model.js";
import Table from "../models/table.model.js";
import User from "../models/User.model.js";

export const addOrder = async (req, res) => {
  try {
    const { items, type, total, ordered_By, originalPrepTime, table_No } =
      req.body;

    const user = await User.findById(ordered_By);
    const chefs = await Chef.find();
    if (chefs.length === 0) {
      return res.status(400).json({ message: "No chefs available" });
    }

    chefs.sort((a, b) => {
      if (a.workingTime !== b.workingTime) {
        return a.workingTime - b.workingTime;
      }
      return a.ordersTaken - b.ordersTaken;
    });

    const selectedChef = chefs[0];

    const existingOrders = await Order.countDocuments();
    const number = existingOrders + 1;
    if (type === "Dine In") {
      const selectedTable = await Table.findOne({ number: table_No });
      selectedTable.status = "reserved";
      await selectedTable.save();
      if (!selectedTable) {
        return res.status(404).json({ message: "Table not found" });
      }
    }

    const newOrder = new Order({
      items,
      type,
      total,
      ordered_By,
      originalPrepTime,
      prepTime: originalPrepTime,
      table_No,
      chef: selectedChef._id,
      number,
    });
    selectedChef.ordersTaken += 1;
    selectedChef.workingTime += originalPrepTime;
    await selectedChef.save();
    user.orders.push(newOrder._id);
    await user.save();

    const savedOrder = await newOrder.save();

    res
      .status(201)
      .json({ message: "Order saved successfully", data: savedOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.item", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error("Error getting orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const updateOrderStatus = async (req, res) =>{
  try {
    const { id, status } = req.body;
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
      }
       const orders = await Order.find()
      .populate("items.item", "name")
      .sort({ createdAt: -1 });
      return res.status(200).json({ message: "Order status updated successfully", data: orders})
    
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Internal server error" });
    
  }
}
