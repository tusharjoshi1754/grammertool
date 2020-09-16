const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    permission_controller:{type:String , require:true, unique:true}
    
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_permission', schema);