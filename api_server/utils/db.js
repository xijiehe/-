const mongoose=require('mongoose');
const debug=require('debug')('api-server:db');

let DB_URL='mongodb://127.0.0.1/videoLite';
// mongoose.connect(DB_URL,{userNewUrlParser:true,useUnifiedTopology:true, useFindAndModify:false});

// mongoose.Promise=global.Promise;
mongoose.connect(DB_URL);

const db=mongoose.connection;
db.on('connected',()=>{
    debug('连接成功')
})
db.on('error',err=>{
    debug(`连接失败:${err}`)
})

db.on('disconnection',()=>{
    debug('断开连接')})