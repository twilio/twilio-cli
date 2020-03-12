const { flags } = require('@oclif/command');
const deepEqual = require('deep-equal');
const yaml = require('js-yaml');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { translateValues } = require('@twilio/cli-core').services.JSUtils;
const { readFileOrStdIn } = require('../../services/file-io');
const CONFIGURATION = require('../../services/manage');

const SID_PREFIX_MAP = {
  FW: 'studio.flows',
  TC: 'taskrouter.workspaces.taskChannels',
  WA: 'taskrouter.workspaces.activities',
  WQ: 'taskrouter.workspaces.taskQueues',
  WW: 'taskrouter.workspaces.workflows'
};

const getSidPattern = (prefix = '[A-Z]{2}') => {
  return new RegExp(`(${prefix})[0-9a-f]{32}`, 'g');
};

const CONFIG_FILE = 'config-file';
const DRY_RUN = 'dry-run';

class ManageImport extends TwilioClientCommand {
  async run() {
    await super.run();

    const fileInfo = await readFileOrStdIn(this.flags[CONFIG_FILE]);

    if (!fileInfo) {
      throw new TwilioCliError('No configuration file provided');
    }

    // this.resources = JSON.parse(fileInfo.content);
    this.resources = yaml.safeLoad(fileInfo.content);

    this.sidMapping = {};
    this.sidMapping[this.resources.accountSid] = this.twilioClient.accountSid;

    try {
      await this.processDependents(this.resources, CONFIGURATION);
    } catch (error) {
      this.logger.error(error.message);
      this.logger.error(error.stack);
      this.exit(1);
    }
  }

  async processDependents(parentResource, configuration, resourcePath = []) {
    const resourceDependents = parentResource.dependents || parentResource;
    const configDependents = configuration.dependents;

    for (const name in configDependents) {
      if (Object.prototype.hasOwnProperty.call(configDependents, name) &&
        Object.prototype.hasOwnProperty.call(resourceDependents, name)) {
        // eslint-disable-next-line no-await-in-loop
        await this.processDependent(resourceDependents[name], configDependents[name], resourcePath.concat(name));
      }
    }
  }

  async processDependent(parentResource, configuration, resourcePath) {
    if (configuration.properties || configuration.instanceProperties) {
      for (const resource of parentResource) {
        let targetResource = resource.targetResource;

        if (!targetResource) {
          // eslint-disable-next-line no-await-in-loop
          const updatedResource = await this.processResource(resource, configuration, resourcePath);
          targetResource = updatedResource.targetResource;
        }

        if (configuration.dependents) {
          // eslint-disable-next-line no-await-in-loop
          await this.processDependents(resource, configuration, resourcePath.concat(targetResource));
        }
      }
    } else if (configuration.dependents) {
      await this.processDependents(parentResource, configuration, resourcePath);
    }
  }

  async processResource(resource, configuration, resourcePath) {
    const properties = configuration.properties || configuration.instanceProperties;

    if (resource.processing) {
      return this.updateResource(resource, resourcePath, { createOnly: true });
    }

    resource.processing = true;

    if (resource.properties.sid in this.sidMapping) {
      resource.properties.sid = this.sidMapping[resource.properties.sid];
    } else {
      const clientContext = this.getClientContext(resourcePath);

      if (clientContext) {
        try {
          await clientContext(resource.properties.sid).fetch();
        } catch (error) {
          for (const targetResource of await clientContext.list()) {
            if (resource.properties.friendlyName === targetResource.friendlyName) {
              this.sidMapping[resource.properties.sid] = targetResource.sid;
              resource.properties.sid = targetResource.sid;
              break;
            }
          }
        }
      }
    }

    /* eslint-disable no-await-in-loop,require-atomic-updates */
    for (const property in properties) {
      if (property !== 'sid' && Object.prototype.hasOwnProperty.call(properties, property)) {
        const value = resource.properties[property];
        if (value) {
          if (properties[property] === 'string') {
            resource.properties[property] = await this.processString(property, value);
          }
        }
      }
    }

    if (resource.targetResource) {
      resource.properties.sid = resource.targetResource.sid;
      delete resource.targetResource;
    }

    return this.updateResource(resource, resourcePath);
  }

  async processString(property, value) {
    if (typeof value === 'string' || typeof value === 'object' || Array.isArray(value)) {
      let sids = [];

      // Gather up all the SIDs.
      translateValues(value, oldValue => {
        if (typeof oldValue === 'string') {
          sids = sids.concat(oldValue.match(getSidPattern()) || []);
        }

        return oldValue;
      });

      // Get all the matching SIDs.
      for (const sid of sids) {
        const sidPrefix = sid.slice(0, 2);
        const path = SID_PREFIX_MAP[sidPrefix];

        if (path) {
          await this.getMatchingSid(path, sid);
        }
      }

      // Finally, replace all the matched SIDs.
      value = translateValues(value, oldValue => {
        if (typeof oldValue === 'string') {
          return oldValue.replace(getSidPattern(), match => {
            if (!(match in this.sidMapping)) {
              this.logger.warn(`Unknown SID prefix for ${match}`);
              return match;
            }

            return this.sidMapping[match];
          });
        }

        return oldValue;
      });
    }

    return value;
  }

  async getMatchingSid(path, sid) {
    this.logger.debug(`Searching for ${sid} on path ${path}`);

    if (sid in this.sidMapping) {
      return this.sidMapping[sid];
    }

    const route = this.search(path.split('.'), sid, this.resources.dependents);

    if (route) {
      let resourcePath = [];
      let resource = this.resources.dependents;
      let configuration = CONFIGURATION;
      let updatedResource;

      for (const routePart of route) {
        if (typeof routePart === 'string') {
          resourcePath.push(routePart);
          resource = resource[routePart];
          configuration = configuration.dependents[routePart];
        } else {
          resource = routePart;

          updatedResource = await this.processResource(resource, configuration, resourcePath);

          resourcePath.push(updatedResource.targetResource);
        }
      }

      if (updatedResource) {
        return updatedResource.targetResource.sid;
      }
    } else {
      this.logger.error(`Matching resource for ${sid} on path ${path} not found`);
    }
  }

  search(pathParts, sid, resourcePath, route = []) {
    if (Array.isArray(resourcePath)) {
      for (const resource of resourcePath) {
        const localRoute = route.slice();
        localRoute.push(resource);

        const finalRoute = this.search(pathParts, sid, resource.dependents, localRoute);

        if (finalRoute) {
          return finalRoute;
        }
      }

      // Not found.
      return;
    }

    const pathPart = pathParts.shift();
    route.push(pathPart);

    resourcePath = resourcePath[pathPart];

    if (pathParts.length > 0) {
      return this.search(pathParts, sid, resourcePath, route);
    }

    const found = resourcePath.find(resource => resource.properties.sid === sid);

    if (found) {
      route.push(found);
      return route;
    }
  }

  async updateResource(resource, resourcePath, options = {}) {
    if (!resource.targetResource) {
      const clientContext = this.getClientContext(resourcePath);
      const dryRun = this.flags[DRY_RUN];

      resourcePath = resourcePath
        .concat(resource.properties.friendlyName)
        .map(pathPart => typeof pathPart === 'object' ? pathPart.friendlyName : pathPart)
        .join(' -> ');

      resource.targetResource = resource;

      const clientResource = clientContext ? clientContext(resource.properties.sid) : null;

      try {
        resource.targetResource = await clientResource.fetch();
      } catch (error) {
        this.logger.info(`Creating resource: ${resourcePath}`);
        if (dryRun) {
          resource.targetResource = { ...resource.properties, sid: null };
        } else {
          resource.targetResource = await clientContext.create(resource.properties);
        }

        this.sidMapping[resource.properties.sid] = resource.targetResource.sid;
        return resource;
      }

      if (clientResource.update && !options.createOnly) {
        if (this.areResourcesEqual(resource.properties, resource.targetResource)) {
          this.logger.info(`Update not needed for resource: ${resourcePath}`);
        } else {
          this.logger.info(`Updating resource: ${resourcePath}`);

          if (dryRun) {
            resource.targetResource = { ...resource.properties, sid: null };
          } else {
            resource.targetResource = await clientResource.update(resource.properties);
          }
        }
      }
    }

    return resource;
  }

  getClientContext(resourcePath) {
    let clientContext = this.twilioClient;

    for (const pathPart of resourcePath) {
      if (typeof pathPart === 'object') {
        if (!pathPart.sid) {
          return;
        }

        clientContext = clientContext(pathPart.sid);
      } else {
        clientContext = clientContext[pathPart];
      }
    }

    return clientContext;
  }

  areResourcesEqual(resourceProperties, otherResource) {
    const differences = [];

    for (const property in resourceProperties) {
      if (property !== 'sid' && Object.prototype.hasOwnProperty.call(resourceProperties, property)) {
        if (!deepEqual(resourceProperties[property], otherResource[property])) {
          if (resourceProperties[property] !== null || otherResource[property] !== '') {
            differences.push(property);
          }
        }
      }
    }

    return differences.length === 0;
  }
}

ManageImport.description = 'import select resource configuration';
ManageImport.flags = Object.assign(
  {
    [CONFIG_FILE]: flags.string({
      description: 'Path to the resource configuration file.'
    }),
    [DRY_RUN]: flags.boolean({
      description: 'No resources are created or updated.'
    })
  },
  TwilioClientCommand.flags
);
module.exports = ManageImport;
