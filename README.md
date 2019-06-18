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

## General usage

See the [General usage guide](docs/general_usage.md).

## Contributing

1. Clone [this repo](https://github.com/twilio/twilio-cli).
1. From the repo directory, run: `npm install`
1. Run `./bin/run` from the repo directory to run the CLI.

## Feedback

Please file a GitHub issue in this repository for any feedback you may have.

## License

MIT
