// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init() // 使用当前云环境
const db = cloud.database();
const $ = db.command.aggregate
// 云函数入口函数
// const _ =db.command;
async function selectAddress(event) {
    let list = await db.collection("noMargin").where({
        "address": event.text
    }).get()
    return list
}
async function selectCategory(event) {
    let Categorylist = await db.collection("noMargin").where({
        "category": event.text
    }).get()
    return Categorylist
}
async function selectTitle(event) {
    let titleList = await db.collection("noMargin").where({
        "title": db.RegExp({
            regexp: '.*' + event.keyword + '.*',
            options: 'i', //表示不区分大小写
        }),
    }).get()
    return titleList

}
async function getAddress() {
    let allAddress = await db.collection('noMargin')
        .aggregate()
        .group({
            //不指定id字段是为了下面分组查找
            _id: null,
            //categories是设置的字段，addToSet是添加字段，$name是获取数据库中的name字段数据
            categories: $.addToSet('$address')
        })
        .end()
        return allAddress
}
async function getCategory() {
    let allCategory = await db.collection('noMargin')
        .aggregate()
        .group({
            //不指定id字段是为了下面分组查找
            _id: null,
            //categories是设置的字段，addToSet是添加字段，$name是获取数据库中的name字段数据
            categories: $.addToSet('$category')
        })
        .end()
        return allCategory
}
exports.main = async (event, context) => {
    let list = []
    let Categorylist = []
    let titleList = []
    let allAdress=[]
    let allCategory=[]
    if (event.text) {
        list = await selectAddress(event)
        Categorylist = await selectCategory(event)
    }
    if (event.keyword) {
        titleList = await selectTitle(event)
    }
    allAdress=await getAddress()
    allCategory=await getCategory()

    return {
        list: list,
        Categorylist: Categorylist,
        titleList: titleList,
        allAdress:allAdress,
        allCategory:allCategory
    }

}