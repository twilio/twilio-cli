# Twilio CLI Comprehensive Document

[Open-source repo and usage instructions](https://github.com/twilio/twilio-cli).

# Architecture

![](/assets/images/CLI_overview.jpg)

## Technology

Twilio CLI is built with the [oclif (v2)](https://oclif.io/) CLI framework for Node.js (v14 or higher) using the [“multi-command”](https://oclif.io/docs/multi) CLI template. 

The oclif framework [documentation](https://oclif.io/docs/introduction) has a general overview of the framework architecture, so this document will focus on the architecture-specific to the Twilio CLI.

## Commands

Every command is a class in the Node.js project, each class occupying a single source file in the src/commands folder. For commands nested inside a topic, the topic is simply another folder under the src/commands folder.

### Examples

- The implementation of the command “twilio zork” (notice no topic name) can be found at src/commands/zork.js.
- The implementation of the command “twilio profile:add” (the topic being “profile”) can be found at src/commands/profile/add.js.
- More [Twilio CLI Command examples](https://www.twilio.com/docs/twilio-cli/examples)

### Command class hierarchy

Every command class will inherit from the BaseCommand class, which provides the shared functionality of logging, output formats, and configuration. 

Most commands will inherit from a child class of BaseCommand called TwilioClientCommand. This base class adds the notion of a Twilio “profile” and uses stored credentials to those profiles to access Twilio APIs. The Sendgrid commands will directly inherit from the BaseCommand. 

![](/assets/images/class_cmd_hierarchy.jpg) 

### Customizing the command behavior

When a dynamic command to make an API call (e.g. “calls:create”) is made available, it just provides the minimal functionality to invoke that API command. There may be instances where we’d like to provide additional functionality as “icing on the cake” when making that API call (see examples in “Functional overview”).

To allow for this, the architecture needs to allow for “API extenders”, which can be classes that can hook into the various lifecycle events of the dynamic API calls.

![](/assets/images/Customizing_the_command_behavior.jpg)

### Hooks

These are lifecycle events exposed by [oclif](https://oclif.io/docs/hooks). We leverage both built-in events and custom events.

## Services

Services can be found in the src/services folder and are designed to provide functionality for various internal concerns. Configuration, logging, secure credential storage, output formats, and so on can all be found here. Services are exposed as classes in JavaScript modules and referenced as such using require().

Many command classes will accept an instance of a service in their constructor. If left undefined, the command will create a new instance of the needed service, but allowing these dependencies to be injected like this allows alternate or mock implementations to be injected during testing. It’s not a full DI framework but offers some testing benefits.


## Integration with Twilio Open API Specification

The CLI is intended to be open-source, so we need an API specification that is suitable for the public that the CLI can consume. To provide full coverage of all Twilio APIs in the CLI, the project leverages the [Twilio Open API Specification](https://github.com/twilio/twilio-oai) to allow dynamic templating of each resource and action (mapping resources to topics and actions to commands).

Twilio Open API Specification is in [Open API v3](https://swagger.io/docs/specification/about/) format. Having our definitions in this format has long-term benefits such as automatic client library generation. Within the Open API document file will be a specification of every API resource, the actions that can be performed on them, and the parameters that can be passed.

The Open API document file is created at build time so that with each new release of the CLI, it is packaged with the most recent API definitions.

## Plugins

The oclif framework supports the notion of plugins. The Twilio CLI can be extended through plugins. Plugins will be a good way for us to deploy new CLI functionality that is still in developer preview or otherwise not stable as separate packages developers can opt into. You can publish your own plugins for the community or make them private for your own or your clients’ business workflows. 

### [Instructions to install a plugin](https://www.twilio.com/docs/twilio-cli/plugins)

### [Instructions to create a new plugin for the Twilio CLI](https://github.com/twilio/twilio-cli/blob/main/docs/plugins.md)

### External Plugins and their usage:

- @twilio-labs/[plugin-watch](https://github.com/twilio-labs/plugin-watch)
- @twilio-labs/[plugin-flex](https://github.com/twilio-labs/plugin-flex)
- @twilio-labs/[plugin-rtc](https://github.com/twilio-labs/plugin-rtc)
- @twilio-labs/[plugin-serverless](https://github.com/twilio-labs/plugin-serverless)
- @twilio-labs/[plugin-signal2020](https://github.com/twilio-labs/plugin-signal2020)
- @twilio-labs/[plugin-token](https://github.com/twilio-labs/plugin-token)
- @twilio-labs/[plugin-assets](https://github.com/twilio-labs/serverless-toolkit/tree/main/packages/plugin-assets)
- @dabblelab/[plugin-autopilot](https://github.com/dabblelab/twilio-cli-autopilot-plugin)

### Internal Plugins:

- [TwilioRestApiPlugin](https://github.com/twilio/twilio-cli/blob/main/src/hooks/init/twilio-api.js): Used to create CLI commands at runtime
- [TwilioBuyPhoneNumberPlugin](https://github.com/twilio/twilio-cli/blob/main/src/hooks/init/buy-phone-number.js): Plugin that helps users buy phone numbers using the CLI

## CLI vs CLI core

The Twilio CLI project is split into two repositories and the core functionality is found in another repository that we call the [CLI core](https://github.com/twilio/twilio-cli-core). This also helps with maintainability and ease of development. 

### CLI core

The CLI core houses the base commands and the services. The services included in this module are:
- Output formats: It takes a JSON array and writes to the stdout. Current formats include columns, JSON, and TSV. 
- Proxy usage
- API request logger(CliRequestClient)
- Config: Manages the CLI configuration options, such as Twilio profiles and credentials.
- Logger: Standardizes logging output of debug, info, warning, and error messages to stderr (all go to stderr to allow differentiation between command output and logging messages)
- SecureStorage: An abstraction around the keytar npm package which further abstracts platform-level data encryption services for storing Twilio credentials securely.

The rest of the functionality can be found in the [CLI repository](https://github.com/twilio/twilio-cli). 

## Build and distribution

We currently distribute the CLI via the following ways:

- [Npm](https://www.npmjs.com/package/twilio-cli)
- [Brew](https://github.com/twilio/homebrew-brew)
- [Scoop](https://github.com/twilio/scoop-twilio-cli/) 
- [Docker](https://hub.docker.com/r/twilio/twilio-cli)
- Platform-specific (macOS, Windows, Redhat/CentOS) [executables](https://github.com/twilio/twilio-cli/releases/)

## Release Process

We have a cloud solution in place that uses GitHub Actions for the release process. The workflow takes care of testing the CLI and generating all the executables. 

The CLI depends on both the Node.js helper library and the Open API specification. The version of the Node.js helper library is identical to the version used to produce the Open API specification. The CLI package is prepared after these two artifacts have been built.

# Functional Overview

## Twilio profiles and credentials

When using the CLI, users can cache their credentials for multiple Twilio profiles (i.e. account SIDs). Each profile needs to be given a shorthand name as per the users' discretion (e.g. “dev”, “stage”, “prod”, etc.) The shorthand name isn’t the same as the profile’s Friendly Name in the console, as these are usually not quick to type on a command line.

Profile configuration data is stored in ~/.twilio-cli (moved from the preferred ~/.config/twilio-cli).  We moved away from storing project configurations. To switch between multiple profiles a user can simply use the “twilio profiles:use” command. Profiles are the way to switch between multiple projects, and that really depends on how the user defines the project scope in each profile.

To get access to your Twilio resources, the CLI needs an API key to access it. Instead of asking the user to create an API key, however, we prompt them for their Account SID and Auth Token. Using these, we create an API key for them and save it directly in the config file instead of the system keychain (or whatever their operating system uses for secure password storage). This was done to support platforms without a keychain or similar services. We will make it clear to the user this key has been created for them and provide a link to view it in the console. This secure API Key and settings will be stored locally as a profile. The Account SID and Auth Token are not saved anywhere. We make this clear to the users. 

## Commands and topics

The Twilio CLI is a [“multi-command”](https://oclif.io/docs/multi) CLI in the same way that “git” is a multi-command CLI. This means you run “twilio <command>” to perform an operation, where <command> can be a single command like “help” or a topic + command combination like “incoming-phone-number:list”. Note the topic and command can be separated by a colon or a [space](https://github.com/oclif/oclif/issues/186).

Nesting commands under a topic are used to organize commands. The general relationship to the Twilio API Definitions is that a topic will correspond to a resource and the command corresponds to the action.

When operating on a particular type of resource (say the Message resource), then the topic might be “api:messaging:v1:services” and the available commands within that topic would be things like “create”, “fetch”, “list”, “update”, and “delete”. This means the full command for those would be things like “twilio api:messaging:v1:services:create”.

## Consuming Twilio Open API Specification

The [Twilio Open API Spec](https://github.com/twilio/twilio-oai) will be consumed by the CLI to create the vast majority of the commands available in the CLI, with the intention of full Twilio API coverage. This will include the documentation that is part of the specifications. See the architecture section for details on how this will be implemented.

These dynamically created commands can be augmented with additional functionality that is added to the CLI directly. For example, when fetching the details of a phone number, we may want to allow fetching by the phone number without needing the SID. Or, we might want to extend the “calls:create” command to specify the TwiML for the call on the command line.


## Command aliases

Commands can have aliases. For example, “login” is an alias for “profile:add” for adding a new profile to the CLI (see above discussion of profiles in the CLI context). Commonly used resources may have shorthand aliases to make commands terser.

## Documentation and help

The CLI is self-documenting. All topics, commands, and their possible parameters with a short description of each can be discovered from the CLI itself using the “--help” or "-h" flag. Topics and commands that correspond directly to resources and actions in API definitions will use the existing documentation present in the definitions. URLs to Twilio docs are present wherever official documentation is available.

![](/assets/images/help.png)

## Command output

All usable command output is sent to stdout. This would be the output directly related to the command the user runs (e.g. if you list phone numbers, the phone numbers are sent to stdout).

The format of the output can be controlled for commands that make API calls. Current output formats supported are:
- Columnar (table), human-readable format
- Raw JSON from the API response
- Tab-separated values (TSV)
- `--properties` option to specify which columns you'd like to display
  - This can be used with ‘list’, ‘fetch’ and ‘create’ commands. Note that the default list of properties varies by command and is subject to change with each release.
  - For example, to display only the Phone Number and SMS Url columns, you would pass `--properties "phoneNumber, smsUrl"`. 
  - The column names must match the JSON property names in the Twilio API.
- ‘–silent’ flag to suppress output and logs 

All debug, informational, warning, and error messages are sent to stderr. This allows the command output to be cleanly processed without additional textual messages getting in the way.

A log level can be set to indicate what level of messages you’d like sent to stderr. The default is “info”.

For any command that supports columnar and TSV output (any command that returns one or more resource objects), a list of properties can be specified to output. Each command should have a sane set of default columns for an 80 column terminal (e.g. the default display properties for incoming-phone-number are sid, phoneNumber, and friendlyName). 

It is also possible to remove headers using the “no-header” flag. 

![](/assets/images/command_output.png)

## Exit codes

The CLI should return a 0 exit code for successful operations. For failures, it can return the Twilio API [error code](https://www.twilio.com/docs/verify/api/v1/error-codes). For failures not related to a failed Twilio API call, we can create unique error codes for the various failure states. Unix-based systems only support 8-bit exit status codes. Twilio API errors codes are outside of this range and hence we only use the first 2 digits for the API error code.

## Command input

Typically, command input will be provided in the form of traditional Unix-style command line parameters, which means a single dash and single letter for shorthand notation or two dashes and kebab-case parameter names.

![](/assets/images/command_input.png)

### Examples

There is also support for piping. For example, you could find a phone number and purchase it, piping one command to the next:

![](/assets/images/command_input_example.png)

