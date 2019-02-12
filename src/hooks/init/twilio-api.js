const { flags } = require('@oclif/command');
const { Plugin } = require('@oclif/config');
const TwilioClientCommand = require('../../base-commands/twilio-client-command');
const { TwilioApiBrowser } = require('../../services/twilio-api');
const { kebabCase, camelCase } = require('../../services/namingConventions');

// Open API type to oclif flag type mapping
const typeMap = {
  boolean: flags.boolean,
  integer: flags.integer
};

// AccountSid is a special snowflake
const accountSidFlag = 'account-sid';

// Implement an oclif plugin that can provide dynamic commands at runtime.
class TwilioRestApiPlugin extends Plugin {
  constructor() {
    super();
    const apiBrowser = new TwilioApiBrowser();

    // TODO: Hard-coding one resource/action for now.
    const resourcePath = '/Accounts/{AccountSid}/Calls';
    const resource = apiBrowser.domains.api.versions.v2010.resources[resourcePath];
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

  async load() {
    await super.load();
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
    const commands = [];

    this.actions.forEach(a => {
      const domainName = a.domainName;
      const versionName = a.versionName;
      const currentPath = a.path;
      const resource = a.resource;
      const action = a.action;

      const cmd = class extends TwilioClientCommand {
        async run() {
          await super.run();
          const { flags } = this.parse(cmd);

          // TODO: Possible extender event: "beforeValidateParameters"

          Object.keys(flags).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(cmd.flags[key], 'apiDetails')) {
              const schema = cmd.flags[key].apiDetails.parameter.schema;
              // TODO: Run param validation for minLength, maxLength, and pattern
              this.logger.debug(`Schema for ${key}: ` + JSON.stringify(schema));
            }
          });

          this.logger.debug('Provided flags: ' + JSON.stringify(flags));

          // TODO: Possible extender event: "afterValidateParameters"

          // TODO: Possible extender event: "beforeInvokeApi"

          // This converts a path like "/Accounts/{AccountSid}/Calls" to
          // the Node.js object in the Twilio Helper library.
          // Example: twilioClient.api.v2010.accounts('ACxxxx').calls
          const helperVersion = this.twilioClient[domainName][versionName];
          const pathNodes = currentPath.split('/');
          pathNodes.splice(0, 1); // Remove first empty node
          let endpoint = helperVersion;
          pathNodes.forEach(pathNode => {
            if (pathNode.startsWith('{')) {
              const paramName = kebabCase(pathNode.replace(/[\{\}]/g, ''));
              let value = '';
              if (Object.hasOwnProperty.call(flags, paramName)) {
                value = flags[paramName];
              } else if (paramName === accountSidFlag) {
                value = this.twilioClient.accountSid;
              }
              endpoint = endpoint(value);
            } else {
              endpoint = endpoint[camelCase(pathNode)];
            }
          });

          let response;

          try {
            const camelCasedFlags = {};
            Object.keys(flags).forEach(key => {
              camelCasedFlags[camelCase(key)] = flags[key];
            });
            response = await endpoint.create(camelCasedFlags);
          } catch (error) {
            this.logger.error(`Error response from Twilio: ${error.message}`);
            this.logger.info(`See ${error.moreInfo} for more info.`);
            this.exit(error.code);
          }

          // TODO: Figure out sane default output columns
          this.output([response], this.flags.properties);

          // TODO: Possible extender event: "afterInvokeApi"
        }
      };

      // Parameters
      const cmdFlags = {};
      const isApi2010 = domainName === 'api' && versionName === 'v2010';
      action.parameters.forEach(p => {
        const flagName = kebabCase(p.name);
        const flagConfig = {
          description: p.description,
          // AccountSid on api.v2010 not required, we can get from the current project
          required: flagName === accountSidFlag && isApi2010 ? false : p.required,
          multiple: p.schema.type === 'array',
          apiDetails: {
            parameter: p,
            action: action,
            resource: resource
          }
        };

        let flagType = flags.string;
        if (Object.prototype.hasOwnProperty.call(typeMap, p.schema.type)) {
          flagType = typeMap[p.schema.type];
        } else if (Object.prototype.hasOwnProperty.call(p.schema, 'enums')) {
          flagType = flags.enum;
          flagConfig.options = p.schema.enums
            .map(value => value.toLowerCase()) // standardize the enum values
            .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
        }

        cmdFlags[flagName] = flagType(flagConfig);
      });

      cmdFlags.properties = flags.string({
        default: 'sid',
        description: 'The properties you would like to display (JSON output always shows all properties)'
      });

      // Class statics
      cmd.id = 'call:create'; // TODO: derive name from the resource definition
      cmd.args = [];
      cmd.flags = Object.assign(cmdFlags, TwilioClientCommand.flags);
      cmd.description = action.description;
      cmd.load = () => cmd;

      commands.push(cmd);
    });
    return commands;
  }
}

module.exports = async function () {
  this.config.plugins.push(new TwilioRestApiPlugin(this.config));
};
