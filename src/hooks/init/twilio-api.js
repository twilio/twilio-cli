/* eslint-disable max-classes-per-file */
const { URL } = require('url');

const { Plugin } = require('@oclif/core');
const { logger } = require('@twilio/cli-core').services.logging;
const { TwilioApiBrowser } = require('@twilio/cli-core').services.TwilioApi;

const TwilioApiCommand = require('../../base-commands/twilio-api-command');
const {
  getTopicName,
  TOPIC_SEPARATOR,
  BASE_TOPIC_NAME,
  CORE_TOPIC_NAME,
  getDocLink,
} = require('../../services/twilio-api');

const METHOD_TO_ACTION_MAP = {
  list: {
    get: 'list',
    post: 'create',
  },
  instance: {
    delete: 'remove',
    get: 'fetch',
    post: 'update',
  },
};

// Implement an oclif plugin that can provide dynamically created commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  scanAction(actionDefinition) {
    actionDefinition.commandName = actionDefinition.actionName;
    actionDefinition.action = actionDefinition.resource.operations[actionDefinition.methodName];
    this.actions.push({ ...actionDefinition });
  }

  scanResource(actionDefinition) {
    actionDefinition.resource = actionDefinition.domain.paths[actionDefinition.path];
    actionDefinition.topicName = BASE_TOPIC_NAME + TOPIC_SEPARATOR + getTopicName(actionDefinition);

    const pathType = actionDefinition.resource.pathType.toLowerCase();

    Object.keys(actionDefinition.resource.operations).forEach((methodName) => {
      actionDefinition.methodName = methodName;
      actionDefinition.actionName = METHOD_TO_ACTION_MAP[pathType][methodName];
      this.scanAction(actionDefinition);
    }, this);
  }

  scanDomain(domainName) {
    const actionDefinition = {
      domainName,
      domain: this.apiBrowser.domains[domainName],
    };

    Object.keys(actionDefinition.domain.paths).forEach((pathName) => {
      const versionName = pathName.split('/')[1];
      const shortVersion = versionName.replace(/v/g, '');

      this.versionTopics.push({
        name: [BASE_TOPIC_NAME, actionDefinition.domainName, versionName].join(TOPIC_SEPARATOR),
        description: `version ${shortVersion} of the API`,
      });

      actionDefinition.path = pathName;
      this.scanResource(actionDefinition);
    }, this);

    let topicDomainName = domainName;

    // If the domain matches our base, switch to core.
    if (topicDomainName === BASE_TOPIC_NAME) {
      topicDomainName = CORE_TOPIC_NAME;
    }

    this.domainTopics.push({
      name: [BASE_TOPIC_NAME, topicDomainName].join(TOPIC_SEPARATOR),
      description: `resources under ${this.getHostname(actionDefinition)}`,
    });
  }

  /**
   * Attempts to get the hostname from first path's server. Falls back to using the domain name.
   *
   * @param {Object} actionDefinition - action containing domain paths
   * @returns {string} - Target hostname for the action
   */
  getHostname(actionDefinition) {
    try {
      const firstPath = Object.values(actionDefinition.domain.paths)[0];
      const serverUrl = new URL(firstPath.server);
      const { hostname } = serverUrl;

      if (!hostname) {
        throw new Error(`Could not determine hostname for server: ${firstPath.server}`);
      }

      return serverUrl.hostname;
    } catch (error) {
      logger.debug(`Failed to parse server name: ${error}`);
      logger.debug(`Falling back to domain name: ${actionDefinition.domainName}`);
      return `${actionDefinition.domainName}.twilio.com`;
    }
  }

  constructor(config, apiBrowser) {
    super(config);
    this.apiBrowser = apiBrowser || new TwilioApiBrowser();

    this.actions = [];
    this.domainTopics = [{ name: BASE_TOPIC_NAME, description: 'advanced access to all of the Twilio APIs' }];
    this.versionTopics = [];
    Object.keys(this.apiBrowser.domains).forEach(this.scanDomain, this);

    this.commands = this.actions.map((actionDefinition) => {
      /*
       * Because oclif is constructing the object for us,
       * we can't pass the actionDefinition in through
       * the constructor, so we make it a static property
       * of the newly created command class.
       */
      const commandId = `${actionDefinition.topicName}:${actionDefinition.commandName}`;
      const NewCommandClass = class extends TwilioApiCommand {};
      NewCommandClass.actionDefinition = actionDefinition;
      NewCommandClass.docLink = getDocLink(commandId);
      TwilioApiCommand.setUpNewCommandClass(NewCommandClass);
      return NewCommandClass;
    });
  }

  get hooks() {
    // This plugin doesn't introduce any other hooks. Return empty object.
    return {};
  }

  get topics() {
    return this.actions
      .filter((value, index, self) => self.findIndex((a) => a.topicName === value.topicName) === index) // Uniques
      .map((a) => ({
        name: a.topicName,
        description: a.resource.description,
      }))
      .concat(this.domainTopics)
      .concat(this.versionTopics);
  }

  get commandIDs() {
    return this.actions.map((a) => [a.topicName, a.commandName].join(TOPIC_SEPARATOR));
  }
}

module.exports = function twilioApi() {
  const twilioApiPlugin = new TwilioRestApiPlugin(this.config);
  twilioApiPlugin.name = 'api-cli-commands';
  twilioApiPlugin.version = this.config.version;
  twilioApiPlugin.tag = 'latest';
  twilioApiPlugin.type = 'core';
  this.config.plugins.push(twilioApiPlugin);
  this.config.loadCommands(twilioApiPlugin);
  this.config.loadTopics(twilioApiPlugin);
};
