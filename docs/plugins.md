# Creating Plugins for the twilio-cli

## 1. Familiarize yourself with the architecture and oclif

The twilio-cli is built using the [Open CLI Framework](https://oclif.io/) (oclif). It is using the "Multi-command" project type.
You will specifically want to review the docs:

- [Introduction](https://oclif.io/docs/introduction)
- [Topics](https://oclif.io/docs/topics)
- [Plugins](https://oclif.io/docs/plugins)
- [twilio-cli Design Doc](https://docs.google.com/document/d/1wGgJO_CmNIdbRYxhob3IF82TbNxl5MGKE_7mNGZncEs/edit)

## 2. Clone the starter repo

Start by cloning [this repo of an example plugin](https://code.hq.twilio.com/twilio/plugin-debugger).

## 3. Add your [topics](https://oclif.io/docs/topics) and [commands](https://oclif.io/docs/commands)

Commands go in the `src/commands` folder and should inherit from one of our command base classes.

## 4. Test your plugin with the CLI

Clone the main CLI repo (this repo) and [set it up](https://code.hq.twilio.com/twilio/cli).

"Install" the plugin referencing your plugin's local development folder like so:

```
./bin/run plugins:link ../plugin-<my-spectacular-plugin>
```

Run this command from the cli folder. This assumes the cli and your plugin folders are siblings of each other (perhaps in a `~/Projects` folder).

Now, you can run your plugin command from the cli:

```
./bin/run my-new-topic:my-new-command --help
```

### TwilioClientCommand

Inherit from `TwilioClientCommand` if your command will need to make Twilio API calls. You will be provided with a `this.twilioClient` to make API calls using the Node.js helper library for Twilio. The client object will already have the necessary credentials and account SID. Just start calling the API. You are also given an `this.httpClient` to make requests to other API's, but you'll need to manage any necessary credentials yourself.

### TwilioBaseCommand

Inherit from `TwilioBaseCommand` if your command doesn't need to make any API calls.