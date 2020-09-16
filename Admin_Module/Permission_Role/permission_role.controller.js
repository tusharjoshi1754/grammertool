const express = require('express');
const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const router = express.Router();

const permission_roleservice = require('./permission_role.service.ts')
router.post('/createpermissionrole', createpermission);
router.put('/updatepermissionrole/:id',updatepermission)
router.delete('/deletepermissionrole/:id',deletepermission)
router.get('/findbyidpermissionrole/:id',findbyidpermission)
module.exports = router;

async function createpermission(req,res,next){
 
   await permission_roleservice.permission_rolecreate(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission creation failed'}))
    .catch(err => next(err));
}
async function updatepermission(req,res,next){
    await permission_roleservice.permission_update(req.params.id,req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission updatetion failed'}))
    .catch(err => next(err));
}
async function deletepermission(req,res,next){
    await permission_roleservice.permission_delete(req.params.id)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission can not delete'}))
    .catch(err => next(err));
}
async function findbyidpermission(req,res,next){
    await permission_roleservice.permission_findbyid(req.params.id)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Permission can not find'}))
    .catch(err => next(err));
}