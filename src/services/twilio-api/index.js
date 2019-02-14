const url = require('url');
const apiSpecFromDisk = require('./twilio_api.json');
const { doesObjectHaveProperty } = require('../javascript-utilities');

function translateLegacyVersions(domain, version) {
  // In the Node helper library, api.twilio.com/2010-04-01 is represented as "v2010"
  if (domain === 'api' && version === '2010-04-01') {
    return 'v2010';
  }
  return version;
}

const listResourceMethodMap = {
  get: 'list',
  post: 'create'
};

const instanceResourceMethodMap = {
  delete: 'remove',
  get: 'fetch',
  post: 'update'
};

/*

Notes:

Disambiguating like-named resources:
If same resource name exists under multiple domains/versions/paths, then have the command
map to a help message when it is ambiguous as to which domain/version/path they want.
Maybe have a setting to change this behavior? Have a custom shortcut map in the config
file? Have a mode of operation where it just picks the most recent version?

*/

class TwilioApiBrowser {
  constructor(apiSpec) {
    this.apiSpec = apiSpec || apiSpecFromDisk;
    this.domains = this.loadDomains();
  }

  loadDomains() {
    const domains = {};

    Object.keys(this.apiSpec.paths).forEach(path => {
      // Naive assumption: The Twilio API's only have a single domain
      const serverUrl = new url.URL(this.apiSpec.paths[path].servers[0].url);
      const domain = serverUrl.host.split('.')[0]; // e.g. 'api' from 'api.twilio.com'

      const version = translateLegacyVersions(
        domain,
        path.split('/')[1] // e.g. 'v1' from '/v1/foo/bar'
      );

      if (!doesObjectHaveProperty(domains, domain)) {
        domains[domain] = { versions: {} };
      }

      if (!doesObjectHaveProperty(domains[domain].versions, version)) {
        domains[domain].versions[version] = { resources: {} };
      }

      const isInstanceResource = path.endsWith('}.json');

      const pathParts = path.split('/');
      pathParts.splice(1, 1); // e.g. '/v1/foo' becomes '/foo'
      if (isInstanceResource) {
        pathParts.splice(pathParts.length - 1, 1); // e.g. /foo/{Sid} becomes /foo
      }
      const resourcePath = pathParts.join('/').replace('.json', '');

      const resources = domains[domain].versions[version].resources;
      if (!doesObjectHaveProperty(resources, resourcePath)) {
        resources[resourcePath] = {
          actions: {},
          description: this.apiSpec.paths[path].description.replace(/(\r\n|\n|\r)/gm, ' ')
        };
      }

      const actions = resources[resourcePath].actions;
      const methodMap = isInstanceResource ? instanceResourceMethodMap : listResourceMethodMap;
      Object.keys(methodMap).forEach(method => {
        if (doesObjectHaveProperty(this.apiSpec.paths[path], method)) {
          actions[methodMap[method]] = this.apiSpec.paths[path][method];
        }
      });
    });

    return domains;
  }
}

module.exports = { TwilioApiBrowser };
