const ProfilesCreate = require('./profiles/create');

class Login extends ProfilesCreate {}

Login.aliases = ['profiles:create', 'profiles:add'];
Login.flags = ProfilesCreate.flags;
Login.args = ProfilesCreate.args;

module.exports = Login;
