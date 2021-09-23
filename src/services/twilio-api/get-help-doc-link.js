const jsonMap = require('../api-doc-mapping.json');
// json structure = url: {path : {topics: {}, commands: {}}, subpath : {wherever applicable}}
const urlMap = new Map(Object.entries(jsonMap));

const getSubroute = (cmdDetailsArr, subpathMap) => {
  const subdomain = cmdDetailsArr[3];
  // apiName/version to locate sub url in json map
  const apiVersion = `${cmdDetailsArr[1]}/${cmdDetailsArr[2]}`;
  const subUrlArr = subpathMap.get(apiVersion);
  if (subUrlArr === undefined) {
    return '';
  }
  const subUrlMap = new Map(Object.entries(subUrlArr));
  const subUrl = subUrlMap.get(subdomain);
  return subUrl;
};

const getRootPath = (cmdDetailsArr, subpathMap, topicsMap, commandsMap) => {
  const topicName = cmdDetailsArr[0];
  const apiName = cmdDetailsArr[1];
  let url = '';

  if (topicName === 'api') {
    // get the array of apis and convert to a map
    const arrOfAllApis = topicsMap.get(topicName);
    if (!arrOfAllApis) {
      return '';
    }
    const mapOfAPIs = new Map(Object.entries(arrOfAllApis));
    url = mapOfAPIs.get(apiName);
    if (url === undefined) {
      return '';
    }
    url += getSubroute(cmdDetailsArr, subpathMap) || '';
  } else {
    // its a command or another topic
    url = topicsMap.get(topicName) || commandsMap.get(topicName);
  }

  return url;
};

const getDocLink = (key) => {
  // key format : baseTopicName:topicName:actionName
  const pathMap = new Map(Object.entries(urlMap.get('path')));
  const subpathMap = new Map(Object.entries(urlMap.get('subpath')));
  const topicsMap = new Map(Object.entries(pathMap.get('topics')));
  const commandsMap = new Map(Object.entries(pathMap.get('commands')));

  const baseUrl = 'https://twilio.com/docs/';
  let url = '';
  const cmdDetailsArr = key.split(':'); // original command array
  const cmd = cmdDetailsArr[0];
  if (topicsMap.has(cmd) || commandsMap.has(cmd)) {
    url = getRootPath(cmdDetailsArr, subpathMap, topicsMap, commandsMap);
  } else {
    url = 'api/';
  }
  return baseUrl + (url || '');
};

module.exports = {
  getDocLink,
  getRootPath,
};
