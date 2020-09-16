const express = require('express');
const router = express.Router();

const roleservice = require('./role.service.ts')

// routes
router.post('/createrole', createrole);
router.put('/updaterole',updaterole);
router.delete('/deleterole/:id',deleterole);
router.get('/getbyidrole/:id',getrole);
router.get('/role_listing',listingrole)



module.exports = router;

async function createrole(req,res,next){
    roleservice.role_create(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Role creation failed'}))
    .catch(err => next(err));
}

async function updaterole(req,res,next){
    roleservice.role_update(req.body)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Role Updation failed'}))
    .catch(err => next(err));
}

async function deleterole(req,res,next){
    roleservice.role_delete(req.param.id)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'Role Deletion failed'}))
    .catch(err => next(err));
}

async function getrole(req,res,next){
    roleservice.rolebyid(req.param.id)
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'getting role failed'}))
    .catch(err => next(err));
}
async function listingrole(req,res,next){
    roleservice.listing()
    .then(role => role ? res.send({status:200,result:role}) : res.status(400).send({ message: 'getting role failed'}))
    .catch(err => next(err));
}