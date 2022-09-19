const querystring = require('querystring');

const { Flags: oclifFlags } = require('@oclif/core');
const { TwilioClientCommand } = require('@twilio/cli-core').baseCommands;
const { TwilioCliError } = require('@twilio/cli-core').services.error;
const { sleep } = require('@twilio/cli-core').services.JSUtils;

const STREAMING_DELAY_IN_SECONDS = 1;
const STREAMING_HISTORY_IN_MINUTES = 5;

class DebuggerLogsList extends TwilioClientCommand {
  constructor(argv, config, secureStorage) {
    super(argv, config, secureStorage);

    this.showHeaders = true;
    this.latestLogEvents = [];
  }

  async run() {
    await super.run();

    const props = this.parseProperties() || {};
    this.validatePropsAndFlags(props, this.flags);

    // Get any historical data first.
    const logEvents = await this.getLogEvents(props);
    this.outputLogEvents(logEvents);

    // Then get streaming data.
    /* eslint-disable no-await-in-loop */
    while (this.flags.streaming) {
      await sleep(STREAMING_DELAY_IN_SECONDS * 1000);

      /*
       * If streaming, just look at the last X minutes. This allows for delayed
       * events to show up.
       */
      props.startDate = new Date(new Date() - STREAMING_HISTORY_IN_MINUTES * 60 * 1000);
      props.endDate = undefined; // Eh, why not?

      const events = await this.getLogEvents(props);
      this.outputLogEvents(events);
    }
  }

  validatePropsAndFlags(props, flags) {
    if (flags.streaming) {
      if (props.startDate && new Date(props.startDate) > new Date()) {
        throw new TwilioCliError('"streaming" flag does not support a future "start-date" value');
      }

      if (props.endDate) {
        throw new TwilioCliError('"streaming" flag does not support the "end-date" option');
      }
    }
  }

  async getLogEvents(props) {
    const logEvents = await this.twilioClient.monitor.alerts.list(props);

    return this.filterLogEvents(logEvents);
  }

  filterLogEvents(logEvents) {
    const previousLogEvents = new Set(this.latestLogEvents);
    this.latestLogEvents = new Set(logEvents.map((event) => event.sid));

    /*
     * Filter out any events that we just saw, and then reverse them so they're
     * in ascending order.
     */
    return logEvents.filter((event) => !previousLogEvents.has(event.sid)).reverse();
  }

  outputLogEvents(logEvents) {
    if (logEvents.length > 0) {
      logEvents.forEach((e) => {
        e.alertText = this.formatAlertText(e.alertText);
      });
      this.output(logEvents, this.flags.properties, { showHeaders: this.showHeaders });
      this.showHeaders = false;
    }
  }

  formatAlertText(text) {
    try {
      const data = querystring.parse(text);
      return data.parserMessage || data.Msg || text;
    } catch (error) {
      return text;
    }
  }
}

DebuggerLogsList.description = `Show a list of log events generated for the account

Argg, this is only a subset of the log events and live tailing isn't quite ready! Think this is a killer feature? Let us know here: https://airtable.com/shrcFDU1gmKWOqZXe`;

DebuggerLogsList.PropertyFlags = {
  'log-level': oclifFlags.enum({
    options: ['error', 'warning', 'notice', 'debug'],
    description: 'Only show log events for this log level',
  }),
  'start-date': oclifFlags.string({
    description: 'Only show log events on or after this date',
  }),
  'end-date': oclifFlags.string({
    description: 'Only show log events on or before this date',
  }),
};

DebuggerLogsList.flags = {
  properties: oclifFlags.string({
    default: 'dateCreated, logLevel, errorCode, alertText',
    description: 'The event properties you would like to display (JSON output always shows all properties)',
  }),
  streaming: oclifFlags.boolean({
    char: 's',
    description: 'Continuously stream incoming log events',
  }),
  ...DebuggerLogsList.PropertyFlags,
  ...TwilioClientCommand.flags,
  ...TwilioClientCommand.noHeader,
};

module.exports = DebuggerLogsList;
