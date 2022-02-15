const saveFile = require('fs').writeFileSync;

function packageChanges(rootPath, owner) {
  const pkgJsonPath = `${rootPath}/package.json`
  const json = require(pkgJsonPath);

  if (!json.hasOwnProperty('repository')) {
    json.repository = {};
    json.repository['type'] = 'git'
    json.repository['url'] = `https://github.com/${owner}/twilio-cli.git`
  } else {
    json.repository['url'] = `https://github.com/${owner}/twilio-cli.git`
  }

  if (json.hasOwnProperty('oclif')) {
    if (!json.oclif.hasOwnProperty('macos')) {
      json.oclif.macos = {};
      json.oclif.macos['identifier'] = "com.twilio.cli"
    } else {
      delete json.oclif.macos.sign
    }
    json.oclif.update.s3.bucket = "twilio-cli-dev"
  }
  saveFile(pkgJsonPath, JSON.stringify(json, null, 2));
}


function releasercChanges(rootPath) {
  const releasercJsonPath = `${rootPath}/.releaserc.json`
  const json = require(releasercJsonPath);
  if (json.plugins.includes("@semantic-release/npm")) {
      json.plugins = _removeItem(json.plugins, "@semantic-release/npm")
      json.plugins.push(["@semantic-release/npm", {"npmPublish": false}])
  }

  saveFile(releasercJsonPath, JSON.stringify(json, null, 2));
}

function _removeItem(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}


packageChanges(process.argv[2], process.argv[3])
releasercChanges(process.argv[2])
