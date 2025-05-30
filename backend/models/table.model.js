import mongoose from 'mongoose'

const tableModel = new mongoose.Schema({
    number:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true

    }
}, {
    timestamps:true
})
const Table = mongoose.model('Table', tableModel)
export default Table;