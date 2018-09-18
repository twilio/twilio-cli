# twilio-cli

Super-early preview.

## Set up to explore

1. Clone the repo.
2. From the working directory, run `npm install . -g`.
3. Run `twilio` from anywhere to use the CLI.

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
twilio incomingPhoneNumber:list
```

Lists all your phone numbers.

Add `--help` to any command to get help (e.g. `twilio incomingPhoneNumber:list --help`)
