

const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
var mongoose = require('mongoose');

const db_permisiion = db.Permission;

const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

module.exports = {
    permission_create,
    permission_delete,
    permission_update,
    permission_listing,
    permission_findbyid
}

async function permission_create(userparams){

    let data = await new db.Permission(userparams).save();

    if (data) {
        return data
    }
    else {
        return "failed to add"
    }

}
async function permission_delete(id){
    let del = await  db_permisiion.findByIdAndDelete(id)
    if(del){
        return del.id
    }else{
        return false
    }
}
async function permission_update(id,userparams){
    const result=await  db_permisiion.findByIdAndUpdate({
        '_id': id
    }, {$set:{"permission_controller":userparams.permission_controller} });
    if(result){
        return result.id
    }else{
        return false
    }
}
async function permission_listing(){
    const list = await db_permission.find()
    if(list){
        return list
    }else{
        return false
    }
}
async function permission_findbyid(id){
    id=mongoose.Types.ObjectId(id)
    const findid = await db_permisiion.findById(id)
    if(findid){
        return findid
    }else{
        return false
    }
}