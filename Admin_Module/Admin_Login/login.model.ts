const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, required: true },
    status: { type: Boolean, required: true },
    created_date: { type: Date, default: Date.now },
    forget_token:{type:Number}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('tbl_admin_users', schema);