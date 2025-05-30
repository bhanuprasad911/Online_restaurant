import User from "../models/User.model.js";

export const addUser = async (req, res) => {
  try {
    const { name, number, address } = req.body;
    console.log(req.body);
    const exist = await User.findOne({ number });
    if (exist) {
      exist.name = name;
      exist.address = address;
      await exist.save();
      return res.status(200).json(exist);
    }
    const newUser = new User({ name, number, address });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log("error while adding user", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res
      .status(200)
      .json({ message: "All users fetched successfully", data: users });
  } catch (error) {
    console.log("error while getting all users", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
