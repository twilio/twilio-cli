const ProfilesAdd = require('./profiles/add');

class Login extends ProfilesAdd {
}

Login.aliases = ['profiles:add'];
Login.flags = ProfilesAdd.flags;
Login.args = ProfilesAdd.args;

module.exports = Login;
