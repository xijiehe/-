const qiniu=require('qiniu');
const conf=require('../config/config')

var accessKey = conf.qiniu.AK;
var secretKey = conf.qiniu.SK;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

var options = {
    scope: conf.qiniu.bucket,
};
let Qiniu={}
/**
 * 获取上传凭证
 *
 * */
Qiniu.getToken=(req,res)=>{
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken=putPolicy.uploadToken(mac);
   res.json({token:uploadToken})
}
//删除七牛文件
Qiniu.delFile=async (req,res)=>{
    let {key}=req.params;
    await bucketManager.delete(conf.qiniu.bucket,key,(error,respBody,respInfo)=>{
        res.json({data:respBody})
    })

    // var bucket = "if-pbl";
    // var key = "qiniu_new_copy.mp4";
    //
    // bucketManager.delete(bucket, key, function(err, respBody, respInfo) {
    //     if (err) {
    //         console.log(err);
    //         //throw err;
    //     } else {
    //         console.log(respInfo.statusCode);
    //         console.log(respBody);
    //     }
    // });

}
Qiniu.delete= key=> {
    return new Promise((resolve,reject)=>{
         bucketManager.delete(conf.qiniu.bucket, key, (error, respBody, respInfo) => {
                  resolve(true)
        })
    })
}
module.exports=Qiniu
