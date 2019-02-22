const fakeResource = {
  actions: {
    create: {
      description: 'Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections',
      parameters: [
        {
          name: 'AccountSid',
          in: 'path',
          description: null,
          required: true,
          schema: { type: 'string', minLength: 34, maxLength: 34, pattern: '^AC[0-9a-fA-F]{32}$' }
        },
        {
          name: 'To',
          in: 'query',
          description: 'Phone number, SIP address, or client identifier to call',
          required: true,
          schema: { type: 'string' }
        },
        {
          name: 'From',
          in: 'query',
          description: 'Twilio number from which to originate the call',
          required: true,
          schema: { type: 'string' }
        },
        {
          name: 'Method',
          in: 'query',
          description: 'HTTP method to use to fetch TwiML',
          required: false,
          schema: {
            type: 'string',
            enum: ['head', 'get', 'post', 'patch', 'put', 'delete', 'HEAD', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE']
          }
        },
        {
          name: 'FallbackUrl',
          in: 'query',
          description: 'Fallback URL in case of error',
          required: false,
          schema: { type: 'string', format: 'uri' }
        },
        {
          name: 'FallbackMethod',
          in: 'query',
          description: 'HTTP Method to use with FallbackUrl',
          required: false,
          schema: {
            type: 'string',
            enum: ['head', 'get', 'post', 'patch', 'put', 'delete', 'HEAD', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE']
          }
        },
        {
          name: 'StatusCallback',
          in: 'query',
          description: 'Status Callback URL',
          required: false,
          schema: { type: 'string', format: 'uri' }
        },
        {
          name: 'StatusCallbackEvent',
          in: 'query',
          description: 'The call progress events that Twilio will send webhooks on.',
          required: false,
          schema: { type: 'array', items: { type: 'string' } }
        },
        {
          name: 'StatusCallbackMethod',
          in: 'query',
          description: 'HTTP Method to use with StatusCallback',
          required: false,
          schema: {
            type: 'string',
            enum: ['head', 'get', 'post', 'patch', 'put', 'delete', 'HEAD', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE']
          }
        },
        { name: 'SendDigits', in: 'query', description: 'Digits to send', required: false, schema: { type: 'string' } },
        { name: 'IfMachine', in: 'query', description: null, required: false, schema: { type: 'string' } },
        {
          name: 'Timeout',
          in: 'query',
          description: 'Number of seconds to wait for an answer',
          required: false,
          schema: { type: 'integer' }
        },
        {
          name: 'Record',
          in: 'query',
          description: 'Whether or not to record the Call',
          required: false,
          schema: { type: 'boolean' }
        },
        {
          name: 'RecordingChannels',
          in: 'query',
          description: 'mono or dualSet this parameter to specify the number of channels in the final recording.',
          required: false,
          schema: { type: 'string' }
        },
        {
          name: 'RecordingStatusCallback',
          in: 'query',
          description: 'A URL that Twilio will send a webhook request to when the recording is available for access.',
          required: false,
          schema: { type: 'string' }
        },
        {
          name: 'RecordingStatusCallbackMethod',
          in: 'query',
          description: 'The HTTP method Twilio should use when requesting the `RecordingStatusCallback` URL.',
          required: false,
          schema: {
            type: 'string',
            enum: ['head', 'get', 'post', 'patch', 'put', 'delete', 'HEAD', 'GET', 'POST', 'PATCH', 'PUT', 'DELETE']
          }
        },
        { name: 'SipAuthUsername', in: 'query', description: null, required: false, schema: { type: 'string' } },
        { name: 'SipAuthPassword', in: 'query', description: null, required: false, schema: { type: 'string' } },
        {
          name: 'MachineDetection',
          in: 'query',
          description: 'Enable machine detection or end of greeting detection',
          required: false,
          schema: { type: 'string' }
        },
        {
          name: 'MachineDetectionTimeout',
          in: 'query',
          description: 'Number of miliseconds to wait for machine detection',
          required: false,
          schema: { type: 'integer' }
        },
        {
          name: 'RecordingStatusCallbackEvent',
          in: 'query',
          description:
            'The recording status changes that Twilio will send webhooks on to the URL specified in RecordingStatusCallback.',
          required: false,
          schema: { type: 'array', items: { type: 'string' } }
        },
        {
          name: 'Trim',
          in: 'query',
          description: 'Set this parameter to control trimming of silence on the recording.',
          required: false,
          schema: { type: 'string' }
        },
        {
          name: 'CallerId',
          in: 'query',
          description:
            'The phone number, SIP address, or Client identifier that made this Call. Phone numbers are in E.164 format (e.g., +16175551212). SIP addresses are formatted as `name@company.com`.',
          required: false,
          schema: { type: 'string' }
        },
        {
          name: 'Url',
          in: 'query',
          description: 'Url from which to fetch TwiML',
          required: false,
          schema: { type: 'string', format: 'uri' }
        },
        {
          name: 'ApplicationSid',
          in: 'query',
          description: 'ApplicationSid that configures from where to fetch TwiML',
          required: false,
          schema: { type: 'string', minLength: 34, maxLength: 34, pattern: '^AP[0-9a-fA-F]{32}$' }
        }
      ],
      responses: {
        201: { content: { 'application/json': { schema: { $ref: '#/components/schemas/api.v2010.account.call' } } } }
      },
      security: [{ accountSid_authToken: [] }] // eslint-disable-line camelcase
    }
  },
  description: 'TODO: Resource-level docs'
};

/* eslint-disable camelcase */
// Twilio resource JSON uses snake_case. Tell eslint this is OK.
const fakeCallResponse = {
  answered_by: null,
  price_unit: 'USD',
  parent_call_sid: null,
  caller_name: null,
  group_sid: null,
  duration: null,
  from: '+15555555555',
  to: '+14155555555',
  annotation: null,
  date_updated: null,
  sid: 'CA1234567890abcdef1234567890abcdef',
  price: null,
  api_version: '2010-04-01',
  status: 'queued',
  direction: 'outbound-api',
  start_time: null,
  date_created: null,
  from_formatted: '(555) 555-5555',
  forwarded_from: null,
  uri: '/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Calls/CA1234567890abcdef1234567890abcdef.json',
  account_sid: 'AC1234567890abcdef1234567890abcdef',
  end_time: null,
  to_formatted: '(415) 555-5555',
  phone_number_sid: 'PN1234567890abcdef1234567890abcdef',
  subresource_uris: {
    notifications:
      '/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Calls/CA1234567890abcdef1234567890abcdef/Notifications.json',
    recordings:
      '/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Calls/CA1234567890abcdef1234567890abcdef/Recordings.json',
    feedback:
      '/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Calls/CA1234567890abcdef1234567890abcdef/Feedback.json',
    feedback_summaries: '/2010-04-01/Accounts/AC1234567890abcdef1234567890abcdef/Calls/FeedbackSummary.json'
  }
};
/* eslint-enable camelcase */

module.exports = {
  fakeResource,
  fakeCallResponse
};
