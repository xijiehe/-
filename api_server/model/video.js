const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let videoModel=new Schema({
    key:String,
    title:String,
    des:String,
    avatar:String,
    author:String,
    tag:Array,
    createTime:{
        type:Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('video',videoModel)