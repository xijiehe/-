let CommentModel=require("../model/comment")
let mongoose=require('mongoose')
let paging =require("../utils/paging")
let Comments={}

Comments.add=async (req,res)=>{
    let {userId,commentId,content,type=0}=req.body;
    if (!userId && !commentId && !content.trim()){
        return res.status(400).json({error:'参数未填完'})
    }

    // if (!mongoose.Types.ObjectId.isValid(userId)){
    //     return res.status(400).json({error:"错误的 userId"})
    // }
    // if (!mongoose.Types.ObjectId.isValid(commentId)){
    //     return res.status(400).json({error:"错误的 commentId"})
    // }


    let queryData=await CommentModel.findOne({userId,commentId,content,type})
    if (queryData){
        return res.status(400).json({'error':'不能发送内容相同的评论'})
    }
    let result=await CommentModel.create({userId,commentId,content,type})
}


Comments.del=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await CommentModel.deleteOne({_id})

    res.json({data:result})
}
Comments.update=async (req,res)=>{
    let commentInfo=req.body;
    let {_id}=req.params;
    if (!_id && !mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }
    let result=await CommentModel.findOneAndUpdate({_id},commentInfo,{new:true,fields:{password:0,__v:0}})
    res.json({data:result})
}
Comments.get=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await CommentModel.findOne({_id},{__v:0,password:0})

    res.json({data:result})


}
Comments.getList=async (req,res)=>{
    let {pageSize,pageNum,query=""}=req.query;
    let condition=query?{userId:new RegExp(query)}:{}
    let data=await paging(CommentModel,condition,pageNum,pageSize,{__v:0,password:0});
    res.json(data)
}

module.exports=Comments