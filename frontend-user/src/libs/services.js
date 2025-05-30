import axiosInstance from "./axios";

export const getAllItems = async()=>{
  const res = await axiosInstance.get('/product/')
  return res
}
export const addUser = async(data)=>{
  const res = await axiosInstance.post('/user/add',data)
  return res
}

export const getTablels = async()=>{
  const res = await axiosInstance.get('/table/')
  return res
}
export const addOrder = async(data)=>{
  const res = await axiosInstance.post('/order/add',data)
  return res
}