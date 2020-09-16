const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({

    site_logo:{type:String},
    site_favicon:{type:String},
    general_email:{type:String},
    site_name:{type:String, required:true},
   
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_site_setting', schema);