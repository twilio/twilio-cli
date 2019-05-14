const fs = require('fs');
const url = require('url');
const { doesObjectHaveProperty } = require('@twilio/cli-core').services.JSUtils;
const ResourcePathParser = require('../resource-path-parser');

const isApi2010 = (domain, version) => {
  return domain === 'api' && (version === '2010-04-01' || version === 'v2010');
};

function translateLegacyVersions(domain, version) {
  // In the Node helper library, api.twilio.com/2010-04-01 is represented as "v2010"
  return isApi2010(domain, version) ? 'v2010' : version;
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
    this.apiSpec = apiSpec || this.loadApiSpecFromDisk();
    this.domains = this.loadDomains();
  }

  loadApiSpecFromDisk() {
    // Assume all 'json' files in here are OpenAPI spec files.
    return fs.readdirSync(__dirname)
      .filter(filename => filename.endsWith('.json'))
      .map(filename => require(`./${filename}`));
  }

  loadDomains() {
    const domains = {};

    this.apiSpec.forEach(spec => {
      Object.keys(spec.paths).forEach(path => {
        // Naive assumption: The Twilio API's only have a single domain
        const serverUrl = new url.URL(spec.paths[path].servers[0].url);
        const domain = serverUrl.host.split('.')[0]; // e.g. 'api' from 'api.twilio.com'

        const resourcePathParser = new ResourcePathParser(path);
        resourcePathParser.normalizePath(); // e.g /v1/foo/bar/{Sid}.json --> /foo/bar
        const resourcePath = resourcePathParser.getFullPath();

        const version = translateLegacyVersions(domain, resourcePathParser.version);

        if (!doesObjectHaveProperty(domains, domain)) {
          domains[domain] = { versions: {}, tags: spec.tags };
        }

        if (!doesObjectHaveProperty(domains[domain].versions, version)) {
          domains[domain].versions[version] = { resources: {} };
        }

        const resources = domains[domain].versions[version].resources;
        if (!doesObjectHaveProperty(resources, resourcePath)) {
          resources[resourcePath] = {
            actions: {},
            description: spec.paths[path].description.replace(/(\r\n|\n|\r)/gm, ' '),
            defaultOutputProperties: spec.paths[path]['x-default-output-properties']
          };
        }

        const actions = resources[resourcePath].actions;
        const methodMap = resourcePathParser.isInstanceResource ? instanceResourceMethodMap : listResourceMethodMap;
        Object.keys(methodMap).forEach(method => {
          if (doesObjectHaveProperty(spec.paths[path], method)) {
            actions[methodMap[method]] = spec.paths[path][method];
          }
        });
      });
    });

    return domains;
  }
}

module.exports = {
  TwilioApiBrowser,
  isApi2010
};
