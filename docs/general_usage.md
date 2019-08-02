## Profiles

### Multiple Twilio accounts/profiles

When you run `twilio login` (an alias for `twilio profiles:add`), it stores your credentials and associates them with the provided profile ID. The first profile added will default to being the "active" profile. The active profile is used for all subsequent commands.

To add additional profiles, run `twilio login` again but provide a different profile ID (like, `my_other_profile`). Then, when you run subsequent commands, just include `-p my_other_profile` in the command (e.g. `twilio phone-numbers:list -p my_other_profile`).

Alternatively, you may switch which profile is active using the `twilio profiles:use` command. To see the full list of local profiles (including which profile is active), run `twilio profiles:list`.

### Want to use environment variables instead of creating a profile?

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

1. From the profile specified with the `-p` parameter
1. From environment variables, if set
1. From the active profile

## Special features

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

All command output is sent to `stdout` (whereas [logging messages](#logging-messages) are sent to `stderr`).

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

### Autocomplete

To enable autocomplete of CLI commands in bash or zsh, run:

```
twilio autocomplete
```

And follow the instructions.

## Sending Email with Twilio SendGrid

When you run `twilio email:send` you can send an email. You can use `twilio email:set` to set a default email address for the sender and default subject line. After you set those, `twilio email:send` will automatically use the default sending email address and subject line. To change the sending email address or subject line, you can either re-run `twilio email:set` or use the corresponding flag to set a new value for the item you want to change.

To send an email with an attachment run `twilio email:send` and wait to be prompted to add an attachment.
You can also use `twilio email:send --attachment=filePath` to attach a file.

To send the output of a different command as an email attachment, pipe the command to `twilio email:send`. If a default sending email address and subject line has been set the command will automatically use the defaults and you only need to include the `--text="email body text"`  and `--to=email@email.com`. If there is not a default subject line and sender’s email address all the flags need to be included to send the output of the piped command.

#### Pipe output to email example

```bash
ps -aux | twilio email:send \
  --from="me@example.com" \
  --to="me@example.com" \
  --subject="Current processes" \
  --text="See attachment"
```

## Plugins

twilio-cli can be extended via plugins.

At this time, the following plugins exist:

* [twilio serverless plugin](https://github.com/twilio-labs/plugin-serverless): To streamline your Twilio Functions development workflow, [Twilio Labs](https://github.com/twilio-labs/) created `twilio-run`. You can use twilio-run from within twilio-cli via [plugin-serverless](https://github.com/twilio-labs/plugin-serverless).

* [twilio watch plugin](https://github.com/twilio-labs/plugin-watch): Allows you to watch your live debugger alerts, voice calls, and messages as they come in, in real-time. 

* [twilio token plug](https://github.com/twilio-labs/plugin-token): Install and use this plugin to generate a token for use in a client-side SDK, e.g., a chat application.

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

1. Note: if you're using [autocomplete](#autocomplete), you'll need to run `twilio autocomplete` after installing a plugin and open a new terminal window. The cli needs to re-build it's cache.

### Create a plugin

Want to write your own plugin? [See this document](https://github.com/twilio/twilio-cli/blob/master/docs/plugins.md).
