const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const db = require('../../_helper/db');
const sitesetting = db.site_setting;
const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)
module.exports = {
    addsite,
    update_congi,
    update_congi_withoutimg,
    update_congi_favicon,
    update_congi_logo,
    listing,
    delete_site
}


async function addsite(userparms) {
    
    const add = new sitesetting(userparms).save();
    if (add) {
        return add
    } else {
        return false
    }
 
}

async function update_congi(userParamid, userParam) {
    const findname = await sitesetting.findById(userParamid)
  
    
    
    if (findname) {
        const update = await sitesetting.findByIdAndUpdate({
            '_id': userParamid
        }, {$set: userParam})
        if (update.site_logo) {
            await unlinkAsync('public' + update.site_logo)
        }
        if(update.site_favicon){
            await unlinkAsync('public' + update.site_favicon) 
        }
    
        if (update) {
            return update.id
        } else {
            return false
        }
    }

}
async  function update_congi_withoutimg(userParamid,userParam){
    
    const finddata = await sitesetting.findById(userParamid)

    if(userParam.site_logo != null){
        await unlinkAsync('public' + finddata.site_logo)
    }
    if(userParam.site_favicon != null){
        await unlinkAsync('public' + finddata.site_favicon)
    }
    if(userParam.site_logo== null && userParam.site_logo == undefined && userParam.site_favicon==null &&userParam.site_favicon == undefined){
        userParam.site_logo = finddata.site_logo
        userParam.site_favicon =finddata.site_favicon
    }
    if(finddata){
        const update = await sitesetting.findByIdAndUpdate({
            '_id': userParamid
        }, {$set: userParam})
   
        if (update) {
            return update.id
        } else {
            return false
        }
    }
}
async function update_congi_logo(userParamid,userParam){
    
    const finddata = await sitesetting.findById(userParamid)

    if(userParam.site_logo != null){
        await unlinkAsync('public' + finddata.site_logo)
    }
    
  
    if(finddata){
        const update = await sitesetting.findByIdAndUpdate({
            '_id': userParamid
        }, {$set: userParam})
   
        if (update) {
            return update.id
        } else {
            return false
        }
    }
}
async function update_congi_favicon(userParamid,userParam){
    
    const finddata = await sitesetting.findById(userParamid)
    if(userParam.site_favicon != null){
        await unlinkAsync('public' + finddata.site_favicon)
    }
    
  
    if(finddata){
        const update = await sitesetting.findByIdAndUpdate({
            '_id': userParamid
        }, {$set: userParam})
   
        if (update) {
            return update.id
        } else {
            return false
        }
    }
}

async function listing(id){
    try{
        let data = await sitesetting.findById(id)
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
async function delete_site(id){
    const del = await sitesetting.findByIdAndDelete(id)
    if(del){
        return del.id
    }else{
        return false
    }

}