
const express = require('express');
const app = express();
const db = require('./_helper/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./_helper/jwt');
const errorHandler = require('./_helper/errorhandler');

const Cryptr = require('cryptr');
const cryptra = new Cryptr('myTotalySecretKey');
const db_permission_role = db.permission_role;

const db_permisiion = db.Permission;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
// use JWT auth to secure the api
app.use(jwt());
// app.use('/grammercheck',require('./Admin_Module/Grammerbot_Api/Grammerbot_api.controller'))
app.use(async function (req, res, next) {

    let a = [];
    var url = req.url;
    var url21 = url.split('/')
 
    var permission = url21[2]
    if (req.body.username == null && req.body.password == null) {
        const roleid = cryptra.decrypt(req.user.id, 'key')
        const permission_roledata = await db_permission_role.find({ "role_id": roleid })
        
        var id=[]
        id = permission_roledata[0].permission_id

         var count=0;

        if (id) {
            for (let i = 0; i < id.length; i++) {
                a[i] = await db_permisiion.findById(id[i])
                
                if (a[i].permission_controller === permission ) {
                    count = count+1
                }

            }
            if(count !=1){
                return res.status(401).json({ status: false, message: 'unauthorized error' });
            }
        }
    }
        next();
});

app.use('/role', require('./Admin_Module/Admin_Role/role.controller'));
app.use('/adminusers', require('./Admin_Module/Admin_Login/login.controller'));
app.use('/permission', require('./Admin_Module/Admin_Permission/permission.controller.js'));
app.use('/role_permission',require('./Admin_Module/Permission_Role/permission_role.controller'));
app.use('/admin_user',require('./Admin_Module/Admin_User/adminuser.controller'));
app.use('/site_setting',require('./Admin_Module/Site_Setting/setting.controller'))
// app.use('/grammercheck',require('./Admin_Module/Grammerbot_Api/Grammerbot_api.controller'))
// global error handler
                                                                                                                                                  
app.use(errorHandler);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});