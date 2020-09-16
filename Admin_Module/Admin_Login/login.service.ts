const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
var SHA256 = require("crypto-js/sha256");
const db_admin = db.Admin_User;
var sha512 = require('js-sha512');
var cryptoa = require('crypto');
var assert = require('assert');
const mail = require('../../_helper/email');
var handlebars = require('handlebars');
const bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
var rn = require('random-number');
const db_permission_role = db.permission_role;
const db_permisiion = db.Permission;
module.exports = {
    authenticate,
    forgetpasswordotp,
    confirm_email,
    passwordchange,
    findemail,
    checkpass
    
}

async function authenticate({ username, password ,req }) {
    
    let userdata;
    const user = await db_admin.aggregate([
        {
            $match: {
                username: username,
                status: true
            }
        },
        {
            $lookup: {
                from: "tbl_roles",
                localField: "role_id",
                foreignField: "_id",
                as: "roles"
                
            }
        }
    ]);

    if (user[0]) {
        
        let user1 = user[0]
        let rolesid =user[0].roles[0]._id.toString()
       let a=[] ;
        const encryptedString = cryptr.encrypt(rolesid)
      
        const permission_roledata= await db_permission_role.find({"role_id":rolesid})
       
        if(permission_roledata){    
                const id = permission_roledata[0].permission_id
               
                if(id){
                for(let i=0; i<id.length;i++){
                    a[i]= await db_permisiion.findById(id[i])
                  
                }
            }
        }       
        
        if (sha512(password) === user1['password']) {
            
           
            if (user1['roles'][0].role_status == true) {
                if (user1 && sha512(password)) {
                    user1= SHA256(user1);
                    
                    let token = jwt.sign({ id:encryptedString}, config.secret, { expiresIn: '1 day' });

                    userdata =user[0]
                    userdata.permission_list=a
                    return {
                        userdata,
                        token,
                       
                    };
                }
                
            }
            else {
                throw "your role is not active"
            }
        }
    }
    else {
       return false
    }
}
async function forgetpasswordotp (userparms,path){
    const user = await db_admin.find({"email":userparms.email})
    if(user){
        var gen = rn.generator({
            min:  1111111111
          , max:  9999999999
          , integer: true
          })
        
          const random=gen()
         await db_admin.findByIdAndUpdate({
            '_id': user[0].id
        }, {$set: {"forget_token":random}})

        var html="<p>this email is send for password change  '"+user[0].email+"' and <a href='"+config.front_end_url+"'/adminusers/resetpassword/"+user[0].id+"/"+random+"'> click hear</a></p>";
        let sendResult= mail.sendDynamicMail(user[0].email,"test",html);
        
        if(sendResult){
            return true;
        }else{
        return false;
        }
    }else{
        return false
    }
}


async function confirm_email(token,id){

    const varfiy = await db_admin.find({"forget_token":token})
    console.log("data",varfiy)
    if(varfiy){
        return varfiy
    }else{
        return "eror"
    }
}
async function passwordchange(id,userparms){
  
    const hash = sha512(userparms.password)
     const findupdate = await db_admin.findByIdAndUpdate({
        '_id': id
    }, {$set: {"password":hash}})
    if (findupdate) {
        return id;
    } else {
        return false;
    }
}
async function findemail(userparms){
    const email = await db_admin.findone({"email":userparms.email})
    if(email){
        return true
    }else{
        return false    
    }
}

async function checkpass(userparams){
    if(!userparams.userid){
        throw "Please Enter User ID"
    }
    if(!userparams.password){
        throw "Please Enter Password"
    }
}