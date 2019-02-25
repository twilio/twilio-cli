/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { Plugin } = require('@oclif/config');
const TwilioApiCommand = require('../../base-commands/twilio-api-command');
const { TwilioApiBrowser } = require('../../services/twilio-api');
const { kebabCase } = require('../../services/naming-conventions');

// Implement an oclif plugin that can provide dynamically created commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  constructor(config, apiBrowser) {
    super(config);
    this.apiBrowser = apiBrowser || new TwilioApiBrowser();

    this.actions = [];
    Object.keys(this.apiBrowser.domains).forEach(domainName => {
      if (domainName !== 'chat') return;
      const domain = this.apiBrowser.domains[domainName];
      Object.keys(domain.versions).forEach(versionName => {
        if (versionName === 'v1') return;
        const version = domain.versions[versionName];
        Object.keys(version.resources).forEach(resourcePath => {
          if (!resourcePath.startsWith('/Services/{ServiceSid}/Channels/{ChannelSid}/Mem')) return;
          const resource = version.resources[resourcePath];
          Object.keys(resource.actions).forEach(actionName => {
            if (['update', 'create'].includes(actionName)) return;
            console.log(resourcePath, actionName);
            this.actions.push({
              domainName,
              versionName,
              // TODO: We need a much better way to get a good topic name
              topicName: domainName + '-' + versionName + '-' + kebabCase(resourcePath.replace(/[\/\{\}]+/g, '-')),
              commandName: actionName,
              path: resourcePath,
              resource: resource,
              actionName,
              action: resource.actions[actionName]
            });
          });
        });
      });
    });
  }

  get hooks() {
    // This plugin doesn't introduce any other hooks. Return empty object.
    return {};
  }

  get topics() {
    return this.actions.map(a => ({
      name: a.topicName,
      description: a.resource.description
    }));
  }

  get commandIDs() {
    return this.actions.map(a => a.topicName + ':' + a.commandName);
  }

  get commands() {
    return this.actions.map(actionDefinition => {
      // Because oclif is constructing the object for us,
      // we can't pass the actionDefinition in through
      // the constructor, so we make it a static property
      // of the newly created command class.
      // console.log(actionDefinition);
      const cmd = class extends TwilioApiCommand {};
      cmd.actionDefinition = actionDefinition;
      TwilioApiCommand.setUpApiCommandOptions(cmd);
      return cmd;
    });
  }
}

module.exports = async function () {
  this.config.plugins.push(new TwilioRestApiPlugin(this.config));
};
