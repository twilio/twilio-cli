const loginCommand = require('./project/add');

class Login extends loginCommand {
}
Login.aliases = ['project:add'];
module.exports = Login;
