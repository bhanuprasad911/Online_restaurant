import Chef from "../models/chef.model.js";

export const getAllChefs = async (req, res) => {
  try {
    const chefs = await Chef.find();
    return res.status(200).json(chefs);
  } catch (error) {
    console.log("Error while getting chefs", error);
    return res.status(500).json({ message: error.message });
  }
};
export const addChef = async (req, res) => {
  try {
    const { name, ordersTaken } = req.body;
    const exist = await Chef.findOne({ name });
    if (exist)
      return res
        .status(400)
        .json({ message: "Chef with this name already exists" });
    const newChef = new Chef({ name, ordersTaken });
    await newChef.save();
    return res.status(201).json({ message: "Chef created successfully" });
  } catch (error) {
    console.log("error while adding chef", error);
    return res.status(500).json(error.message);
  }
};
export const updateChef = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Chef.findByIdAndUpdate(
      id,
      { ordersTaken: ordersTaken + 1 },
      { new: true }
    );
    if (!exist) return res.status(404).json({ message: "Chef not found" });
    return res.status(200).json({ message: "Chef updated successfully" });
  } catch (error) {
    console.log("error while updatingv chef", error);
    return res.status(500).json(error.message);
  }
};
