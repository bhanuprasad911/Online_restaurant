import Table from "../models/table.model.js";

export const addTable = async (req, res) => {
  try {
    const { number, capacity, status } = req.body;
    if (!number || !capacity || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newTable = new Table({ number, capacity, status });
    await newTable.save();
    const tabledata = await Table.find().sort({ number: 1 });
    res
      .status(201)
      .json({ message: "Table added successfully", data: tabledata });
  } catch (error) {
    console.log("error adding table", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const getAllTables = async (req, res) => {
  try {
    const tabledata = await Table.find().sort({ number: 1 });
    res.status(200).json({ message: "All tables", data: tabledata });
  } catch (error) {
    console.log("error getting all tables", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const updateTableStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const current = await Table.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!current) {
      return res.status(404).json({ message: "Table not found" });
    }
    const updated = await Table.find().sort({ number: 1 });
    res.status(200).json({ message: "Table status updated", data: updated });
  } catch (error) {
    console.log("Error updating table status", error.message);
    return res.status(500).json({ message: error.message });
  }
};
export const deleteTable = async (req, res) => {
  try {
    const serialNo = parseInt(req.params.serialNo);
    console.log(serialNo)
    if (!serialNo) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const current = await Table.deleteOne({number:serialNo});
    await Table.updateMany(
    { number: { $gt: serialNo } },
    { $inc: { number: -1 } }
  );
    const updated = await Table.find().sort({ number: 1 });
    res.status(200).json({ message: "Table deleted", data: updated });
  } catch (error) {
    console.log("Error deleting table", error.message);
    return res.status(500).json({ message: error.message });
  }
};
