const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
module.exports = {
    Admin_Role : require('../Admin_Module/Admin_Role/role.model.ts'),
    Admin_User : require('../Admin_Module/Admin_Login/login.model.ts'),
    Permission : require('../Admin_Module/Admin_Permission/permission.model.ts'),
    permission_role : require('../Admin_Module/Permission_Role/permission_role.model.ts'),
    site_setting:require('../Admin_Module/Site_Setting/setting.model.ts')
}