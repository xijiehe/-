const  mongoose=require('mongoose');
const Schema=mongoose.Schema;

let fileModel=new Schema({
    key:String,
    name:String,
    isUse:{
        type:Boolean,
        default: false
    },
    createTime:{
        type:Date,
        default: Date.now()
    }
})

module.exports=mongoose.model('file',fileModel)