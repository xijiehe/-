const getTotalNum=async (model,condition)=>{
    return await model.countDocuments(condition);
}

const paging = async (model,condition,noShow={},pageNum,pageSize,sortCondition)=>{
    let countNum=(pageNum-1)*pageSize;
    return await model.find(condition,noShow).sort(sortCondition).limit(pageSize).skip(countNum);
}

const getPagingData=async (model,condition,pageNum,pageSize,noShow={__v:0},sortCondition={_id:0})=>{
    let totalNum=await getTotalNum(model,condition)
    let pagingData=await paging(model,condition,noShow,pageNum,pageSize,sortCondition)
    return{
        pageNum,
        pageSize,
        count:totalNum,
        result:pagingData
    }
}
module.exports=getPagingData