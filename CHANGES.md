twilio-cli changelog
=====================

[2019-05-15] Version 1.1.1
---------------------------
**Library**
- [PR #24](https://github.com/twilio/twilio-cli/pull/24): Prompt for project name if not provided when adding a project. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #19](https://github.com/twilio/twilio-cli/pull/19): Move all API resources to under a single 'api' topic. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #23](https://github.com/twilio/twilio-cli/pull/23): Use the default output properties from the API definition. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #22](https://github.com/twilio/twilio-cli/pull/22): Add versioning link and doc to README. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #21](https://github.com/twilio/twilio-cli/pull/21): Prompt user when creating default project with env vars set. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #20](https://github.com/twilio/twilio-cli/pull/20): Use env vars first for credentials if no project is specified. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Video**
- [Rooms] Add Video Subscription API

**Wireless**
- Added `imei` to Data Session resource.


[2019-05-07] Version 1.1.0
---------------------------
**Library**
- [PR #18](https://github.com/twilio/twilio-cli/pull/18): Move plugin docs in README. Thanks to [@aroach](https://github.com/aroach)!
- [PR #17](https://github.com/twilio/twilio-cli/pull/17): Support enum flags of varying case. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #16](https://github.com/twilio/twilio-cli/pull/16): Add setup troubleshooting. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #15](https://github.com/twilio/twilio-cli/pull/15): Badge link to npm package. Thanks to [@alexdlaird](https://github.com/alexdlaird)!
- [PR #14](https://github.com/twilio/twilio-cli/pull/14): Add project region support. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make `method` optional for queue members update

**Chat**
- Removed `webhook.*.format` update parameters in Service resource from public library visibility in v1 **(breaking change)**

**Insights**
- Added client metrics as sdk_edge to summary.
- Added optional query param processing_state.

**Numbers**
- Add addtional metadata fields on a Document
- Add status callback fields and parameters

**Serverless**
- Documentation

**Taskrouter**
- Added `channel_optimized_routing` attribute to task-channel endpoint

**Wireless**
- Remove `imeisv` from Data Session resource. **(breaking change)**


[2019-04-29] Version 1.0.0
----------------------------

Moving all related CLI libs to v1.0.0 per npm semver recommendation.

[2019-04-29] Version 0.1.2
----------------------------

* Moved config from `~/.config/@twilio/cli` (Unix) and `%LOCALAPPDATA%\@twilio\cli` (Windows) to `~/.twilio` and `%USERPROFILE%\.twilio`, respectively.

To copy over your existing configuration, run the following commands (Unix):
```
mkdir ~/.twilio
cp ~/.config/@twilio/cli/config.json ~/.twilio/config.json
```

* Added [autocomplete support](README.md#autocomplete)
* Added support for [credentials in environment variables](README.md#want-to-use-environment-variables-instead-of-creating-a-project)
