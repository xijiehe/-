const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let tagModel=new Schema({
    name:String,
    useCount:Number
})

module.exports=mongoose.model('tag',tagModel)