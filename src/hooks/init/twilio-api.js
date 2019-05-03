const { Plugin } = require('@oclif/config');
const TwilioApiCommand = require('../../base-commands/twilio-api-command');
const { TwilioApiBrowser, isApi2010, getTopicName, TOPIC_SEPARATOR } = require('../../services/twilio-api');

// Implement an oclif plugin that can provide dynamically created commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  scanAction(actionDefinition) {
    actionDefinition.commandName = actionDefinition.actionName;
    actionDefinition.action = actionDefinition.resource.actions[actionDefinition.actionName];
    this.actions.push(Object.assign({}, actionDefinition));
  }

  scanResource(actionDefinition) {
    actionDefinition.resource = actionDefinition.version.resources[actionDefinition.path];
    actionDefinition.topicName = getTopicName(actionDefinition);
    Object.keys(actionDefinition.resource.actions).forEach(actionName => {
      actionDefinition.actionName = actionName;
      this.scanAction(actionDefinition);
    }, this);
  }

  scanVersion(actionDefinition) {
    actionDefinition.version = actionDefinition.domain.versions[actionDefinition.versionName];
    Object.keys(actionDefinition.version.resources).forEach(resourcePath => {
      actionDefinition.path = resourcePath;
      this.scanResource(actionDefinition);
    }, this);

    // No need to add a topic for the legacy API version since all sub-topics will be at the domain-level.
    if (isApi2010(actionDefinition.domainName, actionDefinition.versionName)) {
      return;
    }

    const shortVersion = actionDefinition.versionName.replace(/v/g, '');
    this.versionTopics.push({
      name: actionDefinition.domainName + TOPIC_SEPARATOR + actionDefinition.versionName,
      description: `version ${shortVersion} of the API`
    });
  }

  scanDomain(domainName) {
    const actionDefinition = {
      domainName,
      domain: this.apiBrowser.domains[domainName]
    };

    Object.keys(actionDefinition.domain.versions).forEach(versionName => {
      actionDefinition.versionName = versionName;
      this.scanVersion(actionDefinition);
    }, this);

    this.domainTopics.push({
      name: domainName,
      description: `resources under ${domainName}.twilio.com`
    });
  }

  constructor(config, apiBrowser) {
    super(config);
    this.apiBrowser = apiBrowser || new TwilioApiBrowser();

    this.actions = [];
    this.domainTopics = [];
    this.versionTopics = [];
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
      }))
      .concat(this.domainTopics)
      .concat(this.versionTopics);
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
      const NewCommandClass = class extends TwilioApiCommand {};
      NewCommandClass.actionDefinition = actionDefinition;
      TwilioApiCommand.setUpNewCommandClass(NewCommandClass);
      return NewCommandClass;
    });
  }
}

module.exports = async function () {
  const twilioApiPlugin = new TwilioRestApiPlugin(this.config);
  twilioApiPlugin.name = 'api-cli-commands';
  twilioApiPlugin.version = this.config.version;
  twilioApiPlugin.tag = 'latest';
  twilioApiPlugin.type = 'core';
  this.config.plugins.push(twilioApiPlugin);
};
