const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const loginService = require('./login.service.ts');

const app = express();

router.post('/authenticate', authenticate);
router.post('/forgotpasswordenteremail', otp);
router.put('/forgotpassword/:id',forgotpassword)
router.post('/resetpasswordlink/:admin_id/:otp',restpassword)
router.post('/findemail',find_email);
router.post('/checkpassword',check_password)
module.exports = router;
//login authenticate function
function authenticate(req, res, next) {
         loginService.authenticate(req.body,req)
        .then(user => user ? res.send({status:true,result:user}) : res.status(400).send({status:false ,message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}
// forget password controller function 
function otp(req,res,next){
        var path =req.headers.host
        loginService.forgetpasswordotp(req.body,path)
            .then(user => user ? res.send(user)   : res.status(400).send({message: 'Email Id is not found in our database'}))
            .catch(err => next(err));
}   
async function restpassword(req,res,next){
        var token=req.params.otp;
        var adm_id=req.params.admin_id;
     
       var data=await loginService.confirm_email(token,adm_id)
       var path =req.headers.host
       if(data){  
        res.redirect(""+config.front_end_url+"/adminusers/forgotpassword/"+adm_id);
       }
       else{
           res.redirect(""+config.front_end_url+"/adminusers/authenticate?message="+data)
       }
}

async function forgotpassword(req,res,next){

        loginService.passwordchange(req.params.id,req.body)
        .then(user => user ? res.send({status:true,user}) : res.status(400).send({status:false ,message: 'error' }))
        .catch(err => next(err));
}
async function find_email(req,res,next){
        await permissionservice.findemail(req.body)
        .then(list => list ? res.send({status:200,result:list}) : res.status(400).send({status:400, message: 'Email is not valid!...'}))
        .catch(err => next(err));
    }

    async function check_password(req,res,next){
        await permissionservice.checkpass(req.body)
        .then(check => check ? res.send({status:200,result:check}) : res.status(400).send({status:400, message: 'Email is not valid!...'}))
        .catch(err => next(err)); 
    }