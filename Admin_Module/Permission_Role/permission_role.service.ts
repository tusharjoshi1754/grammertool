const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const db_permission_role = db.permission_role;
const db_permisiion = db.Permission;

module.exports = {
    permission_rolecreate,
    permission_update,
    permission_delete,
    permission_findbyid

}

async function permission_rolecreate(userparams) {


    let data = await new db_permission_role(userparams).save();
    if (data) {
        return data
    }
    else {
        return "failed to add"
    }

}
async function permission_update(id, userParam) {
    const find_perimision_id = await db_permisiion.find({ "_id": userParam.permission_id })
    console.log(find_perimision_id)
    if (find_perimision_id != "") {
        const update = await db_permission_role.findByIdAndUpdate({
            '_id': id
        }, { $set: userParam })
        if (update) {
            return id;
        } else {
            return false;
        }
    } else {
        throw "permission id in not valid!..."
    }

}
async function permission_delete(id) {
    const delete_role = await db_permission_role.findByIdAndDelete(id)
    if (delete_role) {
        return delete_role.id
    } else {
        return false
    }
}
async function permission_findbyid(id) {

    let permission_role = await db_permission_role.find({"_id":id})
    var permission_id = permission_role[0].permission_id
    
    var permission = []
    for (let i = 0; i < permission_id.length; i++) {
        permission[i] = await db_permisiion.findById(permission_id[i])

    }
  
    if (permission_role) {
        return { permission_role,permission}
    } else {
        return false
    }
}