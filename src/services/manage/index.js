const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIGURATION = yaml.safeLoad(fs.readFileSync(path.join(__dirname, 'config.yml')));

module.exports = CONFIGURATION;
