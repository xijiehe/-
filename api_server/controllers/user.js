let UserModel=require('../model/user')
let paging=require('../utils/paging')
let mongoose=require('mongoose')
let crypto=require('crypto')
const TagModel = require("../model/tag"); //加密模块
let createToken=require('../utils/createToken')


let User={}

let md5=pwd=>{
   return  crypto.createHash('md5').update(pwd).digest('hex');
}
User.add=async (req,res)=>{
 let {account,password,sex,nickname}=req.body;
 if (!account && !password){
     return res.status(400).json({error:'账号和密码必填'})
 }
 let user=await UserModel.findOne({account});
 if (user){
     return res.status(400).json({error:'账号已被使用'})
 }
 let newUser=await UserModel.create({account,password:md5(password),sex,nickname})
    res.json({msg:"插入成功"})
}

User.login=async (req,res)=>{
    let {account,password}=req.body;
    if (!account && !password) {
        return res.status(400).json({error: '账号和密码必填'})
    }

    let result=await UserModel.findOne({account,password:md5(password)},{password:0,__v:0});

    if (!result){
        return res.status(400).json({error:'用户不存在'})
    }

    let Token=createToken(result,'1d');
    res.json({token:Token})
}
User.del=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await UserModel.deleteOne({_id})

    res.json({data:result})
}
User.update=async (req,res)=>{
let userInfo=req.body;
let {_id}=req.params;

if (!_id && !mongoose.Types.ObjectId.isValid(_id)){
    return res.status(400).json({error:'错误的ID'})
}
userInfo.password && (userInfo.password=md5(userInfo.password))
let result=await UserModel.findOneAndUpdate({_id},userInfo,{new:true,fields:{password:0,__v:0}})
    res.json({data:result})
}
User.get=async (req,res)=>{
    let {_id} =req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({error:'错误的ID'})
    }

    let result=await UserModel.findOne({_id},{__v:0,password:0})

        res.json({data:result})


}
User.getList=async (req,res)=>{
    let {pageSize,pageNum,query=""}=req.query;
    let reg=new RegExp(query)
    let condition=query?{$or:[{account: reg},{nickname:reg}]}:{}
    let data=await paging(UserModel,condition,pageNum,pageSize,{__v:0,password:0});
    res.json(data)
}

module.exports=User;