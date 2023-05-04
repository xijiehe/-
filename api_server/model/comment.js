const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let commentModel=new Schema({
    userId:String,
    commentId:String,
    //userId:Schema.Types.ObjectId,
    //userId:Schema.Types.ObjectId,
    type:{
        type:Number,
        default:0   //0 代表对视频评论 1 代表对评论
    },
    content:String,
    createTime:{
        type:Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('comment',commentModel)