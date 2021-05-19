twilio-cli changelog
=====================

[2021-05-19] Version 2.24.0
---------------------------
**Library - Fix**
- [PR #254](https://github.com/twilio/twilio-cli/pull/254): conform to eslint guidelines. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Events**
- add query param to return types filtered by Schema Id
- Add query param to return sinks filtered by status
- Add query param to return sinks used/not used by a subscription

**Messaging**
- Add fetch and delete instance endpoints to us_app_to_person api **(breaking change)**
- Remove delete list endpoint from us_app_to_person api **(breaking change)**
- Update read list endpoint to return a list of us_app_to_person compliance objects **(breaking change)**
- Add `sid` field to Preregistered US App To Person response

**Supersim**
- Mark `unique_name` in Sim, Fleet, NAP resources as not PII

**Video**
- [Composer] GA maturity level


[2021-05-05] Version 2.23.0
---------------------------
**Library - Docs**
- [PR #250](https://github.com/twilio/twilio-cli/pull/250): add test credentials disclaimer. Thanks to [@stern-shawn](https://github.com/stern-shawn)!

**Api**
- Corrected the data types for feedback summary fields **(breaking change)**
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Bulkexports**
- promoting API maturity to GA

**Events**
- Add endpoint to update description in sink
- Remove beta-feature account flag

**Messaging**
- Update `status` field in us_app_to_person api to `campaign_status` **(breaking change)**

**Verify**
- Improve documentation regarding `push` factor and include extra information about `totp` factor.


[2021-04-21] Version 2.22.0
---------------------------
**Library - Chore**
- [PR #248](https://github.com/twilio/twilio-cli/pull/248): Updating help description to include the quickstart doc url. Thanks to [@Sindhura3](https://github.com/Sindhura3)!
- [PR #247](https://github.com/twilio/twilio-cli/pull/247): Indicate environment variables being used in profiles:list. Thanks to [@onuzbee](https://github.com/onuzbee)!

**Api**
- Revert Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Bulkexports**
- moving enum to doc root for auto generating documentation
- adding status enum and default output properties

**Events**
- Change schema_versions prop and key to versions **(breaking change)**

**Messaging**
- Add `use_inbound_webhook_on_number` field in Service API for fetch, create, update, read

**Taskrouter**
- Add `If-Match` Header based on ETag for Task Delete

**Verify**
- Add `AuthPayload` parameter to support verifying a `Challenge` upon creation. This is only supported for `totp` factors.
- Add support to resend the notifications of a `Challenge`. This is only supported for `push` factors.


[2021-04-07] Version 2.21.0
---------------------------
**Api**
- Added `announcement` event to conference status callback events
- Removed optional property `time_limit` in the call create request. **(breaking change)**

**Messaging**
- Add rate_limits field to Messaging Services US App To Person API
- Add usecase field in Service API for fetch, create, update, read
- Add us app to person api and us app to person usecase api as dependents in service
- Add us_app_to_person_registered field in service api for fetch, read, create, update
- Add us app to person api
- Add us app to person usecase api
- Add A2P external campaign api
- Add Usecases API

**Supersim**
- Add Create endpoint to Sims resource

**Verify**
- The `Binding` field is now returned when creating a `Factor`. This value won't be returned for other endpoints.

**Video**
- [Rooms] max_concurrent_published_tracks has got GA maturity


[2021-03-24] Version 2.20.0
---------------------------
**Api**
- Added optional parameter `CallToken` for create calls api
- Add optional property `time_limit` in the call create request.

**Bulkexports**
- adding two new fields with job api queue_position and estimated_completion_time

**Events**
- Add new endpoints to manage subscribed_events in subscriptions

**Numbers**
- Remove feature flags for RegulatoryCompliance endpoints

**Supersim**
- Add SmsCommands resource
- Add fields `SmsCommandsUrl`, `SmsCommandsMethod` and `SmsCommandsEnabled` to a Fleet resource

**Taskrouter**
- Add `If-Match` Header based on ETag for Task Update
- Add `ETag` as Response Headers to Tasks and Reservations

**Video**
- Recording rule beta flag **(breaking change)**
- [Rooms] Add RecordingRules param to Rooms


[2021-03-15] Version 2.19.0
---------------------------
**Library - Chore**
- [PR #243](https://github.com/twilio/twilio-cli/pull/243): remove preview gate. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Events**
- Set maturity to beta

**Messaging**
- Adjust A2P brand registration status enum **(breaking change)**

**Studio**
- Remove internal safeguards for Studio V2 API usage now that it's GA

**Verify**
- Add support for creating and verifying totp factors. Support for totp factors is behind the `api.verify.totp` beta feature.


[2021-02-24] Version 2.18.0
---------------------------
**Events**
- Update description of types in the create sink resource

**Messaging**
- Add WA template header and footer
- Remove A2P campaign and use cases API **(breaking change)**
- Add number_registration_status field to read and fetch campaign responses

**Trusthub**
- Make all resources public

**Verify**
- Verify List Attempts API endpoints added.


[2021-02-10] Version 2.17.0
---------------------------
**Api**
- Revert change that conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address
- Update the conference participant create `from` and `to` param to be endpoint type for supporting client identifier and sip address

**Events**
- Documentation should state that no fields are PII

**Flex**
- Adding `notifications` and `markdown` to Flex Configuration

**Messaging**
- Add A2P use cases API
- Add Brand Registrations API
- Add Campaigns API

**Serverless**
- Add runtime field to Build response and as an optional parameter to the Build create endpoint.
- Add @twilio/runtime-handler dependency to Build response example.

**Sync**
- Remove If-Match header for Document **(breaking change)**


[2021-01-27] Version 2.16.1
---------------------------
**Studio**
- Studio V2 API is now GA

**Supersim**
- Allow updating `CommandsUrl` and `CommandsMethod` on a Fleet


[2021-01-13] Version 2.16.0
---------------------------
**Api**
- Add 'Electric Imp v1 Usage' to usage categories

**Conversations**
- Changed `last_read_message_index` type in Participant's resource **(breaking change)**

**Insights**
- Added `created_time` to call summary.

**Sync**
- Remove HideExpired query parameter for filtering Sync Documents with expired **(breaking change)**

**Video**
- [Rooms] Expose maxConcurrentPublishedTracks property in Room resource


[2021-01-06] Version 2.15.2
---------------------------
**Library - Chore**
- [PR #237](https://github.com/twilio/twilio-cli/pull/237): update template files and dependencies. Thanks to [@eshanholtz](https://github.com/eshanholtz)!


[2020-12-16] Version 2.15.1
---------------------------
**Api**
- Updated `call_event` default_output_properties to request and response.

**Conversations**
- Added `last_read_message_index` and `last_read_timestamp` to Participant's resource update operation
- Added `is_notifiable` and `is_online` to User's resource
- Added `reachability_enabled` parameters to update method for Conversation Service Configuration resource

**Messaging**
- Added WA template quick reply, URL, and phone number buttons


[2020-12-08] Version 2.15.0
---------------------------
**Library - Chore**
- [PR #234](https://github.com/twilio/twilio-cli/pull/234): replace tags with vendor extension. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Added optional `RecordingTrack` parameter for create calls, create participants, and create call recordings
- Removed deprecated Programmable Chat usage record categories **(breaking change)**


[2020-12-02] Version 2.14.0
---------------------------
**Library - Fix**
- [PR #230](https://github.com/twilio/twilio-cli/pull/230): commands with actions without parameters. Thanks to [@sergiofbsilva](https://github.com/sergiofbsilva)!

**Api**
- Remove `RecordingTrack` parameter for create calls, create participants, and create call recordings **(breaking change)**
- Added `RecordingTrack` parameter for create calls and create call recordings
- Add optional property `recording_track` in the participant create request

**Lookups**
- Changed `caller_name` and `carrier` properties type to object **(breaking change)**

**Trunking**
- Added dual channel recording options for Trunks.


[2020-11-18] Version 2.13.0
---------------------------
**Library - Fix**
- [PR #226](https://github.com/twilio/twilio-cli/pull/226): remove the profile option from the "profiles:remove" command. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Add new call events resource - GET /2010-04-01/Accounts/{account_sid}/Calls/{call_sid}/Events.json

**Conversations**
- Fixed default response property issue for Service Notifications Configuration

**Insights**
- Removing call_sid from participant summary. **(breaking change)**

**Serverless**
- Allow Service unique name to be used in path (in place of SID) in Service update request

**Sync**
- Added HideExpired query parameter for filtering Sync Documents with expired

**Verify**
- Challenge `Details` and `HiddenDetails` properties are now marked as `PII`
- Challenge `expiration_date` attribute updated to set a default value of five (5) minutes and to allow max dates of one (1) hour after creation.
- Entity `identity` attribute updated to allow values between 8 and 64 characters.
- Verify Service frinedly_name attribute updated from 64 max lenght to 30 characters.


[2020-11-05] Version 2.12.0
---------------------------
**Api**
- Added `verify-push` to `usage_record` API

**Bulkexports**
- When creating a custom export the StartDay, EndDay, and FriendlyName fields were required but this was not reflected in the API documentation.  The API itself failed the request without these fields. **(breaking change)**
- Added property descriptions for Custom Export create method
- Clarified WebhookUrl and WebhookMethod must be provided together for Custom Export

**Insights**
- Added video room and participant summary apis.

**Ip_messaging**
- Create separate definition for ip-messaging
- Restore v2 endpoints for ip-messaging

**Verify**
- Verify Push madurity were updated from `preview` to `beta`
- `twilio_sandbox_mode` header was removed from Verify Push resources **(breaking change)**

**Video**
- [Rooms] Add Recording Rules API


[2020-10-14] Version 2.11.0
---------------------------
**Ai**
- Add `Annotation Project` and `Annotation Task` endpoints
- Add `Primitives` endpoints
- Add `meta.total` to the search endpoint

**Conversations**
- Mutable Conversation Unique Names

**Insights**
- Added `trust` to summary.

**Preview**
- Simplified `Channels` resource. The path is now `/BrandedChannels/branded_channel_sid/Channels` **(breaking change)**

**Verify**
- Changed parameters (`config` and `binding`) to use dot notation instead of JSON string (e.i. Before: `binding={"alg":"ES256", "public_key": "xxx..."}`, Now: `Binding.Alg="ES256"`, `Binding.PublicKey="xxx..."`). **(breaking change)**
- Changed parameters (`details` and `hidden_details`) to use dot notation instead of JSON string (e.i. Before: `details={"message":"Test message", "fields": "[{\"label\": \"Action 1\", \"value\":\"value 1\"}]"}`, Now: `details.Message="Test message"`, `Details.Fields=["{\"label\": \"Action 1\", \"value\":\"value 1\"}"]`). **(breaking change)**
- Removed `notify_service_sid` from `push` service configuration object. Add `Push.IncludeDate`, `Push.ApnCredentialSid` and `Push.FcmCredentialSid` service configuration parameters. **(breaking change)**


[2020-09-30] Version 2.10.3
---------------------------
**Library - Chore**
- updating api spec


[2020-09-29] Version 2.10.2
---------------------------
**Library - Chore**
- updating core version


[2020-09-28] Version 2.10.1
---------------------------
**Api**
- Add optional property `call_reason` in the participant create request
- Make sip-domain-service endpoints available in stage-au1 and prod-au1

**Messaging**
- Removed beta feature gate from WhatsApp Templates API

**Serverless**
- Add Build Status endpoint

**Video**
- [Rooms] Add new room type "go" for WebRTC Go


[2020-09-21] Version 2.10.0
---------------------------
**Library - Feature**
- [PR #220](https://github.com/twilio/twilio-cli/pull/220): add signal2020 plugin to known commands list. Thanks to [@dkundel](https://github.com/dkundel)!

**Accounts**
- Add Auth Token rotation API

**Conversations**
- Change resource path for Webhook Configuration

**Events**
- Schemas API get all Schemas names and versions


[2020-09-16] Version 2.9.0
--------------------------
**Library - Feature**
- [PR #218](https://github.com/twilio/twilio-cli/pull/218): Makes file paths with tildes work for email:send. Thanks to [@philnash](https://github.com/philnash)!

**Conversations**
- Expose Configuration and Service Configuration resources
- Add Unique Name support for Conversations
- Add Services Push Notification resource
- Add Service scoped Conversation resources
- Support Identity in Users resource endpoint

**Messaging**
- GA Deactivation List API
- Add domain cert API's(fetch, update, create) for link tracker

**Numbers**
- Add API endpoint for Supporting Document deletion

**Proxy**
- Updated usage of FailOnParticipantConflict param to apply only to accounts with ProxyAllowParticipantConflict account flag

**Supersim**
- Add `AccountSid` parameter to Sim resource update request
- Add `ready` status as an available status for a Sim resource


[2020-09-02] Version 2.8.1
--------------------------
**Ai**
- Initial release

**Bulkexports**
- removing public beta feature flag from BulkExports Jobs API

**Messaging**
- Add Deactivation List API
- Added page token parameter for fetch in WhatsApp Templates API

**Numbers**
- Add API endpoint for End User deletion

**Routes**
- Add Resource Route Configurations API
- Add Route Configurations API
- Initial Release

**Trunking**
- Added `transfer_mode` property on Trunks.


[2020-08-19] Version 2.8.0
--------------------------
**Library - Chore**
- [PR #213](https://github.com/twilio/twilio-cli/pull/213): Upgrade @sendgrid/mail from 7.2.1 to 7.2.2. Thanks to [@snyk-bot](https://github.com/snyk-bot)!
- [PR #214](https://github.com/twilio/twilio-cli/pull/214): Upgrade inquirer from 7.3.2 to 7.3.3. Thanks to [@snyk-bot](https://github.com/snyk-bot)!
- [PR #210](https://github.com/twilio/twilio-cli/pull/210): update GitHub branch references to use HEAD. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Conversations**
- Allow Identity addition to Participants

**Events**
- Sinks API Get all Sinks

**Proxy**
- Clarified usage of FailOnParticipantConflict param as experimental
- Add FailOnParticipantConflict param to Proxy Session create and Proxy Participant create

**Supersim**
- Add fleet, network, and isoCountryCode to the UsageRecords resource
- Change sort order of UsageRecords from ascending to descending with respect to start time field, records are now returned newest to oldest

**Wireless**
- Removed `Start` and `End` parameters from the Data Sessions list endpoint. **(breaking change)**


[2020-08-05] Version 2.7.0
--------------------------
**Library - Feature**
- [PR #208](https://github.com/twilio/twilio-cli/pull/208): block installation via npm when Node.js requirement not met. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Docs**
- [PR #206](https://github.com/twilio/twilio-cli/pull/206): add regional flag and regional/edge env vars to general usage doc. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Chore**
- [PR #204](https://github.com/twilio/twilio-cli/pull/204): lint using twilio-style. Thanks to [@ktalebian](https://github.com/ktalebian)!

**Messaging**
- Add rejection reason support to WhatsApp API
- Removed status parameter for create and update in WhatsApp Templates API

**Proxy**
- Add FailOnParticipantConflict param to Proxy Session update

**Verify**
- Add `CustomFriendlyName` optional parameter on Verification creation.
- Changes in `Challenge` resource to update documentation of both `details` and `hidden_details` properties.


[2020-07-22] Version 2.6.0
--------------------------
**Library - Feature**
- [PR #200](https://github.com/twilio/twilio-cli/pull/200): add custom HTTP header parameter support. Thanks to [@eshanholtz](https://github.com/eshanholtz)!

**Library - Fix**
- [PR #201](https://github.com/twilio/twilio-cli/pull/201): unhide the Twilio region flag when creating profiles. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #199](https://github.com/twilio/twilio-cli/pull/199): don't debug log the API key secret when creating profiles. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Add optional Click Tracking and Scheduling parameters to Create action of Message resource

**Supersim**
- Add callback_url and callback_method parameters to Sim resource update request


[2020-07-08] Version 2.5.0
--------------------------
**Library - Docs**
- [PR #194](https://github.com/twilio/twilio-cli/pull/194): how to use the CLI to interact with Twilio subaccounts. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Fix**
- [PR #198](https://github.com/twilio/twilio-cli/pull/198): don't get so fancy with the font color scheme. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #197](https://github.com/twilio/twilio-cli/pull/197): upgrade dependencies and drop tslib pinning. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Allow Address updates for Participants
- Message delivery receipts

**Events**
- Add account_sid to subscription and subscribed_events resources

**Flex**
- Changed `wfm_integrations` Flex Configuration key to private **(breaking change)**

**Messaging**
- Add error states to WhatsApp Sender status with failed reason **(breaking change)**
- Delete WhatsApp Template API
- Update WhatsApp Template API
- Add WhatsApp Template Get Api (fetch and read)

**Numbers**
- Add `valid_until` in the Bundles resource
- Add API for Bundle deletion

**Verify**
- Removed support for `sms`, `totp` and `app-push` factor types in Verify push **(breaking change)**


[2020-06-25] Version 2.4.0
--------------------------
**Library - Feature**
- [PR #195](https://github.com/twilio/twilio-cli/pull/195): move Twilio (Sub)Account APIs to their own topic. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #193](https://github.com/twilio/twilio-cli/pull/193): add 'plugins:available' command that lists trusted, uninstalled plugins. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added optional `JitterBufferSize` parameter for creating conference participant
- Added optional `label` property for conference participants
- Added optional parameter `caller_id` for creating conference participant endpoint.

**Autopilot**
- Remove Export resource from Autopilot Assistant

**Conversations**
- Expose Conversation timers

**Monitor**
- Update start/end date filter params to support date-or-time format **(breaking change)**

**Numbers**
- Add `provisionally-approved` as a Supporting Document status

**Preview**
- Removed `Authy` resources. **(breaking change)**

**Supersim**
- Add ready state to the allowed transitions in the sim update call behind the feature flag supersim.ready-state.v1

**Verify**
- Webhook resources added to Verify services and put behind the `api.verify.push` beta feature


[2020-06-10] Version 2.3.0
--------------------------
**Library - Feature**
- [PR #191](https://github.com/twilio/twilio-cli/pull/191): prompt to install known plugin when command is not found. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added `pstnconnectivity` to `usage_record` API

**Notify**
- delivery_callback_url and delivery_callback_enabled added

**Preview**
- `BrandsInformation` endpoint now returns a single `BrandsInformation`

**Supersim**
- Require a Network Access Profile when creating a Fleet **(breaking change)**


[2020-06-04] Version 2.2.0
--------------------------
**Library - Fix**
- [PR #189](https://github.com/twilio/twilio-cli/pull/189): pin 'tslib' to avoid issues when interacting with plugin-plugins. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Autopilot**
- Add dialogue_sid param to Query list resource

**Contacts**
- Added AccountSID to CFD CREATE and GET Responses

**Numbers**
- Add `provisionally-approved` as a Bundle status

**Preview**
- Deleted phone number required field in the brand phone number endpoint from `kyc-api`
- Removed insights `preview API` from API Definitions **(breaking change)**
- Added `BrandsInformation` endpoint to query brands information stored in KYC


[2020-05-27] Version 2.1.0
--------------------------
**Api**
- Added `reason_conference_ended` and `call_sid_ending_conference` to Conference read/fetch/update
- Fixed some examples to use the correct "TK" SID prefix for Trunk resources.

**Authy**
- Renamed `twilio_authy_sandbox_mode` headers to `twilio_sandbox_mode` **(breaking change)**
- Renamed `Twilio-Authy-*` headers to `Twilio-Veriry-*` **(breaking change)**

**Flex**
- Adding `flex_service_instance_sid` to Flex Configuration

**Preview**
- Removed insights preview API from API Definitions **(breaking change)**
- Added `Channels` endpoint to brand a phone number for BrandedCalls

**Serverless**
- Add Build Sid to Log results

**Supersim**
- Add Network Access Profile resource Networks subresource
- Allow specifying a Data Limit on Fleets

**Trunking**
- Fixed some examples to use the correct "TK" SID prefix for Trunk resources.


[2020-05-20] Version 2.0.3
--------------------------
**Chore**
- upgrade dependencies


[2020-05-13] Version 2.0.2
--------------------------
**Api**
- Add optional `emergency_caller_sid` parameter to SIP Domain
- Updated `call_reason` optional property to be treated as PII
- Added optional BYOC Trunk Sid property to Sip Domain API resource

**Autopilot**
- Add Restore resource to Autopilot Assistant

**Contacts**
- Added contacts Create API definition

**Events**
- Subscriptions API initial release

**Numbers**
- Add Evaluations API

**Supersim**
- Allow filtering the Fleets resource by Network Access Profile
- Allow assigning a Network Access Profile when creating and updating a Fleet
- Add Network Access Profiles resource

**Verify**
- Add `CustomCode` optional parameter on Verification creation.
- Add delete action on Service resource.

**Voice**
- Added endpoints for BYOC trunks, SIP connection policies and source IP mappings


[2020-04-29] Version 2.0.1
--------------------------
**Library - Fix**
- [PR #172](https://github.com/twilio/twilio-cli/pull/172): added in @oclif/color 0.1.0 dependency. Thanks to [@adamchasetaylor](https://github.com/adamchasetaylor)!

**Preview**
- Added `Dispatch` version to `preview`

**Studio**
- Reroute Create Execution for V2 to the V2 downstream

**Supersim**
- Add Networks resource


[2020-04-15] Version 2.0.0
--------------------------
**Library - Chore**
- [PR #171](https://github.com/twilio/twilio-cli/pull/171): bump CLI core to pick up breaking camelCase change. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**
- [PR #170](https://github.com/twilio/twilio-cli/pull/170): raise Node requirement to v10 and upgrade dependencies. Thanks to [@childish-sambino](https://github.com/childish-sambino)! **(breaking change)**

**Library - Feature**
- [PR #169](https://github.com/twilio/twilio-cli/pull/169): add '--no-attachment' option to 'email:send'. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #167](https://github.com/twilio/twilio-cli/pull/167): Content-type detection for attachments in email:send. Thanks to [@kolencherry](https://github.com/kolencherry)!

**Api**
- Updated description for property `call_reason` in the call create request

**Contacts**
- Added Read, Delete All, and Delete by SID docs
- Initial Release

**Studio**
- Rename `flow_valid` to `flow_validate`
- Removed `errors` and `warnings` from flows error response and added new property named `details`
- Add Update Execution endpoints to v1 and v2 to end execution via API
- Add new `warnings` attribute v2 flow POST api


[2020-04-01] Version 1.12.0
---------------------------
**Library - Chore**
- [PR #161](https://github.com/twilio/twilio-cli/pull/161): move the debugger command out of the debugger plugin. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Docs**
- [PR #159](https://github.com/twilio/twilio-cli/pull/159): pin a specific version of the Twilio CLI. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Api**
- Add optional 'secure' parameter to SIP Domain

**Authy**
- Added an endpoint to list the challenges of a factor
- Added optional parameter `Push` when updating a service to send the service level push factor configuration

**Bulkexports**
- exposing bulk exports (vault/slapchop) API as public beta API

**Flex**
- Adding `queue_stats_configuration` and `wfm_integrations` to Flex Configuration

**Serverless**
- Add Function Version Content endpoint
- Allow build_sid to be optional for deployment requests

**Supersim**
- Remove `deactivated` status for Super SIM which is replaced by `inactive` **(breaking change)**


[2020-03-18] Version 1.11.0
---------------------------
**Library - Chore**
- [PR #158](https://github.com/twilio/twilio-cli/pull/158): refactor reading data from file or stdin. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #157](https://github.com/twilio/twilio-cli/pull/157): upgrade dev dependencies and fix eslint errors/warnings. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Add optional `emergency_calling_enabled` parameter to SIP Domain
- Add optional property `call_reason` in the call create request

**Authy**
- Added `friendly_name` and `config` as optional params to Factor update
- Added `config` param to Factor creation **(breaking change)**

**Preview**
- Renamed `SuccessRate` endpoint to `ImpressionsRate` for Branded Calls (fka. Verified by Twilio) **(breaking change)**


[2020-03-04] Version 1.10.0
---------------------------
**Library - Feature**
- [PR #156](https://github.com/twilio/twilio-cli/pull/156): update the mechanics of the login command. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #153](https://github.com/twilio/twilio-cli/pull/153): sanity check the account SID and auth token when creating profiles. Thanks to [@thinkingserious](https://github.com/thinkingserious)!

**Library - Fix**
- [PR #155](https://github.com/twilio/twilio-cli/pull/155): allow login when no user has no username. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Authy**
- Added the `configuration` property to services to return the service level configurations
- Added optional parameter `Push` when creating a service to send the service level push factor configuration
- Remove FactorStrength support for Factors and Challenges **(breaking change)**

**Messaging**
- Correct the alpha sender capabilities property type **(breaking change)**

**Preview**
- Removed `/Devices` register Branded Calls endpoint, as per iOS sample app deprecation **(breaking change)**
- Removed `Twilio-Sandbox-Mode` request header from the Branded Calls endpoints, as not officially supported **(breaking change)**
- Removed `Verify` version from `preview` subdomain in favor to `verify` subdomain. **(breaking change)**

**Serverless**
- Add UI-Editable field to Services

**Supersim**
- Add `inactive` status for Super SIM which is an alias for `deactivated`

**Taskrouter**
- Adding value range to `priority` in task endpoint

**Verify**
- Fix `SendCodeAttempts` type. It's an array of objects instead of a unique object. **(breaking change)**


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
- [PR #124](https://github.com/twilio/twilio-cli/pull/124): Auto-deploy via Travis CI upon tagged commit to main. Thanks to [@thinkingserious](https://github.com/thinkingserious)!
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
