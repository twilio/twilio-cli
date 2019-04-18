
# twilio-cli Cookbook

At this stage in the `twilio-cli`, we have exposed commands that mirror the Twilio API. As a result, you may have to execute multiple commands to satisfy a use case. We created this cookbook to share recipies of how to accomplish certain use cases with the CLI.

## Recipe 1: Purchase a phone number

```twilio api:v2010:accounts:available-phone-numbers:local:list --area-code="209" --country-code US -o json```

(This command currently throws an error claiming a missing sid)

Then, once you find the desired number, execute:
```twilio api:v2010:accounts:incoming-phone-numbers:create --phone-number="+12095551212"```
