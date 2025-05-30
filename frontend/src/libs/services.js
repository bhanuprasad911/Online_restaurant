import axiosInstance from "./axios.js";

export const getAllTables=async()=>{
    const response=await axiosInstance.get("/table");
    return response;
}
export const deleteTable = async(serialNo)=>{
    const response = await axiosInstance.delete(`/table/delete/${serialNo}`);
    return response;
}
export const addTable = async(formData)=>{
    const response = await axiosInstance.post("/table/add",formData);
    return response;
}
export const getUsers = async()=>{
    const response = await axiosInstance.get("/user");
    return response;
}
export const getOrders = async()=>{
    const response = await axiosInstance.get("/order");
    return response;
}
export const getChefs = async()=>{
    const response = await axiosInstance.get("/chef");
    return response;
}
export const updateOrderStatus = async(body)=>{
    const response = await axiosInstance.patch("/order/update",body);
    return response;
}