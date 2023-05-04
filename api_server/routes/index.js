var express = require('express');
var router = express.Router();
let User=require('../controllers/user')
let Tags=require('../controllers/tags')
let Comments=require('../controllers/comments')
let Qiniu=require('../controllers/qiniu')
let Files=require('../controllers/files')
let video=require('../controllers/video')
router
    //用户相关接口
    .post('/register',User.add)
    .post('/login',User.login)
    .delete('/users/:_id',User.del)
    .get('/users/:_id',User.get)
    .get('/users',User.getList)
    .put('/users/:_id',User.update)


    //标签
router
    .post('/tags',Tags.addTag)
    .delete('/tags/:_id',Tags.delTag)
    .get('/tags/:_id',Tags.getTag)
    .get('/tags',Tags.getTagList)

   //评论
router
    .post('/comments',Comments.add)
    .delete('/comments/:_id',Comments.del)
    .put('/comments/:_id',Comments.update)
    .get('/comments/:_id',Comments.get)
    .get('/comments',Comments.getList)

    //七牛云
router
    .get('/qiniu',Qiniu.getToken) //获取上传凭证
    .delete('/qiniu/:key',Qiniu.delFile)

   //七牛云文件相关
router
    .post('/files',Files.add)
    .delete('/files/:_id',Files.del)
    .put('/files/:_id',Files.update)
    .get('/files/:_id',Files.get)
    .get('/files',Files.getList)

    //视频相关
router
    .post('/video',video.add)
    .delete('/video/:_id',video.del)
    .put('/video/:_id',video.update)
    .get('/video/:_id',video.get)
    .get('/video',video.getList)
module.exports = router;
