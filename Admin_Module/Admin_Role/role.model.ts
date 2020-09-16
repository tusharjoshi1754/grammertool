const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    role_name: { type: String, required: true,unique: true},
    role_status:{type:Boolean,default:true},
    created_date: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_roles', schema);