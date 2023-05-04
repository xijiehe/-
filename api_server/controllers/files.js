let paging=require('../utils/paging')
let mongoose=require('mongoose')
let FilesModel=require('../model/file')
const CommentModel = require("../model/comment");
let qiniu=require('../controllers/qiniu')


let Files={}
Files.add=async (req,res)=>{
    let {key,name}=req.body;
     name = name?name:key;
    if (!key){
        return res.status(400).json({error:'key为必填项'})
    }
    let queryData=await FilesModel.findOne({key})
    if (queryData){
        return res.status(400).json({'error':'当前文件已经存在'})
    }
    let result=await FilesModel.create({key,name});
    res.json({data:result})
}
Files.del=async (req,res)=>{
    let {_id} =req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }
    let result=await FilesModel.findOne({_id})
    let key =result.key;

    let res1=await qiniu.delete(key)
    if (!res1)return res.status(400).json({error:'删除失败'})
     result=await FilesModel.deleteOne({_id})

    res.json({data:result})
}
Files.update=async (req,res)=>{
    let fileInfo=req.body;
    let {_id}=req.params;
    if (!_id && !mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }
    let result=await FilesModel.findOneAndUpdate({_id},fileInfo,{new:true,fields:{password:0,__v:0}})
    res.json({data:result})
}
Files.get=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await FilesModel.findOne({_id},{__v:0,password:0})

    res.json({data:result})
}
Files.getList=async (req,res)=>{
    let {pageSize,pageNum,query=""}=req.query;
    let condition=query?{key:new RegExp(query)}:{}
    let data=await paging(FilesModel,condition,pageNum,pageSize,{__v:0,password:0},);
    res.json(data)
}
module.exports=Files