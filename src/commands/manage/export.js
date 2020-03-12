const yaml = require('js-yaml');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const CONFIGURATION = require('../../services/manage');

class ManageExport extends TwilioClientCommand {
  async run() {
    await super.run();

    const resources = {
      version: CONFIGURATION.version,
      accountSid: this.twilioClient.accountSid,
      dependents: {}
    };

    await this.processDependents(resources.dependents, CONFIGURATION.dependents, this.twilioClient);

    // console.log(JSON.stringify(resources, null, 2));
    console.log(yaml.safeDump(resources));
  }

  async processDependents(parentResource, configuration, clientContext) {
    for (const name in configuration) {
      if (Object.prototype.hasOwnProperty.call(configuration, name)) {
        // eslint-disable-next-line no-await-in-loop
        await this.process(parentResource, configuration[name], clientContext[name], name);
      }
    }
  }

  async process(parentResource, configuration, clientContext, name) {
    if (configuration.properties || configuration.instanceProperties) {
      if (name) {
        parentResource[name] = [];
        parentResource = parentResource[name];
      }

      await this.processResources(parentResource, configuration, clientContext);
    } else if (configuration.dependents) {
      if (name) {
        parentResource[name] = {};
        parentResource = parentResource[name];
      }

      await this.processDependents(parentResource, configuration.dependents, clientContext);
    }
  }

  async processResources(parentResource, configuration, clientContext) {
    if (clientContext.list) {
      for (const resourceInstance of await clientContext.list()) {
        const instanceContext = clientContext(resourceInstance.sid);
        // eslint-disable-next-line no-await-in-loop
        const resource = await this.processInstance(resourceInstance, configuration, instanceContext);

        parentResource.push(resource);

        if (configuration.limit && parentResource.length >= configuration.limit) {
          break;
        }
      }
    } else {
      const instanceContext = clientContext();
      const resource = await this.processInstance(null, configuration, instanceContext);

      parentResource.push(resource);
    }
  }

  async processInstance(resourceInstance, configuration, instanceContext) {
    const resource = {
      properties: {},
      dependents: {}
    };

    for (const property in configuration.properties || []) {
      if (Object.prototype.hasOwnProperty.call(configuration.properties, property)) {
        resource.properties[property] = resourceInstance[property];
      }
    }

    if (configuration.instanceProperties) {
      // eslint-disable-next-line no-await-in-loop
      const instance = await instanceContext.fetch();

      for (const property in configuration.instanceProperties) {
        if (Object.prototype.hasOwnProperty.call(configuration.instanceProperties, property)) {
          resource.properties[property] = instance[property];
        }
      }
    }

    // eslint-disable-next-line no-await-in-loop
    await this.processDependents(resource.dependents, configuration.dependents, instanceContext);

    return resource;
  }
}

ManageExport.description = 'export select resource configuration';
ManageExport.flags = TwilioClientCommand.flags;
module.exports = ManageExport;
