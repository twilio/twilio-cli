const os = require('os');
const _ = require('lodash');
const http = require('request');
const Q = require('q');
const Response = require('twilio/lib/http/response');
const Request = require('twilio/lib/http/request');
const pkg = require('../../package.json');

class CLIRequestClient {
  constructor(commandName, logger) {
    this.commandName = commandName;
    this.logger = logger;
  }

  /**
   * Make http request
   * @param {object} opts - The options argument
   * @param {string} opts.method - The http method
   * @param {string} opts.uri - The request uri
   * @param {string} [opts.username] - The username used for auth
   * @param {string} [opts.password] - The password used for auth
   * @param {object} [opts.headers] - The request headers
   * @param {object} [opts.params] - The request params
   * @param {object} [opts.data] - The request data
   * @param {int} [opts.timeout=30000] - The request timeout in milliseconds
   * @param {boolean} [opts.allowRedirects] - Should the client follow redirects
   * @param {boolean} [opts.forever] - Set to true to use the forever-agent
   */
  request(opts) {
    opts = opts || {};
    if (!opts.method) {
      throw new Error('http method is required');
    }

    if (!opts.uri) {
      throw new Error('uri is required');
    }

    const deferred = Q.defer();
    const headers = opts.headers || {};

    if (!headers.Connection && !headers.connection) {
      headers.Connection = 'close';
    }

    let b64Auth = null;
    if (opts.username && opts.password) {
      b64Auth = Buffer.from(opts.username + ':' + opts.password).toString('base64');
      headers.Authorization = 'Basic ' + b64Auth;
    }

    const componentInfo = headers['User-Agent']
      .replace(' (', '|')
      .replace(')', '')
      .split('|');
    componentInfo.push(os.platform() + ' ' + os.release() + ' ' + os.arch());
    componentInfo.push(this.commandName);
    headers['User-Agent'] = pkg.name + '/' + pkg.version + ' (' + componentInfo.join(', ') + ')';

    const options = {
      timeout: opts.timeout || 30000,
      followRedirect: opts.allowRedirects || false,
      url: opts.uri,
      method: opts.method,
      headers,
      forever: opts.forever !== false
    };

    this.logger.debug('-- BEGIN Twilio API Request --');
    this.logger.debug(options.method + ' ' + options.url);

    if (!_.isNull(opts.data)) {
      options.formData = opts.data;
      if (options.formData) {
        this.logger.debug('Form data:');
        this.logger.debug(options.formData);
      }
    }

    if (!_.isNull(opts.params)) {
      options.qs = opts.params;
      options.useQuerystring = true;
      if (options.qs && Object.keys(options.qs).length > 0) {
        this.logger.debug('Querystring:');
        this.logger.debug(options.qs);
      }
    }
    this.logger.debug('User-Agent: ' + options.headers['User-Agent']);
    this.logger.debug('-- END Twilio API Request --');

    const optionsRequest = {
      method: options.method,
      url: options.url,
      auth: b64Auth,
      params: options.qs,
      data: options.formData,
      headers: options.headers
    };

    const that = this;
    this.lastResponse = undefined;
    this.lastRequest = new Request(optionsRequest);

    http(options, (error, response) => {
      if (error) {
        that.lastResponse = undefined;
        deferred.reject(error);
      } else {
        that.lastResponse = new Response(response.statusCode, response.body);
        deferred.resolve({
          statusCode: response.statusCode,
          body: response.body
        });
      }
    });

    return deferred.promise;
  }
}

module.exports = CLIRequestClient;
