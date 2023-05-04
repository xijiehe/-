const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let userModel=new Schema({
    account:String,
    password:String,
    nickname:String,
    headImg:String,
    sex:{
        type:Number,
        default:0
    },
    des:String,
    createTime:{
        type:Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('user',userModel)