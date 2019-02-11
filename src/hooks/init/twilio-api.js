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
    const resource = this.apiBrowser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'];
    return [{ name: 'call', description: resource.description }];
  }

  get commandIDs() {
    // TODO: Hard-coding one resource/action for now.
    return ['call:create'];
  }

  get commands() {
    const commands = [];

    // TODO: Hard-coding one resource/action for now.
    const resource = this.apiBrowser.domains.api.versions.v2010.resources['/Accounts/{AccountSid}/Calls'];
    const action = resource.actions.create;
    const cmd = class extends TwilioClientCommand {
      async run() {
        await super.run();
        const { flags } = this.parse(cmd);

        Object.keys(flags).forEach(key => {
          if (Object.prototype.hasOwnProperty.call(cmd.flags[key], 'x-schema')) {
            const schema = cmd.flags[key]['x-schema'];
            // TODO: Run param validation for minLength, maxLength, and pattern
            this.logger.debug(`Schema for ${key}: ` + JSON.stringify(schema));
          }
        });

        this.logger.info('TODO: Implement the API call based on provided flags.');
        this.logger.debug('Provided flags: ' + JSON.stringify(flags));
      }
    };

    // Parameters
    const cmdFlags = {};
    action.parameters.forEach(p => {
      const flagName = kebab(p.name);
      const flagConfig = {
        description: p.description,
        required: flagName === accountSidFlag ? false : p.required, // AccountSid not required, we can stuff from project
        multiple: p.schema.type === 'array',
        'x-schema': p.schema
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
