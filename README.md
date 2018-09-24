# twilio-cli

[![Build Status](https://travis-ci.com/twilio/twilio-cli.svg?token=8pBrDtYneMQqFq8wVpYP&branch=master)](https://travis-ci.com/twilio/twilio-cli)

Super-early preview.

## Set up to explore

1. Clone the repo.
2. From the working directory, run `npm install`.
3. From the working directory, run `npm install . -g`.
4. Run `twilio` from anywhere to use the CLI.

### Running on Linux?

You may need to run the following to avoid errors during step 2 above:

```
sudo apt-get install -y libsecret-1-dev
```

## Set up for development

1. Clone the repo.
2. From the working directory, run `npm install`.
3. Edit the code (most is in the `src` folder).
4. Test by running `bin/run` instead of `twilio`

## Basic usage

### Step 1 - Login (aka add a project)

```
twilio login
```

which is an alias for:

```
twilio project:add -p default
```

### Step 2 - Explore

```
twilio
```

Lists all available commands.

```
twilio incoming-phone-number:list
```

Lists all your phone numbers.

Add `--help` to any command to get help (e.g. `twilio incoming-phone-number:list --help`)

```

```
