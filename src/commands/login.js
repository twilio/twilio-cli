const ProjectsAdd = require('./projects/add');

class Login extends ProjectsAdd {
}

Login.aliases = ['projects:add'];
Login.flags = ProjectsAdd.flags;
Login.args = ProjectsAdd.args;

module.exports = Login;
