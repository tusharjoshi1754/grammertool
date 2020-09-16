const express = require('express');
const router = express.Router();
const config = require('../../config.json');
const mongoose = require('mongoose')
const userservice = require('./adminuser.service.ts');

router.post('/createadmin_user', usercreate);
router.put('/updateadmin_user/:id',userupdate);
router.delete('/deleteadmin_user/:id',userdelete);
router.get('/getuserbyid/:id',getuser);
router.get('/getuserlisting',userlisting)


module.exports = router;

async function usercreate(req, res, next) {
    await userservice.createuser(req.body)
        .then(create => create ? res.send({status:200,result:create}) : res.status(400).send({ message: 'Something went to wrong' }))
        .catch(err => next(err));
}

async function userupdate(req, res, next) {
    await userservice.updateuser(req.params.id,req.body,req)
        .then(update => update ? res.send({status:200,result:update}) : res.status(400).send({ message: 'Update Failed ' }))
        .catch(err => next(err));
}

async function userdelete(req,res,next)
{
    await userservice.deleteuser(req.params.id)
    .then(user => user ? res.send({status:200,result:user}) : res.status(400).send({ message: 'Delete Failed' }))
    .catch(err => next(err));
}


async function getuser(req,res,next){
    await userservice.usergetbyid(req.params.id)
    .then(user => user ? res.send({status:200,result:user}) : res.status(400).send({ message: 'Delete Failed' }))
    .catch(err => next(err));
}


async function userlisting(req,res,next){
    await userservice.listuser()
    .then(list => list ? res.send({status:200,result:list}) : res.status(400).send({ message: 'Get Listing Failed' }))
    .catch(err => next(err));
}