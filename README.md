# A CLI for Twilio

[![npm version](https://badge.fury.io/js/twilio-cli.svg)](https://badge.fury.io/js/twilio-cli)
[![Travis Build Status](https://travis-ci.com/twilio/twilio-cli.svg?token=8pBrDtYneMQqFq8wVpYP&branch=master)](https://travis-ci.com/twilio/twilio-cli)[![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/48hf89rslhjhn7ca?svg=true)](https://ci.appveyor.com/project/TwilioAPI/twilio-cli)[![codecov](https://codecov.io/gh/twilio/twilio-cli/branch/master/graph/badge.svg)](https://codecov.io/gh/twilio/twilio-cli)

## ⚠⚠⚠⚠ Pre-release software warning ⚠⚠⚠⚠

This software is in pre-release status and not currently supported. We are looking for community feedback on what type of CLI tool would be the most useful for Twilio users.

⚠⚠⚠⚠

## Prerequisites

1. [Node.js](https://nodejs.org/) >= 8.0
1. Running on Linux? Depending on your distribution, you will need to run the following command: <br>
   **Debian/Ubuntu**: `sudo apt-get install libsecret-1-dev` <br>
   **Red Hat-based**: `sudo yum install libsecret-devel` <br>
   **Arch Linux**: `sudo pacman -S libsecret`

Eventually, the plan is to have self-contained packages for \*nix systems and an installer for Windows with no need for manually installing prerequisites.

## Setup

You can install `twilio-cli` via [npm](https://www.npmjs.com/get-npm) or [Homebrew](https://brew.sh) (macOS or Linux).

### NPM

1. Install the CLI globally: `npm install -g twilio-cli`
1. Now you can run the CLI from anywhere using the `twilio` command.

### Homebrew

1. `brew tap twilio/brew && brew install twilio`
1. Now you can run the CLI from anywhere using the `twilio` command.

### Troubleshooting

* [Resolving EACCES permissions errors when installing packages globally](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

### Updating

1. Check if there's a new version: `npm outdated -g twilio-cli`
1. Update the CLI globally: `npm update -g twilio-cli`

## Versioning

`twilio-cli` uses a modified version of [Semantic Versioning](https://semver.org) for all changes. [See this document](VERSIONS.md) for details.

## Basic usage

### Step 1 - Login (aka add a project)

```
twilio login
```

This is for caching your credentials for your _existing_ Twilio account (aka Project) locally. You will be prompted for a shorthand identifier for your Twilio project. This is referred to as the "project ID", which is just an easy to remember, short string to identify the project. (If you've used `git` before, it's like the name you assign to a remote like "origin".)

Note, while you are prompted for your Account SID and Auth Token, these are not saved. An API Key is created (look for "twilio-cli for [username] on [hostname]" in the console) and stored in your system's keychain.

For details on how to work with multiple Twilio accounts/projects or use environment variables, see the [projects](#projects) section.

### Step 2 - Explore

```
twilio
```

Lists all available commands.

```
twilio phone-numbers:list
```

Lists all your phone numbers.

Add `--help` to any command to get help (e.g. `twilio phone-numbers:list --help`)

### Webhooks

You can set a webhook on a phone number like so:

```
twilio phone-numbers:update [PN sid or E.164] --sms-url http://url
```

That sets the primary SMS url. There are also options for setting the voice url, fallback urls, and methods for each. Run `twilio phone-numbers:update --help` for a full list of options.

### Ngrok integration

When you set a webhook, if you specify a URL that uses the host name of `localhost` or `127.0.0.1`, the twilio-cli will automatically create an ngrok tunnel for you and set your webhook to the new ngrok URL. For example:

```
twilio phone-numbers:update [PN sid or E.164] --sms-url http://localhost:5000/handle_sms
```

### Output formats

All command output is sent to `stdout` (whereas [logging messages](#Loggingmessages) are sent to `stderr`).

By default, the output is formatted in human readable form in a columnar format like so:

```
SID                                 Phone Number  Friendly Name
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209242XXXX  SIP testing
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1646887XXXX  Congress hotline
PNxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +1209337XXXX  DAVID'S TWILIO CONTACT
```

Many `list` commands will allow you to specify a `--properties` option to specify which columns you'd like to display. For example, to display only the Phone Number and SMS Url columns, you would pass `--properties "phoneNumber, smsUrl"`.

Note that the default list of properties varies by command and is subject to change with each release. Use the `--properties` option to explicitly control which columns to output.

Also note that the column names must match the JSON property names in the Twilio API.

#### JSON output format

On _any_ command, you can add `-o json` to change the output format to JSON. When you choose JSON, the command will send the _entire API response_ to `stdout` as JSON. You can then pipe to tools like [jq](https://stedolan.github.io/jq/) to parse the JSON.

#### Tab separated values

To change the output format to tab separated values (TSV), add `-o tsv` to the command line. This format is useful for loading into spreadsheets or for other machine processing. Like the default, columnar output format, you can use the `--properties` option to specify which columns you would like included.

### Logging messages

All debug, informational, warning, and error information is sent to `stderr`. This is so it can be easily separated from the command output. You can decide what level of logging you'd like by using the `-l` option. The valid levels of logging messages are `debug`, `info`, `warn`, `error`, and `none`.

## Projects

### Multiple Twilio accounts/projects

When you run `twilio login` (an alias for `twilio projects:add`), it stores your credentials and associates them with the provided project ID. The first project added will default to being the "active" project. The active project is used for all subsequent commands.

To add additional projects, run `twilio login` again but provide a different project ID (like, `my_other_proj`). Then, when you run subsequent commands, just include `-p my_other_proj` in the command (e.g. `twilio phone-numbers:list -p my_other_proj`).

Alternatively, you may switch which project is active using the `twilio projects:use` command. To see the full list of local projects (including which project is active), run `twilio projects:list`.

### Want to use environment variables instead of creating a project?

You can also use credentials stored in environment variables:

#### OPTION 1 (recommended)
* `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
* `TWILIO_API_KEY` = an API Key created in [your console](https://twil.io/get-api-key)
* `TWILIO_API_SECRET` = the secret for the API Key (you would have received this when you created an API key)

#### OPTION 2
* `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
* `TWILIO_AUTH_TOKEN` = your Auth Token from [your console](https://www.twilio.com/console)

_NOTE: Option 2 should only be used in cases where you are unable to make use of option 1 (which are uncommon)._

### Precedence of stored credentials

The CLI will attempt to load credentials in the following order of priority:

1. From the project specified with the `-p` parameter
1. From environment variables, if set
1. From the active project

## Plugins

twilio-cli can be extended via plugins.  

At this time, only two plugins exist:

* [twilio-run plugin](https://github.com/twilio-labs/plugin-serverless): To streamline your Twilio Functions development workflow, [Dominik Kundel](https://github.com/dkundel) created `twilio-run`. You can use twilio-run from within twilio-cli via [the twilio-run plugin](https://github.com/twilio-labs/plugin-serverless).  

* [twilio debugger plugin](https://github.com/twilio/plugin-debugger): The debugger plugin will display Twilio Debugger logs directly in your terminal.

### Install a plugin

Plugins for the CLI can be installed using the `twilio plugins` command.

1. Install the plugin by it's package name:

    ```
    twilio plugins:install @twilio/plugin-debugger
    ```

1. Now, you can run your plugin command from the cli:

    ```
    twilio debugger:logs:list --help
    ```

1. Note: if you're using autocomplete [see below](#autocomplete), you'll need to run `twilio autocomplete` after installing a plugin and open a new terminal window.  The cli needs to re-build it's cache.

### Create a plugin

Want to write your own plugin? [See this document](docs/plugins.md).

### Autocomplete

To enable autocomplete of CLI commands in bash or zsh, run:

```
twilio autocomplete
```

And follow the instructions.

## Contributing

1. Clone [this repo](https://github.com/twilio/twilio-cli).
1. From the repo directory, run: `npm install`
1. Run `./bin/run` from the repo directory to run the CLI.

## Feedback

Please file a GitHub issue in this repository for any feedback you may have.

## License

MIT
