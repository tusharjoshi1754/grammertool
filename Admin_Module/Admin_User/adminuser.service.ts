const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const mongoose = require('mongoose')
const db_admin = db.Admin_User;
const db_role = db.Admin_Role

var sha512 = require('js-sha512');

module.exports = {
    createuser,
    updateuser,
    deleteuser,
    usergetbyid,
    listuser

}
async function createuser(userparams) {
    if (userparams) {
        userparams.password = sha512(userparams.password)
        var data = await new db_admin(userparams).save();
        if (data) {
            return data
        }
        else {
            return false
        }
    }
}


async function updateuser(id, userparams) {
    if (!id) {
        return false
    }
    if (!userparams) {
        return "Data is not match in this fields"
    }
    if (userparams.role_id) {
        var data = await db_admin.findById(id)
        var roleid = data.role_id
        var role_data = await db_role.findById(roleid)
        if (role_data.role_name != 'Super-admin') {
            return "you cannot update role"
        }
        else {
            userparams.role_id = userparams.role_id
        }
    }
    var update = await db_admin.findByIdAndUpdate({
        '_id': id
    }, { $set: userparams });
    return true
}


async function deleteuser(id) {
    if (!id) {
        return false
    }

    var data = await db_admin.findById(id)
    var roleid = data.role_id
    var role_data = await db_role.findById(roleid)
    if (role_data.role_name != 'Super-admin') {
        throw "you cannot update User"
    }

    var result = await db_admin.findByIdAndDelete(id);
    if (!result) {
        return false
    }
    else {
        return true
    }
}



async function usergetbyid(id) {
    id=mongoose.Types.ObjectId(id)
    if (!id) {
        return false
    }
    var finaldata= JSON
    var data = await db_admin.findById(id)
    if (data) {
        var roleid = data.role_id
        var role_data = await db_role.findById(roleid)
        if (role_data.role_name != 'Super-admin') {
            throw "you cannot access userdata"
        }
    }
    else {
        throw "user not found"
    }

    var result = await db_admin.find({ "_id": id });
    if (result[0].status == true) {
        var role_data = await db_role.findById(result[0].role_id)
        if (role_data.role_status == false) {
            role_data = ''
        }
        else {
            role_data = role_data
        }
        result=result[0]
        finaldata['user_data']=result
        
        finaldata['role_data']=role_data
        if (!finaldata) {
            return false
        }
        else {
            return finaldata
        }

    }
    else {
        return "user not active"
    }
}

async function listuser(){
    var result=JSON
    var list = await db_admin.aggregate([
        {
            $lookup: {
                from: "tbl_roles",
                localField: "role_id",
                foreignField: "_id",
                as: "roles"
                
            }
        }
    ]);
  
   
    if(list){
       
        
        result['list']=list
        result['total_count']=JSON.parse(list.length)
       
        return result
    }
    else{
        return false
    }
}   