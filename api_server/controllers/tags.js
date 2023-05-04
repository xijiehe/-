let Tags={}
let TagModel=require('../model/tag')
let mongoose=require('mongoose')
let paging=require("../utils/paging")
//async 缺点：无法捕捉Promise里的错误
//下载包来捕捉  npm i express-async-errors --save  app.js 中引用 即可捕捉Promise中的错误而不至于使后台崩溃
Tags.addTag=async (req,res)=>{
 let {name}=req.body;
 if (!name){
     return res.status(400).json({"error":"name为必填参数"})
 }
 let queryData=await TagModel.findOne({name});
 if(queryData){
     return res.status(400).json({"error":"标签已存在"});
 }

 let result =await TagModel.create({name});
 res.send('ok')

 // TagModel.findOne({name})
 //     .then(result=>{
 //         if (result){
 //             res.status(400).json({"error":"标签已存在"})
 //             return Promise.reject({type:1})
 //         }
 //     })
 //     .then(result=>{
 //         TagModel.create({name})
 //     })
 // .then(result=>{
 //     res.send('添加标签成功')
 // }).catch(err=>{
 //     if (err.type==1){
 //
 //     }else {
 //         res.status(400).json({"error":"添加标签失败"})
 //     }
 // })
}


Tags.delTag=async (req,res)=>{
    let {_id} =req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await TagModel.deleteOne({_id})
    if(result){
        res.json({
            data:result
        })
    }
}

Tags.getTag=async (req,res)=>{
   let {_id} =req.params;

   if (!mongoose.Types.ObjectId.isValid(_id)){
       return res.status(400).json({error:'错误的ID'})
   }

   let result=await TagModel.findOne({_id},{__v:0})
   if(result){
       res.json({
           data:result
       })
   }
}

//{?query,pageSize,pageNum}
// let data={
//     status:'ok',
//     pageSize,
//     pageNum,
//     count,
//     data:{}
// }
Tags.getTagList=async (req,res)=>{
    let {pageSize,pageNum,query=""}=req.query;
    let condition=query?{name:new RegExp(query)}:{}
    let data=await paging(TagModel,condition,pageNum,pageSize,{__v:0,password:0});
    res.json(data)
}
module.exports= Tags