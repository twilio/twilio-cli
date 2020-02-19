twilio-cli changelog
=====================

[2020-02-19] Version 1.9.6
--------------------------
**Api**
- Make call create parameters `async_amd`, `async_amd_status_callback`, and `async_amd_status_callback_method` public
- Add `trunk_sid` as an optional field to Call resource fetch/read responses
- Add property `queue_time` to successful response of create, fetch, and update requests for Call
- Add optional parameter `byoc` to conference participant create.

**Authy**
- Added support for challenges associated to push factors

**Flex**
- Adding `ui_dependencies` to Flex Configuration

**Messaging**
- Deprecate Session API **(breaking change)**

**Numbers**
- Add Regulations API

**Studio**
- Add Execution and Step endpoints to v2 API
- Add webhook_url to Flow response and add new /TestUsers endpoint to v2 API

**Taskrouter**
- Adding `longest_relative_task_age_in_queue` and `longest_relative_task_sid_in_queue` to TaskQueue Real Time Statistics API.
- Add `wait_duration_in_queue_until_accepted` aggregations to TaskQueues Cumulative Statistics endpoint
- Add TaskQueueEnteredDate property to Tasks.

**Video**
- [Composer] Clarification for the composition hooks creation documentation: one source is mandatory, either the `audio_sources` or the `video_layout`, but one of them has to be provided
- [Composer] `audio_sources` type on the composer HTTP POST command, changed from `sid[]` to `string[]` **(breaking change)**
- [Composer] Clarification for the composition creation documentation: one source is mandatory, either the `audio_sources` or the `video_layout`, but one of them has to be provided


[2020-02-05] Version 1.9.5
--------------------------
**Library - Docs**
- [PR #152](https://github.com/twilio/twilio-cli/pull/152): baseline all the templated markdown docs. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Fix**
- [PR #151](https://github.com/twilio/twilio-cli/pull/151): update travis build badge link. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Making content retention and address retention public
- Update `status` enum for Messages to include 'partially_delivered'

**Authy**
- Added support for push factors

**Autopilot**
- Add one new property in Query i.e dialogue_sid

**Verify**
- Add `SendCodeAttempts` to create verification response.

**Video**
- Clarification in composition creation documentation: one source is mandatory, either `audio_sources` or `video_layout`, but on of them has to be provided


[2020-01-23] Version 1.9.4
--------------------------
**Library - Fix**
- [PR #150](https://github.com/twilio/twilio-cli/pull/150): travis npm deploy. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2020-01-23] Version 1.9.3
--------------------------
**Api**
- Add payments public APIs
- Add optional parameter `byoc` to call create request.

**Flex**
- Updating a Flex Flow `creation_on_message` parameter documentation

**Preview**
-
- Removed Verify v2 from preview in favor of its own namespace as GA **(breaking change)**

**Studio**
- Flow definition type update from string to object

**Verify**
- Add `AppHash` parameter when creating a Verification.
- Add `DoNotShareWarningEnabled` parameter to the Service resource.


[2020-01-08] Version 1.9.2
--------------------------
**Numbers**
- Add Regulatory Compliance CRUD APIs

**Studio**
- Add parameter validation for Studio v2 Flows API


[2019-12-18] Version 1.9.1
--------------------------
**Library - Fix**
- [PR #144](https://github.com/twilio/twilio-cli/pull/144): rollback the lock file changes and remove the lock file during install. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Preview**
- Add `/Insights/SuccessRate` endpoint for Businesses Branded Calls (Verified by Twilio)

**Studio**
- StudioV2 API in beta

**Verify**
- Add `MailerSid` property to Verify Service resource.

**Wireless**
- Added `data_limit_strategy` to Rate Plan resource.


[2019-12-12] Version 1.9.0
--------------------------
**Library**
- [PR #143](https://github.com/twilio/twilio-cli/pull/143): fix: drop the lock file since it doesn't get published. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make `twiml` conditional for create. One of `url`, `twiml`, or `application_sid` is now required.
- Add `bundle_sid` parameter to /IncomingPhoneNumbers API
- Removed discard / obfuscate parameters from ContentRetention, AddressRetention **(breaking change)**

**Chat**
- Added `last_consumed_message_index` and `last_consumption_timestamp` parameters in update method for UserChannel resource **(breaking change)**

**Conversations**
- Add Participant SID to Message properties

**Messaging**
- Fix incorrectly typed capabilities property for ShortCodes. **(breaking change)**


[2019-12-04] Version 1.8.5
--------------------------
**Library**
- [PR #142](https://github.com/twilio/twilio-cli/pull/142): feat: add the official autopilot plugin to the trusted plugins list. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-11-22] Version 1.8.4
--------------------------
**Library**
- [PR #141](https://github.com/twilio/twilio-cli/pull/141): fix: Don't overwrite parameters when building request. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Allow Messaging Service update


[2019-11-21] Version 1.8.3
--------------------------
**Library**
- [PR #139](https://github.com/twilio/twilio-cli/pull/139): fix: eagerly load keytar during profile creation. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #140](https://github.com/twilio/twilio-cli/pull/140): fix: make ngrok an optional dependency since it is installed at runtime. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #138](https://github.com/twilio/twilio-cli/pull/138): fix: dynamically install ngrok and zork if needed. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Add optional `twiml` parameter for call create

**Chat**
- Added `delete` method in UserChannel resource

**Taskrouter**
- Support ReEvaluateTasks parameter on Workflow update


[2019-11-13] Version 1.8.2
--------------------------
**Api**
- Make `persistent_action` parameter public
- Add `twiml` optional private parameter for call create

**Autopilot**
- Add Export resource to Autopilot Assistant.

**Flex**
- Added Integration.RetryCount attribute to Flex Flow
- Updating a Flex Flow `channel_type` options documentation

**Insights**
- Added edges to events and metrics
- Added new endpoint definitions for Events and Metrics

**Messaging**
- **create** support for sender registration
- **fetch** support for fetching a sender
- **update** support for sender verification

**Supersim**
- Add `Direction` filter parameter to list commands endpoint
- Allow filtering commands list by Sim Unique Name
- Add `Iccid` filter parameter to list sims endpoint


[2019-11-01] Version 1.8.1
--------------------------
**Library**
- [PR #136](https://github.com/twilio/twilio-cli/pull/136): chore: update dependencies. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-10-30] Version 1.8.0
--------------------------
**Library**
- [PR #132](https://github.com/twilio/twilio-cli/pull/132): Support ngrok tunnels to https endpoints. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #133](https://github.com/twilio/twilio-cli/pull/133): truncate friendlyName at 64 chars. Thanks to [@eshanholtz](https://github.com/eshanholtz)!
- [PR #131](https://github.com/twilio/twilio-cli/pull/131): Include TQ badge. Thanks to [@kwhinnery](https://github.com/kwhinnery)!

**Api**
- Add new usage categories to the public api `sms-messages-carrierfees` and `mms-messages-carrierfees`

**Conversations**
- Add ProjectedAddress to Conversations Participant resource

**Preview**
- Implemented different `Sid` for Current Calls (Verified by Twilio), instead of relying in `Call.Sid` from Voice API team **(breaking change)**

**Supersim**
- Add List endpoint to Commands resource for Super Sim Pilot
- Add UsageRecords resource for the Super Sim Pilot
- Add List endpoint to UsageRecords resource for the Super Sim Pilot
- Allow assigning a Sim to a Fleet by Fleet SID or Unique Name for Super SIM Pilot
- Add Update endpoint to Fleets resource for Super Sim Pilot
- Add Fetch endpoint to Commands resource for Super Sim Pilot
- Allow filtering the Sims resource List endpoint by Fleet
- Add List endpoint to Fleets resource for Super Sim Pilot

**Wireless**
- Added `account_sid` to Sim update parameters.


[2019-10-17] Version 1.7.2
--------------------------
**Library**
- [PR #129](https://github.com/twilio/twilio-cli/pull/129): Remove matrix. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2019-10-17] Version 1.7.1
--------------------------
**Library**
- [PR #128](https://github.com/twilio/twilio-cli/pull/128): Update npm key. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #127](https://github.com/twilio/twilio-cli/pull/127): Skip cleanup on deploy. Thanks to [@thinkingserious](https://github.com/thinkingserious)!


[2019-10-17] Version 1.7.0
--------------------------
**Library**
- [PR #126](https://github.com/twilio/twilio-cli/pull/126): Rename 'profiles:add' to 'profiles:create'. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #124](https://github.com/twilio/twilio-cli/pull/124): Auto-deploy via Travis CI upon tagged commit to master. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #125](https://github.com/twilio/twilio-cli/pull/125): fix(chore): Fix error message when exceeding schema max items. Thanks to [@jamesgeorge007](https://github.com/jamesgeorge007)!

**Api**
- Add new property `attempt` to sms_messages
- Fixed a typo in the documentation for Feedback outcome enum **(breaking change)**
- Update the call price to be optional for deserializing **(breaking change)**

**Flex**
- Added `JanitorEnabled` attribute to Flex Flow
- Change `features_enabled` Flex Configuration key to private **(breaking change)**

**Supersim**
- Add Fetch endpoint to Fleets resource for Super Sim Pilot
- Allow assigning a Sim to a Fleet for Super Sim Pilot
- Add Create endpoint to Fleets resource for Super Sim Pilot


[2019-10-02] Version 1.6.1
--------------------------
**Library**
- [PR #121](https://github.com/twilio/twilio-cli/pull/121): Update and add Docker image deployment. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Add media to Conversations Message resource

**Supersim**
- Add List endpoint to Sims resource for Super Sim Pilot


[2019-09-18] Version 1.6.0
---------------------------
**Library**
- [PR #120](https://github.com/twilio/twilio-cli/pull/120): Enable npm auditing. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #118](https://github.com/twilio/twilio-cli/pull/118): Switch ngrok tunnels to use HTTPS endpoints. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Numbers**
- Add v2 of the Identites API

**Preview**
- Changed authentication method for SDK Trusted Comms endpoints: `/CPS`, `/CurrentCall`, and `/Devices`. Please use `Authorization: Bearer <xCNAM JWT>` **(breaking change)**

**Voice**
- Add Recordings endpoints


[2019-09-06] Version 1.5.1
---------------------------
**Library**
- [PR #116](https://github.com/twilio/twilio-cli/pull/116): Make the 'phone-numbers:update' command constructor more generic. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #115](https://github.com/twilio/twilio-cli/pull/115): Add 'target-account-sid' flag for transferring phone numbers. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #114](https://github.com/twilio/twilio-cli/pull/114): Add limit flags to all 'list' commands. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-09-04] Version 1.5.0
---------------------------
**Library**
- [PR #112](https://github.com/twilio/twilio-cli/pull/112): Upgrade to use the refactored cli-core. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #110](https://github.com/twilio/twilio-cli/pull/110): Add flag config utility for converting API params to CLI flags. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #109](https://github.com/twilio/twilio-cli/pull/109): Refactor the phone-number-buy tests to use the command class set up. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #108](https://github.com/twilio/twilio-cli/pull/108): Update the 'profile:use' command to use the new 'setActiveProfile' method. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
-  Pass Twiml in call update request

**Conversations**
- Add attributes to Conversations resources

**Flex**
- Adding `features_enabled` and `serverless_service_sids` to Flex Configuration

**Messaging**
- Message API required params updated **(breaking change)**

**Preview**
- Added support for the optional `CallSid` to `/BrandedCalls` endpoint


[2019-08-21] Version 1.4.2
---------------------------
**Library**
- [PR #103](https://github.com/twilio/twilio-cli/pull/103): Update feedback link. Thanks to [@aroach](https://github.com/aroach)!
- [PR #105](https://github.com/twilio/twilio-cli/pull/105): Check for empty props when looking for localhost callback flags. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #101](https://github.com/twilio/twilio-cli/pull/101): Documents known limitations. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #100](https://github.com/twilio/twilio-cli/pull/100): Add ngrok debugging, inspector URL, and port 80 handling. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #79](https://github.com/twilio/twilio-cli/pull/79): Add Date Inequality Support. Thanks to [@JenniferMah](https://github.com/JenniferMah)!
- [PR #95](https://github.com/twilio/twilio-cli/pull/95): Handle generic and complex ngrok errors. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Add Chat Conversation SID to conversation default output properties

**Flex**
- Adding `outbound_call_flows` object to Flex Configuration
- Adding read and fetch to channels API

**Supersim**
- Add Sims and Commands resources for the Super Sim Pilot

**Sync**
- Added configuration option for enabling webhooks from REST.

**Wireless**
- Added `usage_notification_method` and `usage_notification_url` properties to `rate_plan`.


[2019-08-05] Version 1.4.1
---------------------------
**Library**
- [PR #92](https://github.com/twilio/twilio-cli/pull/92): Documentation improvements. Thanks to [@dprothero](https://github.com/dprothero)!
- [PR #91](https://github.com/twilio/twilio-cli/pull/91): Remove pre-release warning. Thanks to [@aroach](https://github.com/aroach)!

**Conversations**
- Switch library_visibility to public for Conversations Resources


[2019-08-02] Version 1.4.0
---------------------------
**Library**
- [PR #90](https://github.com/twilio/twilio-cli/pull/90): Hide the ngrok warning after user acknowledgment. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #89](https://github.com/twilio/twilio-cli/pull/89): Add ngrok warning and prompt when creating phone number tunnels. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #87](https://github.com/twilio/twilio-cli/pull/87): breaking: Switch naming from 'project(s)' to 'profile(s)'. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**

**Preview**
- Added support for the header `Twilio-Sandbox-Mode` to mock all Voice dependencies


[2019-07-31] Version 1.3.6
---------------------------
**Library**
- [PR #85](https://github.com/twilio/twilio-cli/pull/85): Add the account-sid flag to the phone number custom commands. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #84](https://github.com/twilio/twilio-cli/pull/84): Fix the send email test timeouts and make param descriptions more consistent. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #83](https://github.com/twilio/twilio-cli/pull/83): Bump yarn from 1.16.0 to 1.17.3. Thanks to [@dependabot](https://github.com/dependabot)!
- [PR #82](https://github.com/twilio/twilio-cli/pull/82): Put a colon at the end of project add prompts. Thanks to [@childish-sambino](https://github.com/childish-sambino)!


[2019-07-24] Version 1.3.5
---------------------------
**Library**
- [PR #77](https://github.com/twilio/twilio-cli/pull/77): Bump lodash.template from 4.4.0 to 4.5.0. Thanks to [@dependabot[bot]](https://github.com/dependabot[bot])!
- [PR #72](https://github.com/twilio/twilio-cli/pull/72): Add --skip-parameter-validation flag. Thanks to [@dprothero](https://github.com/dprothero)!

**Insights**
- Added `properties` to summary.


[2019-07-12] Version 1.3.4
---------------------------
**Preview**
- Added endpoint to brand a call without initiating it, so it can be initiated manually by the Customer


[2019-07-10] Version 1.3.3
---------------------------
**Library**
- [PR #70](https://github.com/twilio/twilio-cli/pull/70): Package the debugger plugin with the CLI. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #56](https://github.com/twilio/twilio-cli/pull/56): Add a note for plugin developers to avoid keytar issues. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #68](https://github.com/twilio/twilio-cli/pull/68): Add plugin-warn-if-update-available plugin. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #60](https://github.com/twilio/twilio-cli/pull/60): Add email send and set commands. Thanks to [@Jennifer-Mah](https://github.com/Jennifer-Mah)!
- [PR #61](https://github.com/twilio/twilio-cli/pull/61): Warn users when installing plugins outside of Twilio and Twilio-Labs. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #67](https://github.com/twilio/twilio-cli/pull/67): Add pre-commit hook to execute tests. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #66](https://github.com/twilio/twilio-cli/pull/66): Additional debugging information. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #65](https://github.com/twilio/twilio-cli/pull/65): Drop properties flag from remove commands and output alternative message. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #64](https://github.com/twilio/twilio-cli/pull/64): Fix the resource description path splitter. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #63](https://github.com/twilio/twilio-cli/pull/63): Remove the '.json' extension from resource names in generated descriptions. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make `friendly_name` optional for applications create


[2019-07-05] Version 1.3.2
---------------------------
**Library**
- [PR #58](https://github.com/twilio/twilio-cli/pull/58): Update the API command runner to use the new API client. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #57](https://github.com/twilio/twilio-cli/pull/57): Refactor to use the latest API browser. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #52](https://github.com/twilio/twilio-cli/pull/52): Fix anchor href for logging messages and serverless naming. Thanks to [@aroach](https://github.com/aroach)!
- [PR #53](https://github.com/twilio/twilio-cli/pull/53): Add links to twilio-cli docs. Thanks to [@aroach](https://github.com/aroach)!
- [PR #54](https://github.com/twilio/twilio-cli/pull/54): Delete cookbook.md as is replaced by examples. Thanks to [@aroach](https://github.com/aroach)!
- [PR #50](https://github.com/twilio/twilio-cli/pull/50): Move utils and Twilio OpenAPI spec to core. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #55](https://github.com/twilio/twilio-cli/pull/55): Adding keytar as a dependency. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #49](https://github.com/twilio/twilio-cli/pull/49): Remove api:preview from the command tree. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
- [PR #48](https://github.com/twilio/twilio-cli/pull/48): Add CONTRIBUTING.md. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Add new property `as_of` date to Usage Record API calls

**Wireless**
- Added Usage Records resource.


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
