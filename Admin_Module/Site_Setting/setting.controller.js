const express = require('express');
const router = express.Router();
const multer = require('multer')
const siteService = require('./setting.service.ts')
const replaceString = require('replace-string');

const fs = require('fs')
const {
    promisify
} = require('util')

const unlinkAsync = promisify(fs.unlink)
let data
// Multer middleware for fileuploading
var Storage = multer.diskStorage({
    destination: function (req, file, callback, next) {

        callback(null, 'public/site_setting');

    },

    filename: function (req, file, callback) {


        const set = Date.now() + "_" + file.originalname
        callback(null, set)

    }
});
var cpUpload = multer({
    storage: Storage
}).fields([{
    name: 'site_logo',
    maxCount: 1
}, {
    name: 'site_favicon',
    maxCount: 1
}])

// routes
router.post('/add_site_setting', cpUpload, addsite);
router.put('/update_site_setting/:id', cpUpload, updatesite);
router.get('/site_findbyid/:id', site_listing)
router.get('/delete_site_setting/:id',site_delete)
router.get('/demo',demo_api)
// router.post('/demo',demo_api)
module.exports = router;

async function addsite(req, res, next) {

    if (req.files['site_logo'] == null || req.files['site_logo'] == undefined || req.files['site_favicon'] == null || req.files['site_favicon'] == undefined) {
        if (req.files['site_logo'] == null || req.files['site_logo'] == undefined) {
            req.body.site_logo = null
        } else {
            req.body.site_logo = replaceString(req.files['site_logo'][0].path, 'public', '')
            req.body.site_favicon = null
        }
        if (req.files['site_favicon'] == null || req.files['site_favicon'] == undefined) {
            req.body.site_favicon = null
        } else {
            req.body.site_favicon = replaceString(req.files['site_favicon'][0].path, 'public', '')
            req.body.site_logo = null
        }

        await siteService.addsite(req.body)
            .then(add => add ? res.json({
                status: 200,
                result: add
            }) : res.status(400).json({
                message: 'not Added site setting'
            }))
            .catch(err => next(err))
    } else if (req.files['site_favicon'][0].mimetype === "image/png" || req.files['site_favicon'][0].mimetype === "image/jpe" || req.files['site_favicon'][0].mimetype === "image/jpeg" || req.files['site_logo'][0].mimetype === "image/png" || req.files['site_logo'][0].mimetype === "image/jpe" || req.files['site_logo'][0].mimetype === "image/jpeg") {
        req.body.site_favicon = replaceString(req.files['site_favicon'][0].path, 'public', '')
        req.body.site_logo = replaceString(req.files['site_logo'][0].path, 'public', '')
        await siteService.addsite(req.body)
            .then(add => add ? res.json({
                status: 200,
                result: add
            }) : res.status(400).json({
                message: 'not Added site setting'
            }))
            .catch(err => next(err))
    } else {

        await unlinkAsync(req.files['site_favicon'][0].path)
        await unlinkAsync(req.files['site_logo'][0].path)
        const msg = 'Uploaded file is not a valid image. Only JPG, PNG and JPEG files are allowed!...'
        res.json({
            status: 200,
            result: msg
        })
    }
}

async function updatesite(req, res, next) {
    console.log(req.files['site_logo'])
    // const data = JSON.stringify(req.files.site_logo[0])

    console.log(data)
  
if(req.files)
{
    if (req.files['site_logo'] == null || req.files['site_logo'] == undefined) {
        if (req.files['site_logo'] == null || req.files['site_logo'] == undefined || req.files['site_favicon'] == null || req.files['site_favicon'] == undefined) {
            await siteService.update_congi_withoutimg(req.params.id, req.body)
                .then(update => update ? res.json({
                    status: 200,
                    result: update
                }) : res.status(400).json({
                    message: 'not Added site setting'
                }))
                .catch(err => next(err))
        }

        req.body.site_favicon = replaceString(req.files['site_favicon'][0].path, 'public', '')
        await siteService.update_congi_favicon(req.params.id, req.body)
            .then(update => update ? res.json({
                status: 200,
                result: update
            }) : res.status(400).json({
                message: 'not Added site setting'
            }))
            .catch(err => next(err))

    } else if ( req.files['site_favicon'] == null || req.files['site_favicon'] == undefined) {
        if (req.files['site_logo'] == null || req.files['site_logo'] == undefined || req.files['site_favicon'] == null || req.files['site_favicon'] == undefined) {
            await siteService.update_congi_withoutimg(req.params.id, req.body)
                .then(update => update ? res.json({
                    status: 200,
                    result: update
                }) : res.status(400).json({
                    message: 'not Added site setting'
                }))
                .catch(err => next(err))
        }
        req.body.site_logo =await replaceString(req.files['site_logo'][0].path, 'public', '')
        await siteService.update_congi_logo(req.params.id, req.body)
            .then(update => update ? res.json({
                status: 200,
                result: update
            }) : res.status(400).json({
                message: 'not Added site setting'
            }))
            .catch(err => next(err))
    } else if (await req.files['site_favicon'][0].mimetype === "image/png" || await req.files['site_favicon'][0].mimetype === "image/jpe" && await req.files['site_favicon'][0].mimetype === "image/jpeg" || await req.files['site_logo'][0].mimetype === "image/png" || await req.files['site_logo'][0].mimetype === "image/jpe" || await req.files['site_logo'][0].mimetype === "image/jpeg") {
         req.body.site_favicon = await replaceString(req.files['site_favicon'][0].path, 'public', '')
         req.body.site_logo = await replaceString(req.files['site_logo'][0].path, 'public', '')
        await siteService.update_congi(req.params.id, req.body)
            .then(update => update ? res.json({
                status: 200,
                result: update
            }) : res.status(400).json({
                message: 'not Added site setting'
            }))
            .catch(err => next(err))
    } else { 
        await unlinkAsync(req.files['site_favicon'][0].path)
        await unlinkAsync(req.files['site_logo'][0].path)
        const msg = 'Uploaded file is not a valid image. Only JPG, PNG and JPEG files are allowed!...'
        res.json({
            status: 200,
            result: msg
        })
    }
}
}
async function site_listing(req, res, next) {
    await siteService.listing(req.params.id)
        .then(list => list ? res.json({
            status: 200,
            result: list
        }) : res.status(400).json({
            message: 'false'
        }))
        .catch(err => next(err))
}
async function site_delete(req,res,next){
    await siteService.delete_site(req.params.id)
    .then(del=>del?res.json({status:200,result:del}):res.status(400).json({message:"error"})).catch(err=>next(err))
}

async function demo_api(req,res,next){
    let kay ="KS9C5N3Y"
     let language ="en-US"
     const api = "http://api.grammarbot.io/v2/check?api_key="+kay+"&text="+req.body.text+".&language="+language+"";
     const request = require('request');
     request(api, function (error, response, body) {
        if (!error && response.statusCode == 200) {
           res.send(body) 
        }
    });
}