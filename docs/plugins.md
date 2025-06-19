# Creating Plugins for the twilio-cli

## 1. Familiarize yourself with the architecture and oclif

The twilio-cli is built using the [Open CLI Framework](https://oclif.io/) (oclif). It is using the "Multi-command" project type.
You will specifically want to review the docs:

- [Introduction](https://oclif.io/docs/introduction)
- [Topics](https://oclif.io/docs/topics)
- [Plugins](https://oclif.io/docs/plugins)

## 2. Adapt the starter repo (optional, but good for getting started)

Start by cloning [this repo of an example debugger plugin](https://github.com/twilio/plugin-debugger).

Once it's cloned, you can poke around to get a sense for the organization and even copy and adapt it for your own plugin use case.

Your plugin directory should follow the naming convention `plugin-<my-spectacular-plugin>`.

Remember to update the `package.json` fields if you start building your own plugin off of this one:
* name
* description
* homepage
* oclif["name"]
* topics

And run `npm install`.

## 3. Add your [topics](https://oclif.io/docs/topics) and [commands](https://oclif.io/docs/commands)

Commands go in the `src/commands` folder and should inherit from one of our command base classes.

### TwilioClientCommand

Inherit from `TwilioClientCommand` if your command will need to make Twilio API calls. You will be provided with a `this.twilioClient` to make API calls using the Node.js helper library for Twilio. The client object will already have the necessary credentials and account SID. Just start calling the API. You are also given an `this.httpClient` to make requests to other APIs, but you'll need to manage any necessary credentials yourself.

### TwilioBaseCommand

Inherit from `TwilioBaseCommand` if your command doesn't need to make any API calls.

### Naming
We recommend that you consider command naming diligently. It's possible to write a command that will collide with an existing command name. Additionally, we recommend starting your top-level command help with lower case to be consistent with the help that ships with twilio-cli.

Finally, the CLI will warn the user if the plugin is hosted outside of the [twilio](https://github.com/twilio) and [twilio-labs](https://github.com/twilio-labs) organizations.

### Flags

To create flags for your plugin, use the following import:
```js
const { Flags } = require('@oclif/core');
```
And define your flags like this:
```js
MySpectacularPlugin.flags = {
  ...TwilioClientCommand.flags,
  'fave-dessert': Flags.string({ description: 'Your favorite dessert', required: true }),
};
```

## 4. Test your plugin with the CLI

For local development, clone both the CLI and your plugin repositories. After running `npm install` in both, link your plugin to your local CLI using:

```
./bin/run plugins:link ../plugin-<my-spectacular-plugin>
```

or, if using npm scripts:

```
npm run plugins:link ../plugin-<my-spectacular-plugin>
```

Now, you can run your plugin command from the CLI:

```
twilio my-new-topic:my-new-command --help
```

## 5. Testing your plugin

Install the latest compatible version of `@oclif/test` for use with `@oclif/core@^4`:

```
npm install --save-dev @oclif/test
```

Refer to the [oclif test documentation](https://oclif.github.io/docs/testing/) for up-to-date testing patterns and helpers.

## 6. Publish your plugin to NPM

Once you have your plugin working, publish it to npmjs.org as a JavaScript package using `npm publish`. The `twilio plugins:install <npm package name>` command will download your package from NPM.

If you want to keep your package private, then you can run `npm pack` to create a tarball, host the tarball using a tool like [Twilio Assets](https://www.twilio.com/docs/runtime/assets), and distribute the URL to that tarball. Running `twilio plugins:install <url_to_package.tar.gz>` will install the plugin from the tarball file instead of looking on NPM.
