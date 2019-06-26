twilio-cli changelog
=====================

[2019-06-26] Version 1.3.0
---------------------------
**Library**
- [PR #41](https://github.com/twilio/twilio-cli/pull/41): Add command to remove a project. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
- [PR #43](https://github.com/twilio/twilio-cli/pull/43): Fix kebab case function to handle names with digits. Thanks to [@maylonpedroso](https://github.com/maylonpedroso)!
- [PR #44](https://github.com/twilio/twilio-cli/pull/44): Make link to plugins doc absolute. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #42](https://github.com/twilio/twilio-cli/pull/42): Extract general usage doc. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #38](https://github.com/twilio/twilio-cli/pull/38): Add commands to buy phone numbers. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #40](https://github.com/twilio/twilio-cli/pull/40): Add oclif pack/publish configuration. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #39](https://github.com/twilio/twilio-cli/pull/39): Include welcome.js in package. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Autopilot**
- Adds two new properties in Assistant i.e needs_model_build and development_stage

**Preview**
- Changed phone numbers from _URL|Path_ to `X-XCNAM-Sensitive` headers **(breaking change)**

**Verify**
- Add `MessagingConfiguration` resource to verify service


[2019-06-12] Version 1.2.0
---------------------------
**Note:** This release contains breaking changes, check our [upgrade guide](./UPGRADE.md#2019-06-12-11x-to-12x) for detailed migration notes.

**Library**
- [PR #37](https://github.com/twilio/twilio-cli/pull/37): breaking: Move the config directory to '.twilio-cli'. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**
- [PR #34](https://github.com/twilio/twilio-cli/pull/34): Switch the 'project' topic to 'projects'. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #35](https://github.com/twilio/twilio-cli/pull/35): Make the API plugin init synchronous so other hook processors can be run after. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #36](https://github.com/twilio/twilio-cli/pull/36): Switch the 'incoming-phone-number' topic to 'phone-numbers'. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #33](https://github.com/twilio/twilio-cli/pull/33): Allow the negated option for API command boolean flags. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #32](https://github.com/twilio/twilio-cli/pull/32): Add checklist item for non-twilio contributors. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #31](https://github.com/twilio/twilio-cli/pull/31): Updated installation instructions, adding Homebrew. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #30](https://github.com/twilio/twilio-cli/pull/30): Copy flags and args from 'project:add' to 'login' command. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #29](https://github.com/twilio/twilio-cli/pull/29): Update readme to reflect changes with use command. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
- [PR #28](https://github.com/twilio/twilio-cli/pull/28): adding the use command and the active projects column to the list com…. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
- [PR #25](https://github.com/twilio/twilio-cli/pull/25): Improve Getting Started Experience. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #27](https://github.com/twilio/twilio-cli/pull/27): Have Zork use plugin installer to pull down zorkjs package. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #26](https://github.com/twilio/twilio-cli/pull/26): Spit out a warning when plugins have conflicting commands or aliases. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Autopilot**
- Add Webhooks resource to Autopilot Assistant.

**Flex**
- Added missing 'custom' type to Flex Flow
- Adding `integrations` to Flex Configuration

**Insights**
- Added attributes to summary.

**Messaging**
- Message API Create updated with conditional params **(breaking change)**

**Proxy**
- Document that Proxy will return a maximum of 100 records for read/list endpoints **(breaking change)**
- Remove non-updatable property parameters for Session update (mode, participants) **(breaking change)**

**Sync**
- Added reachability debouncing configuration options.

**Verify**
- Add `RateLimits` and `Buckets` resources to Verify Services
- Add `RateLimits` optional parameter on `Verification` creation.


[2019-05-29] Version 1.1.2
---------------------------
**Verify**
- Add `approved` to status enum


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
