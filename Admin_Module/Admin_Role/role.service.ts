const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const role = db.Admin_Role;
var mongoose = require('mongoose');
module.exports = {
    role_create,
    role_update,
    role_delete,
    rolebyid,
    listing
}


async function role_create(userparms) {
    
    try {
        let data = await new role(userparms).save();
        return data
    }
    catch (e) {
        throw "Role name must be unique"
    }

}
async function role_update(userparms) {

    let data = await role.findById(userparms.role_id)
    try {
        let unique =await role.find({ 'role_name': userparms.role_name })
        
        if (unique.length == 1) {
            
            let roleid = data._id
            let update = await role.findByIdAndUpdate({ '_id': roleid }, { 'role_name': userparms.role_name, 'role_status': userparms.status })
            if (update) {
                return "Update Role sucess"
            }
            else {
                throw "Role Update Failed"
            }

        }


    }
    catch (e) {
        throw "Role Name must be Unique"
    }


}
async function role_delete(id){
    try{
        await role.findByIdAndRemove(id);
       return "Delete sucess" 

    }
    catch(e)
    {
        return "Failed to Delete role"
    }
}


async function rolebyid(id){
    id=mongoose.Types.ObjectId(id)
    try{
        let data = await role.findById(id)
        if(data){
            return data
        }
        else{
            throw Error
        }
    }
    catch(e){
        throw Error
    }
}
async function listing(){
    const list = await role.find()
    if(list){
        return  list
    }else{
        return false
    }
}