const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    permission_id :{ type: Array, required: true },
    role_id:{ type: Schema.Types.ObjectId, required: true }
    
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_permission_roles', schema);