const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const permissionservice = require('./permission.service.ts')
router.post('/createpermission', createpermission);
router.delete('/deletepermission/:id',deletepermission)
router.put('/updatepermission/:id',updatepermission)
router.get('/listingpermission',listpermission)
router.get('/findbyidpermission/:id',findbyidpermission)

module.exports = router;

async function createpermission(req,res,next){
   await permissionservice.permission_create(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ status:400, message: 'Permission creation failed'}))
    .catch(err => next(err));
}
async function deletepermission(req,res,next){
    await permissionservice.permission_delete(req.params.id)
    .then(del => del ? res.send({status:200,result:del}) : res.status(400).send({ status:400, message: 'Permission delete failed'}))
    .catch(err => next(err));
}
async function updatepermission(req,res,next){
    await permissionservice.permission_update(req.params.id,req.body)
    .then(update => update ? res.send({status:200,result:update}) : res.status(400).send({ status:400, message: 'Permission update failed'}))
    .catch(err => next(err));
}
async function listpermission(req,res,next){
    await permissionservice.permission_listing()
    .then(list => list ? res.send({status:200,result:list}) : res.status(400).send({ status:400, message: 'Permission listing failed'}))
    .catch(err => next(err));
}
async function findbyidpermission(req,res,next){
    await permissionservice.permission_findbyid(req.params.id)
    .then(list => list ? res.send({status:200,result:list}) : res.status(400).send({status:400, message: 'Permission listing failed'}))
    .catch(err => next(err));
}
