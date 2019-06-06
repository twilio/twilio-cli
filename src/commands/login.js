const ProjectAdd = require('./project/add');

class Login extends ProjectAdd {
}

Login.aliases = ['project:add'];
Login.flags = ProjectAdd.flags;
Login.args = ProjectAdd.args;

module.exports = Login;
