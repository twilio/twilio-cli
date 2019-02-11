const { flags } = require('@oclif/command');
const { Plugin } = require('@oclif/config');
const TwilioClientCommand = require('../../base-commands/twilio-client-command');
const { TwilioApiBrowser } = require('../../services/twilio-api');
const kebab = require('../../services/kebab');

const typeMap = {
  boolean: flags.boolean,
  integer: flags.integer
};

const accountSidFlag = 'account-sid';

class TwilioRestApiPlugin extends Plugin {
  constructor() {
    super();
    this.apiBrowser = new TwilioApiBrowser();
  }

  async load() {
    await super.load();
  }

  get hooks() {
    return {};
  }

  get topics() {
    // TODO: Hard-coding one resource/action for now.
    const domainName = 'api';
    const versionName = 'v2010';
    const resource = this.apiBrowser.domains[domainName].versions[versionName].resources[
      '/Accounts/{AccountSid}/Calls'
    ];
    return [{ name: 'call', description: resource.description }];
  }

  get commandIDs() {
    // TODO: Hard-coding one resource/action for now.
    return ['call:create'];
  }

  get commands() {
    const commands = [];

    // TODO: Hard-coding one resource/action for now.
    const domainName = 'api';
    const versionName = 'v2010';
    const currentPath = '/Accounts/{AccountSid}/Calls';
    const resource = this.apiBrowser.domains[domainName].versions[versionName].resources[currentPath];
    const action = resource.actions.create;
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
            const paramName = kebab(pathNode.replace(/[\{\}]/g, ''));
            let value = '';
            if (Object.hasOwnProperty.call(flags, paramName)) {
              value = flags[paramName];
            } else if (paramName === accountSidFlag) {
              value = this.twilioClient.accountSid;
            }
            endpoint = endpoint(value);
          } else {
            // PascalCase to camelCase
            pathNode = pathNode.substring(0, 1).toLowerCase() + pathNode.substring(1);
            endpoint = endpoint[pathNode];
          }
        });

        let response;

        try {
          response = await endpoint.create(flags);
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
      const flagName = kebab(p.name);
      const flagConfig = {
        description: p.description,
        // AccountSid on api.v2010 not required, we can stuff from project
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
          .map(value => kebab(value)) // kebab-case the enum values
          .filter((value, index, self) => self.indexOf(value) === index); // remove duplicates
      }

      cmdFlags[flagName] = flagType(flagConfig);
    });

    cmdFlags.properties = flags.string({
      default: 'sid',
      description: 'The properties you would like to display (JSON output always shows all properties)'
    });

    // Class statics
    cmd.id = 'call:create';
    cmd.args = [];
    cmd.flags = Object.assign(cmdFlags, TwilioClientCommand.flags);
    cmd.description = action.description;
    cmd.load = () => cmd;

    commands.push(cmd);

    return commands;
  }
}

module.exports = async function () {
  this.config.plugins.push(new TwilioRestApiPlugin(this.config));
};
