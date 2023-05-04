let paging=require('../utils/paging')
let mongoose=require('mongoose')
let videoModel=require('../model/video')


let video={}
video.add=async (req,res)=>{
    let {videoInfo}=req.body;
    console.log(req.body)
    let {key,title}=videoInfo
    if (!key){
        return res.status(400).json({error:'key为必填项'})
    }
    if (!title){
        return res.status(400).json({error:'标题为必填项'})
    }
    let queryData=await videoModel.findOne({key})
    if (queryData){
        return res.status(400).json({'error':'当前文件已经存在'})
    }
    let result=await videoModel.create(videoInfo);
    res.send('ok')
}
video.del=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await videoModel.deleteOne({_id})

    res.json({data:result})
}
video.update=async (req,res)=>{

    let videoInfo=req.body;
    let _id=req.params;
    if (!_id && !mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }
    let result=await videoModel.findOneAndUpdate({_id}, videoInfo,{new:true,fields:{password:0,__v:0}})
    res.json({data:result})
}
video.get=async (req,res)=>{
    let {_id} =req.params;
    console.log(req)
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await videoModel.findOne({_id},{__v:0,password:0})

    res.json({data:result})
}
video.getList=async (req,res)=>{
    let {pageSize,pageNum,query=""}=req.query;
    let condition=query?{title:new RegExp(query)}:{}
    let data=await paging(videoModel,condition,pageNum,pageSize,{__v:0,password:0});
    res.json(data)
}
module.exports=video