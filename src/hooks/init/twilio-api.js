/* eslint no-warning-comments: "off" */
// TODO: Remove the above eslint directive when this file
// is free of TODO's.

const { Plugin } = require('@oclif/config');
const TwilioApiCommand = require('../../base-commands/twilio-api-command');
const { TwilioApiBrowser, getTopicName } = require('../../services/twilio-api');

// Implement an oclif plugin that can provide dynamically created commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  scanAction(actionName) {
    this.actionName = actionName;
    this.actions.push({
      domainName: this.domainName,
      versionName: this.versionName,
      // TODO: We need a much better way to get a good topic name
      topicName: getTopicName(this.domainName, this.versionName, this.resourcePath),
      commandName: this.actionName,
      path: this.resourcePath,
      resource: this.resource,
      actionName: this.actionName,
      action: this.resource.actions[this.actionName]
    });
  }

  scanResource(resourcePath) {
    this.resourcePath = resourcePath;
    this.resource = this.version.resources[resourcePath];
    Object.keys(this.resource.actions).forEach(this.scanAction, this);
  }

  scanVersion(versionName) {
    this.versionName = versionName;
    this.version = this.domain.versions[versionName];
    Object.keys(this.version.resources).forEach(this.scanResource, this);
  }

  scanDomain(domainName) {
    this.domainName = domainName;
    this.domain = this.apiBrowser.domains[domainName];
    Object.keys(this.domain.versions).forEach(this.scanVersion, this);
  }

  constructor(config, apiBrowser) {
    super(config);
    this.apiBrowser = apiBrowser || new TwilioApiBrowser();

    this.actions = [];
    Object.keys(this.apiBrowser.domains).forEach(this.scanDomain, this);
  }

  get hooks() {
    // This plugin doesn't introduce any other hooks. Return empty object.
    return {};
  }

  get topics() {
    return this.actions
      .filter((value, index, self) => self.findIndex(a => a.topicName === value.topicName) === index) // Uniques
      .map(a => ({
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
