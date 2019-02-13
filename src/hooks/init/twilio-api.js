/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { Plugin } = require('@oclif/config');
const TwilioApiCommand = require('../../base-commands/twilio-api-command');
const { TwilioApiBrowser } = require('../../services/twilio-api');

// Implement an oclif plugin that can provide dynamically created commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  constructor(config, apiBrowser) {
    super(config);
    this.apiBrowser = apiBrowser || new TwilioApiBrowser();

    // TODO: Hard-coding one resource/action for now.
    const resourcePath = '/Accounts/{AccountSid}/Calls';
    const resource = this.apiBrowser.domains.api.versions.v2010.resources[resourcePath];
    this.actions = [
      {
        domainName: 'api',
        versionName: 'v2010',
        topicName: 'call',
        commandName: 'create',
        path: resourcePath,
        resource: resource,
        action: resource.actions.create
      }
    ];
  }

  get hooks() {
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
