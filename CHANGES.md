## [5.6.0](https://github.com/twilio/twilio-cli/compare/5.5.0...5.6.0) (2023-04-06)


### Library - Fixes

* Swapping make install step to run after node setup in npm audit job ([#520](https://github.com/twilio/twilio-cli/issues/520)) ([0ed7d26](https://github.com/twilio/twilio-cli/commit/0ed7d26c5476a6e2005791b9541de10c87d2bbd8))


### Library - Chores

* ci ([3a60489](https://github.com/twilio/twilio-cli/commit/3a6048975f52242f5775ef4333bbe57cc1c0a9cc))
* **release:** set `package.json` to 5.5.1 [skip ci] ([638f004](https://github.com/twilio/twilio-cli/commit/638f00487617b7596eb1d5f6dee0286579c9b39c)), closes [#520](https://github.com/twilio/twilio-cli/issues/520)
* **release:** set `package.json` to 5.5.2 [skip ci] ([3aed7ed](https://github.com/twilio/twilio-cli/commit/3aed7ed449ef67c9fbd3e68465aa91e8ea85102b))
* update ([49e1e1f](https://github.com/twilio/twilio-cli/commit/49e1e1f9368d6f294f80ee5570ae7ce1d346ec40))

---------------------------
**Conversations**
- Expose query parameters ,  and  in list operation on Conversations resource for sorting and filtering

**Insights**
- Added answered by filter in Call Summaries

**Lookups**
- Remove  package **(breaking change)**

**Messaging**
- Add support for  brand type and  campaign use case.
- New Sole Proprietor Brands should be created with  brand type. Brand registration requests with  brand type will be rejected.
- New Sole Proprietor Campaigns should be created with  campaign use case. Campaign registration requests with  campaign use case will be rejected.
- Add Brand Registrations OTP API## [5.5.0](https://github.com/twilio/twilio-cli/compare/5.4.3...5.5.0) (2023-03-23)

---------------------------
**Api**
- Revert Corrected the data type for  in Available Phone Number Local, Mobile and TollFree resources
- Corrected the data type for  in Available Phone Number Local, Mobile and TollFree resources **(breaking change)**

**Messaging**
- Add  resource
- Add new endpoint for GetDomainConfigByMessagingServiceSid
- Remove  parameter and add  parameter to Link Shortening API **(breaking change)**### [5.4.3](https://github.com/twilio/twilio-cli/compare/5.4.2...5.4.3) (2023-03-21)


### Library - Chores

* update package.json ([c41fc54](https://github.com/twilio/twilio-cli/commit/c41fc5430b49abbb2c41aa936bbbc45ab7fbd527))

### [5.4.2](https://github.com/twilio/twilio-cli/compare/5.4.1...5.4.2) (2023-03-14)


### Library - Fixes

* Changed default node version to 16 to support backward compatiblilty for flex plugin for macos .pkg ([#512](https://github.com/twilio/twilio-cli/issues/512)) ([4d793af](https://github.com/twilio/twilio-cli/commit/4d793af7a937a5ae1b0d62f62e7409e4ee760c01))
* using node 16 versions for all releases ([#513](https://github.com/twilio/twilio-cli/issues/513)) ([be0dbf2](https://github.com/twilio/twilio-cli/commit/be0dbf2111a66090d3820c39d0e5aeaf414f9498))


### Library - Chores

* bump jsonwebtoken from 8.5.1 to 9.0.0 ([#514](https://github.com/twilio/twilio-cli/issues/514)) ([0f7ec42](https://github.com/twilio/twilio-cli/commit/0f7ec429fa8e1546b0b5e6c690e0b821e4470c78))

---------------------------
**Api**
- Add new categories for whatsapp template

**Lookups**
- Remove  from the 

**Supersim**
- Add ESimProfile's  and  parameters to libraries### [5.4.1](https://github.com/twilio/twilio-cli/compare/5.4.0...5.4.1) (2023-02-23)


### Library - Chores

* twilio-node version update ([#507](https://github.com/twilio/twilio-cli/issues/507)) ([7b45685](https://github.com/twilio/twilio-cli/commit/7b456855ea2f4a100733113afa2dea4e92109b15))


### Library - Fixes

* modify image name in debian acceptance test ([#505](https://github.com/twilio/twilio-cli/issues/505)) ([5733cd5](https://github.com/twilio/twilio-cli/commit/5733cd552447a9f889e29c0698e10ca42875b8b3))
* using npx instead of npm bin ([#509](https://github.com/twilio/twilio-cli/issues/509)) ([235b97b](https://github.com/twilio/twilio-cli/commit/235b97b9d82689516409bf2186cc297c5d08bf56))

## [5.4.0](https://github.com/twilio/twilio-cli/compare/5.3.3...5.4.0) (2023-02-09)

---------------------------
**Library - Feature**
- [PR #88](https://github.com/twilio/twilio-oai/pull/88): add Page and PageToken parameters to read operations. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Lookups**
- Add  package to the lookup response
- Add  package to the lookup response### [5.3.3](https://github.com/twilio/twilio-cli/compare/5.3.2...5.3.3) (2023-01-26)

---------------------------
**Library - Fix**
- [PR #87](https://github.com/twilio/twilio-oai/pull/87): use long property descriptions if available. Thanks to [@childish-sambino](https://github.com/childish-sambino)!
- [PR #85](https://github.com/twilio/twilio-oai/pull/85): Nullable Page URLs. Thanks to [@claudiachua](https://github.com/claudiachua)!

**Api**
- Add  param to Application resource

**Messaging**
- Add new tollfree verification API property (ExternalReferenceId)]

**Verify**
- Add  parameter and channel  for sna/sms orchestration

**Twiml**
- Add support for  noun and  noun, nested  to  and  verb### [5.3.2](https://github.com/twilio/twilio-cli/compare/5.3.1...5.3.2) (2023-01-12)


### Library - Fixes

* macos workflow fix ([#484](https://github.com/twilio/twilio-cli/issues/484)) ([a31bf6b](https://github.com/twilio/twilio-cli/commit/a31bf6b573cfee62acb7626ffeeac47c7fe30f2c))


### Library - Chores

* bump json5 from 2.2.1 to 2.2.2 ([#483](https://github.com/twilio/twilio-cli/issues/483)) ([829d229](https://github.com/twilio/twilio-cli/commit/829d229184d7be99bcc7eb16c31a943c93106cd9))
* enable rc support in apt releases ([#485](https://github.com/twilio/twilio-cli/issues/485)) ([ee4cd96](https://github.com/twilio/twilio-cli/commit/ee4cd9611841662a9e91b19a74b6004281c6ba28))

---------------------------
**Conversations**
- Add support for creating Multi-Channel Rich Content Messages

**Lookups**
- Changed the no data message for match postal code from  to  in identity match package

**Messaging**
- Add update/edit tollfree verification API### [5.3.1](https://github.com/twilio/twilio-cli/compare/5.3.0...5.3.1) (2022-12-29)

---------------------------
**Library - Fix**
- [PR #83](https://github.com/twilio/twilio-oai/pull/83): singularize ice-server. Thanks to [@childish-sambino](https://github.com/childish-sambino)!## [5.3.0](https://github.com/twilio/twilio-cli/compare/5.2.3...5.3.0) (2022-12-15)


### Library - Features

* Configuring RC release for rpm ([#478](https://github.com/twilio/twilio-cli/issues/478)) ([fcd625e](https://github.com/twilio/twilio-cli/commit/fcd625efd9cdbb2be2fc61da38f77fc19ac50560))

---------------------------
**Api**
- Add  param to address create and update
- Make  optional for user defined message subscription **(breaking change)**

**Flex**
- Flex Conversations is now Generally Available
- Adding the ie1 mapping for authorization api, updating service base uri and base url response attribute **(breaking change)**
- Change web channels to GA and library visibility to public
- Changing the uri for authorization api from using Accounts to Insights **(breaking change)**

**Media**
- Gate Twilio Live endpoints behind beta_feature for EOS

**Messaging**
- Mark  as a required field for Campaign Creation **(breaking change)**

**Oauth**
- updated openid discovery endpoint uri **(breaking change)**
- Added device code authorization endpoint

**Supersim**
- Allow filtering the SettingsUpdates resource by 

**Twiml**
- Add new Polly Neural voices
- Add tr-TR, ar-AE, yue-CN, fi-FI languages to SSML  element.
- Add x-amazon-jyutping, x-amazon-pinyin, x-amazon-pron-kana, x-amazon-yomigana alphabets to SSML  element.
- Rename  value for SSML   attribute to . **(breaking change)**
- Rename  attribute to  in SSML  element. **(breaking change)**### [5.2.3](https://github.com/twilio/twilio-cli/compare/5.2.2...5.2.3) (2022-12-01)

---------------------------
**Flex**
- Adding new  api in version 

**Lookups**
- Add  package to the lookup response

**Messaging**
- Added  parameter to Link Shortening API

**Serverless**
- Add node16 as a valid Build runtime
- Add ie1 and au1 as supported regions for all endpoints.### [5.2.2](https://github.com/twilio/twilio-cli/compare/5.2.1...5.2.2) (2022-11-17)


### Library - Docs

* Update arch doc to remove keytar ref ([#470](https://github.com/twilio/twilio-cli/issues/470)) ([d18c081](https://github.com/twilio/twilio-cli/commit/d18c081ce0052917e9ed5bd4c575f9889825e1f6))


### Library - Chores

* bump @actions/core in /.github/actions/build-rpm ([#447](https://github.com/twilio/twilio-cli/issues/447)) ([422c8fb](https://github.com/twilio/twilio-cli/commit/422c8fb96f20d73299fbeb5dc34ae339d41b507d))

---------------------------
**Api**
- Set the Content resource to have public visibility as Preview

**Flex**
- Adding new parameter  to 'gooddata' response in version 

**Insights**
- Added  field in List Call Summary
- Added  field in call summary


---------------------------
**Library - Fix**
- [PR #81](https://github.com/twilio/twilio-oai/pull/81): add mount names when they cannot be derived from the path. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Flex**
- Adding two new authorization API 'user_roles' and 'gooddata' in version 

**Messaging**
- Add new Campaign properties (MessageFlow, OptInMessage, OptInKeywords, OptOutMessage, OptOutKeywords, HelpMessage, HelpKeywords)

**Twiml**
- Add new speech models to .### [5.2.1](https://github.com/twilio/twilio-cli/compare/5.2.0...5.2.1) (2022-11-02)

---------------------------
**Library - Fix**
- [PR #80](https://github.com/twilio/twilio-oai/pull/80): update parent logic for handling of parents vs. containers. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added  and  to Message resource with public visibility as Beta
- Add  and  resource

**Proxy**
- Remove FailOnParticipantConflict param from Proxy Session create and update and Proxy Participant create

**Supersim**
- Update SettingsUpdates resource to remove PackageSid

**Taskrouter**
- Add  query parameter to Workers and TaskQueues for sorting by
- Add  query param for list reservations endpoint

**Twiml**
- Add  and  attributes to ## [5.2.0](https://github.com/twilio/twilio-cli/compare/5.1.0...5.2.0) (2022-10-19)


### Library - Chores

* run acceptance test on macos x64 executable ([#472](https://github.com/twilio/twilio-cli/issues/472)) ([12097b3](https://github.com/twilio/twilio-cli/commit/12097b3b37fc4ed2e6ff6dec97f90d97f324d7a3))


### Library - Fixes

* specifying targets for oclif-dev pack ([#471](https://github.com/twilio/twilio-cli/issues/471)) ([f0dfea5](https://github.com/twilio/twilio-cli/commit/f0dfea5a88e61d26f03a6ffe3b4cd3b50f831969))

---------------------------
**Library - Chore**
- [PR #79](https://github.com/twilio/twilio-oai/pull/79): update mountName and className extensions. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Library - Fix**
- [PR #78](https://github.com/twilio/twilio-oai/pull/78): updating property order for yaml files. Thanks to [@kridai](https://github.com/kridai)!

**Api**
- Make link shortening parameters public **(breaking change)**

**Oauth**
- added oauth JWKS endpoint
- Get userinfo resource
- OpenID discovery resource
- Add new API for token endpoint

**Supersim**
- Add SettingsUpdates resource

**Verify**
- Update Verify Push endpoints to  maturity
- Verify BYOT add Channels property to the Get Templates response

**Twiml**
- Add  attribute and  errorType to ## [5.1.0](https://github.com/twilio/twilio-cli/compare/5.0.0...5.1.0) (2022-10-06)


### Library - Fixes

* windows executable workflow ([ac8e2ed](https://github.com/twilio/twilio-cli/commit/ac8e2eda4d18a2e19d699adba9e8a96a3b7f93ce))


### Library - Chores

* macos workflow fix ([#469](https://github.com/twilio/twilio-cli/issues/469)) ([a650621](https://github.com/twilio/twilio-cli/commit/a650621dbb5091eb10b7cc2d3c2f5cf90fd1101a))

---------------------------
**Library - Feature**
- [PR #77](https://github.com/twilio/twilio-oai/pull/77): add helper libs semantic types configuration. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added  to  API.
- Add AMD attributes to participant create request

**Twiml**
- Add AMD attributes to  and ## [5.0.0](https://github.com/twilio/twilio-cli/compare/4.2.0...5.0.0) (2022-09-19)


### ⚠ BREAKING CHANGES

* upgrade to oclif v2

### Library - Features

* oclif v2 migration ([#466](https://github.com/twilio/twilio-cli/issues/466)) ([a9d57dc](https://github.com/twilio/twilio-cli/commit/a9d57dc8698b2f3eb0457486c2d7d2f5f7d785de))

## [4.2.0](https://github.com/twilio/twilio-cli/compare/4.1.0...4.2.0) (2022-09-08)


### ⚠ BREAKING CHANGES

* add node engine support from 14.x+

### Library - Fixes

* add node engine support from 14.x+ ([6de712f](https://github.com/twilio/twilio-cli/commit/6de712f071a0cfe81fead89527fb62226b504798))


### Library - Chores

* fix workflow for duplicate release ([#456](https://github.com/twilio/twilio-cli/issues/456)) ([8bf9188](https://github.com/twilio/twilio-cli/commit/8bf9188b99d5af09dc9e2ed3dc701ad1ddec0b00))

---------------------------
**Flex**
- Removed redundant  status from Flex Interactions flow **(breaking change)**
- Adding  and  to Flex Configuration

**Messaging**
- Add create, list and get tollfree verification API

**Verify**
- Verify SafeList API endpoints added.

**Video**
- Add  API

**Twiml**
- Update  value  to ## [4.1.0](https://github.com/twilio/twilio-cli/compare/4.0.1...4.1.0) (2022-08-25)


### Library - Features

* added audit cronjob ([#437](https://github.com/twilio/twilio-cli/issues/437)) ([0ffd3e1](https://github.com/twilio/twilio-cli/commit/0ffd3e1895cbc6fb591cff7ad27f8a0c08602070))


### Library - Chores

* bump file-type from 14.7.1 to 16.5.4 ([#426](https://github.com/twilio/twilio-cli/issues/426)) ([3577303](https://github.com/twilio/twilio-cli/commit/35773036174a3c8012789dccba11629ce16e4b2e))
* update macos failing script ([7c5b231](https://github.com/twilio/twilio-cli/commit/7c5b231a3eea0e0ac70f56d8737c94eaf66fb846))
* update macos failing script ([#452](https://github.com/twilio/twilio-cli/issues/452)) ([0e09e6e](https://github.com/twilio/twilio-cli/commit/0e09e6ed35de6b48d4253aa582ca3bdb487485bb))
* update macos failing script ([#453](https://github.com/twilio/twilio-cli/issues/453)) ([9a95b91](https://github.com/twilio/twilio-cli/commit/9a95b91a11a95c6c34ee52171e324c70f9c987d8))

---------------------------
**Library - Test**
- [PR #73](https://github.com/twilio/twilio-oai/pull/73): add test-docker rule. Thanks to [@beebzz](https://github.com/beebzz)!

**Api**
- Remove  from scheduling params and remove optimize parameters. **(breaking change)**

**Routes**
- Remove Duplicate Create Method - Update Method will work even if Inbound Processing Region is currently empty/404. **(breaking change)**

**Twiml**
- Add new Polly Neural voices
- Add new languages to SSML .### [4.0.1](https://github.com/twilio/twilio-cli/compare/4.0.0...4.0.1) (2022-08-11)


### Library - Chores

* updated commit msg ([6390c78](https://github.com/twilio/twilio-cli/commit/6390c788cb730aa9ea3dcbf261115d81fec779dd))

## [4.0.0](https://github.com/twilio/twilio-cli/compare/3.6.0...4.0.0) (2022-08-11)


### ⚠ BREAKING CHANGES

* node engines support 14.x+

### Library - Chores

* update dependencies ([#430](https://github.com/twilio/twilio-cli/issues/430)) ([bc4703d](https://github.com/twilio/twilio-cli/commit/bc4703d6eb0210183ce92491188325f82e91d212))


### Library - Fixes

* add node engine support from 14.x+ ([ef520fd](https://github.com/twilio/twilio-cli/commit/ef520fd5ca9eaba14ef134a10173fa6050a61929))
* cleanup keytar and port command ([#436](https://github.com/twilio/twilio-cli/issues/436)) ([d00f7ee](https://github.com/twilio/twilio-cli/commit/d00f7ee019b14ae38abda86eb4c910ac3e4b3ff7))

---------------------------   **Library - Feature**   - [PR #72](https://github.com/twilio/twilio-oai/pull/72): Addition of spec files for preview domain. Thanks to [@AsabuHere](https://github.com/AsabuHere)!      **Routes**   - Inbound Proccessing Region API - Public GA      **Supersim**   - Allow updating  on a Fleet## [3.6.0](https://github.com/twilio/twilio-cli/compare/3.5.0...3.6.0) (2022-07-14)

---------------------------
**Library - Test**
- [PR #67](https://github.com/twilio/twilio-oai/pull/67): Adding misc as PR type. Thanks to [@rakatyal](https://github.com/rakatyal)!

**Library - Fix**
- [PR #63](https://github.com/twilio/twilio-oai/pull/63): move the className extension to the operation when necessary. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Conversations**
- Allowed to use  as part of Participant's resource **(breaking change)**

**Lookups**
- Remove  from the lookup response **(breaking change)**

**Supersim**
- Add support for  resource to helper libraries

**Verify**
- Changed summary param  to  to be consistent with list attempts API **(breaking change)**
- Make  optional on Verification check to support  attempts.## [3.5.0](https://github.com/twilio/twilio-cli/compare/3.4.2...3.5.0) (2022-06-30)


### Library - Chores

* bump semver-regex from 3.1.3 to 3.1.4 ([#422](https://github.com/twilio/twilio-cli/issues/422)) ([5043d4e](https://github.com/twilio/twilio-cli/commit/5043d4e868b13285ad614ce5cd1bd3062375815c))


### Library - Fixes

* correct a typo in config:set error messaging ([#424](https://github.com/twilio/twilio-cli/issues/424)) ([d581fbb](https://github.com/twilio/twilio-cli/commit/d581fbb681a6f1532d5bc8dbd7219993a425515c))

---------------------------
**Library - Chore**
- [PR #64](https://github.com/twilio/twilio-oai/pull/64): adding the preview spec back. Thanks to [@shrutiburman](https://github.com/shrutiburman)!
- [PR #61](https://github.com/twilio/twilio-oai/pull/61): drop unneeded class names. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Added  to  API.

**Insights**
- Added  field in call summary
- Added new endpoint to fetch/create/update Call Annotations

**Verify**
- Remove  beta flag and set maturity to  for Verify TOTP properties and parameters. **(breaking change)**
- Changed summary param  to  to be consistent with list attempts API **(breaking change)**

**Twiml**
- Add  to ### [3.4.2](https://github.com/twilio/twilio-cli/compare/3.4.1...3.4.2) (2022-06-16)

---------------------------
**Lookups**
- Adding support for Lookup V2 API

**Studio**
- Corrected PII labels to be 30 days and added context to be PII

**Twiml**
- Add  attribute, nested  and  elements to  noun.
- Add support for new Amazon Polly voices (Q2 2022) for  verb
- Add support for  noun### [3.4.1](https://github.com/twilio/twilio-cli/compare/3.4.0...3.4.1) (2022-05-19)

---------------------------
**Library - Fix**
- [PR #57](https://github.com/twilio/twilio-oai/pull/57): add parent field to twilio vendor extensions. Thanks to [@charan678](https://github.com/charan678)!

**Api**
- Add property  to the recording resources

**Verify**
- Include  as a channel type in the verifications API.## [3.4.0](https://github.com/twilio/twilio-cli/compare/3.3.3...3.4.0) (2022-05-05)

---------------------------
**Library - Fix**
- [PR #56](https://github.com/twilio/twilio-oai/pull/56): add class_name property to twilio vendor extension. Thanks to [@charan678](https://github.com/charan678)!

**Conversations**
- Expose query parameter  in list operation on Address Configurations resource

**Supersim**
- Add  and  fields to Super SIM UsageRecords API response.
- Change ESimProfiles  parameter to optional to enable Activation Code download method support **(breaking change)**

**Verify**
- Deprecate  parameter in create and update service.### [3.3.3](https://github.com/twilio/twilio-cli/compare/3.3.2...3.3.3) (2022-05-05)


### Library - Fixes

* acceptance testing for brew and scoop releases ([#417](https://github.com/twilio/twilio-cli/issues/417)) ([2239160](https://github.com/twilio/twilio-cli/commit/223916004f7843ed55e26f4f0f3ef93657231c47))


### Library - Chores

* add dev phone to plugin commands (418) ([ed0455e](https://github.com/twilio/twilio-cli/commit/ed0455e2efda38aa4d575ff5cb15657bcff54dd1))

### [3.3.2](https://github.com/twilio/twilio-cli/compare/3.3.1...3.3.2) (2022-04-21)

---------------------------
**Library - Fix**
- [PR #54](https://github.com/twilio/twilio-oai/pull/54): switch api-def object types to open-api any types. Thanks to [@childish-sambino](https://github.com/childish-sambino)!### [3.3.1](https://github.com/twilio/twilio-cli/compare/3.3.0...3.3.1) (2022-04-07)


### Library - Chores

* bump minimist from 1.2.5 to 1.2.6 ([#412](https://github.com/twilio/twilio-cli/issues/412)) ([4577e7e](https://github.com/twilio/twilio-cli/commit/4577e7e85125e07986081416baa8443ddd9b78ff))
* bump node-fetch from 2.6.5 to 2.6.7 ([#369](https://github.com/twilio/twilio-cli/issues/369)) ([aa5c00d](https://github.com/twilio/twilio-cli/commit/aa5c00d2d0db61a166fb7216c2162dfe91995ce8))
* bump url-parse from 1.5.3 to 1.5.10 ([#403](https://github.com/twilio/twilio-cli/issues/403)) ([289ccf6](https://github.com/twilio/twilio-cli/commit/289ccf655a2fe5548622df3b43da98958b15210e))
* remove outdated announcements ([91fd363](https://github.com/twilio/twilio-cli/commit/91fd3635af62695c671772128fbb298c478cabc3))


### Library - Docs

* Clarify how to privately share plugin code ([#408](https://github.com/twilio/twilio-cli/issues/408)) ([d71a846](https://github.com/twilio/twilio-cli/commit/d71a846c51bf03eafa5c0090a1c4043e27ad67e2))


### Library - Fixes

* acceptance workflow failures fix ([#415](https://github.com/twilio/twilio-cli/issues/415)) ([a907984](https://github.com/twilio/twilio-cli/commit/a907984533640584a16fecb2482fef89c64be0b0))
* update the condition for running sonar scanner ([#413](https://github.com/twilio/twilio-cli/issues/413)) ([dd227e7](https://github.com/twilio/twilio-cli/commit/dd227e777e003f921d073586e09a00431ac18a2d))

---------------------------
**Api**
- Updated  visibility to private

**Verify**
- Verify List Attempts API summary endpoint added.
- Update PII documentation for   property.

**Voice**
- make annotation parameter from /Calls API private## [3.3.0](https://github.com/twilio/twilio-cli/compare/3.2.1...3.3.0) (2022-03-24)


### Library - Fixes

* Add input owner for docker test ([#411](https://github.com/twilio/twilio-cli/issues/411)) ([73be18f](https://github.com/twilio/twilio-cli/commit/73be18f5d0d6817795f95bc2e8feae0bce022c4e))
* Fix scoop package manager installation ([#410](https://github.com/twilio/twilio-cli/issues/410)) ([82196c3](https://github.com/twilio/twilio-cli/commit/82196c30de822840057a74d7011f8b9be1dff627))

---------------------------
**Api**
- Change Version: ImageMagick 6.9.10-23 Q16 x86_64 20190101 https://imagemagick.org
Copyright: © 1999-2019 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC Modules OpenMP 
Delegates (built-in): bzlib djvu fftw fontconfig freetype jbig jng jpeg lcms lqr ltdl lzma openexr pangocairo png tiff webp wmf x xml zlib
Usage: stream-im6.q16 [options ...] input-image raw-image

Image Settings:
  -authenticate password
                       decipher image with this password
  -channel type        apply option to select image channels
  -colorspace type     alternate image colorspace
  -compress type       type of pixel compression when writing the image
  -define format:option
                       define one or more image format options
  -density geometry    horizontal and vertical density of the image
  -depth value         image depth
  -extract geometry    extract area from image
  -identify            identify the format and characteristics of the image
  -interlace type      type of image interlacing scheme
  -interpolate method  pixel color interpolation method
  -limit type value    pixel cache resource limit
  -map components      one or more pixel components
  -monitor             monitor progress
  -quantize colorspace reduce colors in this colorspace
  -quiet               suppress all warning messages
  -regard-warnings     pay attention to warning messages
  -respect-parentheses settings remain in effect until parenthesis boundary
  -sampling-factor geometry
                       horizontal and vertical sampling factor
  -seed value          seed a new sequence of pseudo-random numbers
  -set attribute value set an image attribute
  -size geometry       width and height of image
  -storage-type type   pixel storage type
  -synchronize         synchronize image to storage device
  -taint               declare the image as modified
  -transparent-color color
                       transparent color
  -verbose             print detailed information about the image
  -virtual-pixel method
                       virtual pixel access method

Miscellaneous Options:
  -debug events        display copious debugging information
  -help                print program options
  -list type           print a list of supported option arguments
  -log format          format of debugging information
  -version             print version information

By default, the image format of `file' is determined by its magic
number.  To specify a particular image format, precede the filename
with an image format name and a colon (i.e. ps:image) or specify the
image type as the filename suffix (i.e. image.ps).  Specify 'file' as
'-' for standard input or output. url parameter to non optional
- Add  and  categories to  API

**Chat**
- Added v3 Channel update endpoint to support Public to Private channel migration

**Flex**
- Private Beta release of the Interactions API to support the upcoming release of Flex Conversations at the end of Q1 2022.
- Adding  object to Flex Configuration

**Media**
- Add max_duration param to PlayerStreamer

**Supersim**
- Remove Commands resource, use SmsCommands resource instead **(breaking change)**

**Taskrouter**
- Add limits to  for Cumulative Statistics Endpoint

**Video**
- Change recording  type from  to  **(breaking change)**
- Add  and  to composition
- Add  and  to recording### [3.2.1](https://github.com/twilio/twilio-cli/compare/3.2.0...3.2.1) (2022-03-10)


### Library - Chores

* Add nodev12 support  ([#406](https://github.com/twilio/twilio-cli/issues/406)) ([2ffdb75](https://github.com/twilio/twilio-cli/commit/2ffdb753036153c1d8a0603aff8711e47b645bc5))
* fix apt acceptance test failure ([#409](https://github.com/twilio/twilio-cli/issues/409)) ([de74ae3](https://github.com/twilio/twilio-cli/commit/de74ae3f8461db43ea0fff54ab7f1dfa29462b4a))
* fixing macos build issue ([3a0011a](https://github.com/twilio/twilio-cli/commit/3a0011a114f4e73e02482ad5158d6bba6c9c689b))

## [3.2.0](https://github.com/twilio/twilio-cli/compare/3.1.0...3.2.0) (2022-02-24)


### Library - Fixes

* Added Scoop acceptance testing after release ([#395](https://github.com/twilio/twilio-cli/issues/395)) ([14c3cf5](https://github.com/twilio/twilio-cli/commit/14c3cf5759a0fc1d428298bc75f9f5b7a25d3bdb))
* fix for failing rpm build ([#391](https://github.com/twilio/twilio-cli/issues/391)) ([9cfaa2c](https://github.com/twilio/twilio-cli/commit/9cfaa2c93cb8f1f3ce9f2ff1e40e84d48ceb69cc))


### Library - Chores

* Add NPM acceptance test ([#398](https://github.com/twilio/twilio-cli/issues/398)) ([d2be8e1](https://github.com/twilio/twilio-cli/commit/d2be8e1671812ef3e7e33642a8f19d481f257aac))
* brew acceptance test ([88e6f4b](https://github.com/twilio/twilio-cli/commit/88e6f4bbc42bc68510f9d61387a466ed2746a396))
* update support for earlier versions in apt ([#400](https://github.com/twilio/twilio-cli/issues/400)) ([09a6372](https://github.com/twilio/twilio-cli/commit/09a6372e393accdf931643319462f4aca0f688cf))

---------------------------
**Api**
- Add  to Version: ImageMagick 6.9.10-23 Q16 x86_64 20190101 https://imagemagick.org
Copyright: © 1999-2019 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC Modules OpenMP 
Delegates (built-in): bzlib djvu fftw fontconfig freetype jbig jng jpeg lcms lqr ltdl lzma openexr pangocairo png tiff webp wmf x xml zlib
Usage: stream-im6.q16 [options ...] input-image raw-image

Image Settings:
  -authenticate password
                       decipher image with this password
  -channel type        apply option to select image channels
  -colorspace type     alternate image colorspace
  -compress type       type of pixel compression when writing the image
  -define format:option
                       define one or more image format options
  -density geometry    horizontal and vertical density of the image
  -depth value         image depth
  -extract geometry    extract area from image
  -identify            identify the format and characteristics of the image
  -interlace type      type of image interlacing scheme
  -interpolate method  pixel color interpolation method
  -limit type value    pixel cache resource limit
  -map components      one or more pixel components
  -monitor             monitor progress
  -quantize colorspace reduce colors in this colorspace
  -quiet               suppress all warning messages
  -regard-warnings     pay attention to warning messages
  -respect-parentheses settings remain in effect until parenthesis boundary
  -sampling-factor geometry
                       horizontal and vertical sampling factor
  -seed value          seed a new sequence of pseudo-random numbers
  -set attribute value set an image attribute
  -size geometry       width and height of image
  -storage-type type   pixel storage type
  -synchronize         synchronize image to storage device
  -taint               declare the image as modified
  -transparent-color color
                       transparent color
  -verbose             print detailed information about the image
  -virtual-pixel method
                       virtual pixel access method

Miscellaneous Options:
  -debug events        display copious debugging information
  -help                print program options
  -list type           print a list of supported option arguments
  -log format          format of debugging information
  -version             print version information

By default, the image format of `file' is determined by its magic
number.  To specify a particular image format, precede the filename
with an image format name and a colon (i.e. ps:image) or specify the
image type as the filename suffix (i.e. image.ps).  Specify 'file' as
'-' for standard input or output. resource
- Add A2P Registration Fee category () to usage records

**Verify**
- Remove outdated documentation commentary to contact sales. Product is already in public beta.


---------------------------
**Api**
- Detected a bug and removed optional boolean include_soft_deleted parameter to retrieve soft deleted recordings. **(breaking change)**
- Add optional boolean include_soft_deleted parameter to retrieve soft deleted recordings.

**Numbers**
- Unrevert valid_until and sort filter params added to List Bundles resource
- Revert valid_until and sort filter params added to List Bundles resource
- Update sorting params added to List Bundles resource in the previous release

**Preview**
- Moved  from preview to beta under  **(breaking change)**

**Taskrouter**
- Add  as Response Header to List of Task, Reservation & Worker

**Verify**
- Add optional  to factors.

**Twiml**
- Add new Polly Neural voices## [3.1.0](https://github.com/twilio/twilio-cli/compare/3.0.1...3.1.0) (2022-02-10)


### Library - Fixes

* Added release candidate changes ([#379](https://github.com/twilio/twilio-cli/issues/379)) ([85b86c4](https://github.com/twilio/twilio-cli/commit/85b86c4191fea9fe6406290e2ec3c23f84553172))
* changes for default output property ([#377](https://github.com/twilio/twilio-cli/issues/377)) ([980b059](https://github.com/twilio/twilio-cli/commit/980b0599bcb2edc9fe4da4929784e85455c61efe))
* Cleaning travis code ([#380](https://github.com/twilio/twilio-cli/issues/380)) ([9e89e1a](https://github.com/twilio/twilio-cli/commit/9e89e1ad750bcf498d16256b7d056b7e33d09860))
* Correct terminology in testing workflow ([#370](https://github.com/twilio/twilio-cli/issues/370)) ([84d5796](https://github.com/twilio/twilio-cli/commit/84d5796015056358d3da09b88e708ffa6c9cf684))
* Fix profiles remove with environment variables set ([#376](https://github.com/twilio/twilio-cli/issues/376)) ([fb4c11a](https://github.com/twilio/twilio-cli/commit/fb4c11aeb70663956b086b5cab84b2603c5a2f1b))


### Library - Chores

* Add back sonar scan ([#384](https://github.com/twilio/twilio-cli/issues/384)) ([dac332c](https://github.com/twilio/twilio-cli/commit/dac332cb4c61f540760ccf4d41a06a94d314cb4c))
* Add link to docs with update notification ([#368](https://github.com/twilio/twilio-cli/issues/368)) ([b18e07b](https://github.com/twilio/twilio-cli/commit/b18e07b186c0e2ba99dea75262f63adedfd08640))
* fix failing test ([#382](https://github.com/twilio/twilio-cli/issues/382)) ([3b3f384](https://github.com/twilio/twilio-cli/commit/3b3f384b296d0b8d1fae77c065c6b4ba0da7c5cd))
* segregate single platform acceptance workflow ([#381](https://github.com/twilio/twilio-cli/issues/381)) ([966f6b4](https://github.com/twilio/twilio-cli/commit/966f6b44bf0106a5245b86766a89942e68d00e6a))
* Separate npm audit and test workflows ([#378](https://github.com/twilio/twilio-cli/issues/378)) ([13d0ead](https://github.com/twilio/twilio-cli/commit/13d0ead89c5e6a00cd9548bc9d4baf334e6bee0a))


### Library - Test

* Dummy draft workflow ([#387](https://github.com/twilio/twilio-cli/issues/387)) ([ae5ad5a](https://github.com/twilio/twilio-cli/commit/ae5ad5ad779cb7f20c317febd0c26beb7b637058))

---------------------------
**Api**
- Add Version: ImageMagick 6.9.10-23 Q16 x86_64 20190101 https://imagemagick.org
Copyright: © 1999-2019 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC Modules OpenMP 
Delegates (built-in): bzlib djvu fftw fontconfig freetype jbig jng jpeg lcms lqr ltdl lzma openexr pangocairo png tiff webp wmf x xml zlib
Usage: stream-im6.q16 [options ...] input-image raw-image

Image Settings:
  -authenticate password
                       decipher image with this password
  -channel type        apply option to select image channels
  -colorspace type     alternate image colorspace
  -compress type       type of pixel compression when writing the image
  -define format:option
                       define one or more image format options
  -density geometry    horizontal and vertical density of the image
  -depth value         image depth
  -extract geometry    extract area from image
  -identify            identify the format and characteristics of the image
  -interlace type      type of image interlacing scheme
  -interpolate method  pixel color interpolation method
  -limit type value    pixel cache resource limit
  -map components      one or more pixel components
  -monitor             monitor progress
  -quantize colorspace reduce colors in this colorspace
  -quiet               suppress all warning messages
  -regard-warnings     pay attention to warning messages
  -respect-parentheses settings remain in effect until parenthesis boundary
  -sampling-factor geometry
                       horizontal and vertical sampling factor
  -seed value          seed a new sequence of pseudo-random numbers
  -set attribute value set an image attribute
  -size geometry       width and height of image
  -storage-type type   pixel storage type
  -synchronize         synchronize image to storage device
  -taint               declare the image as modified
  -transparent-color color
                       transparent color
  -verbose             print detailed information about the image
  -virtual-pixel method
                       virtual pixel access method

Miscellaneous Options:
  -debug events        display copious debugging information
  -help                print program options
  -list type           print a list of supported option arguments
  -log format          format of debugging information
  -version             print version information

By default, the image format of `file' is determined by its magic
number.  To specify a particular image format, precede the filename
with an image format name and a colon (i.e. ps:image) or specify the
image type as the filename suffix (i.e. image.ps).  Specify 'file' as
'-' for standard input or output. resource

**Conversations**
- Fixed DELETE request to accept sid_like params in Address Configuration resources **(breaking change)**
- Expose Address Configuration resource for  and 

**Fax**
- Removed deprecated Programmable Fax Create and Update methods **(breaking change)**

**Insights**
- Rename  to  and remove  in conference participant summary **(breaking change)**

**Numbers**
- Expose valid_until filters as part of provisionally-approved compliance feature on the List Bundles resource

**Supersim**
- Fix typo in Fleet resource docs
- Updated documentation for the Fleet resource indicating that fields related to commands have been deprecated and to use sms_command fields instead.
- Add support for setting and reading  and  on Fleets resource for helper libraries
- Changed  property in requests to create an SMS Command made to the /SmsCommands to accept SIM UniqueNames in addition to SIDs

**Verify**
- Update list attempts API to include new filters and response fields.### [3.0.1](https://github.com/twilio/twilio-cli/compare/3.0.0...3.0.1) (2022-01-27)


### Library - Chores

* Add twilio docs link for twilio update ([#366](https://github.com/twilio/twilio-cli/issues/366)) ([8c36f69](https://github.com/twilio/twilio-cli/commit/8c36f69dd0ae5412e3f3de81a9880506f0acbb94))

---------------------------
**Insights**
- Added new endpoint to fetch Conference Participant Summary
- Added new endpoint to fetch Conference Summary

**Messaging**
- Add government_entity parameter to brand apis

**Verify**
- Add Access Token fetch endpoint to retrieve a previously created token.
- Add Access Token payload to the Access Token creation endpoint, including a unique Sid, so it's addressable while it's TTL is valid.## [3.0.0](https://github.com/twilio/twilio-cli/compare/2.36.1...3.0.0) (2022-01-18)


### ⚠ BREAKING CHANGES

* Storing profiles in config file instead of keytar.

### Library - Fixes

* Run npm audit for only production dependencies ([#359](https://github.com/twilio/twilio-cli/issues/359)) ([92f41a7](https://github.com/twilio/twilio-cli/commit/92f41a70155b2593cf26500cd6a1fa8098328353))


### Library - Features

* Release feature branch ([#360](https://github.com/twilio/twilio-cli/issues/360)) ([6bfe20d](https://github.com/twilio/twilio-cli/commit/6bfe20d368f4de011f66e0fc4b7bfc3b6809d302))


### Library - Chores

* Bump dependency ([#363](https://github.com/twilio/twilio-cli/issues/363)) ([5808a81](https://github.com/twilio/twilio-cli/commit/5808a81d6800b30c92114323b2994574de43000f))
* Update License ([#361](https://github.com/twilio/twilio-cli/issues/361)) ([3dbeda6](https://github.com/twilio/twilio-cli/commit/3dbeda6449d60cf63668395626579fe7bde8b8c7))
* update macos release workflow ([#356](https://github.com/twilio/twilio-cli/issues/356)) ([84a836f](https://github.com/twilio/twilio-cli/commit/84a836f25dd80f6b8868c1ca3ec5d31bbdbc27ad))

---------------------------
**Library - Feature**
- [PR #51](https://github.com/twilio/twilio-oai/pull/51): add GitHub release step during deploy. Thanks to [@childish-sambino](https://github.com/childish-sambino)!

**Api**
- Make fixed time scheduling parameters public **(breaking change)**

**Messaging**
- Add update brand registration API

**Numbers**
- Add API endpoint for List Bundle Copies resource

**Video**
- Enable external storage for all customers### [2.36.1](https://github.com/twilio/twilio-cli/compare/2.36.0...2.36.1) (2021-12-30)


### Library - Fixes

* wait for executables release to finish before sanity test ([bf6e8ca](https://github.com/twilio/twilio-cli/commit/bf6e8cac81638cb1b022087ebf42170e4ba342d8))

## [2.36.0](https://github.com/twilio/twilio-cli/compare/2.35.0...2.36.0) (2021-12-16)


### Library - Features

* Add flag no header for fetch and list commands. ([#344](https://github.com/twilio/twilio-cli/issues/344)) ([d26f504](https://github.com/twilio/twilio-cli/commit/d26f504594e4d34eb1244f36e10ef1088f1beaad))
* added notarization changes ([#349](https://github.com/twilio/twilio-cli/issues/349)) ([2a8102e](https://github.com/twilio/twilio-cli/commit/2a8102e623c3f6730ae8e221e5cdf39fcdb6b58c))


### Library - Fixes

* Add delay before checking latest workflow id ([#348](https://github.com/twilio/twilio-cli/issues/348)) ([a072f8c](https://github.com/twilio/twilio-cli/commit/a072f8c114a2e43af556d0a1d296cb4a83fe4a4c))
* Pin plugin-help to 3.2.17 ([#353](https://github.com/twilio/twilio-cli/issues/353)) ([d5c0a65](https://github.com/twilio/twilio-cli/commit/d5c0a65b83e02a2727ff35dbcf909e0c0c715e85))
* Poll workflow status for Scoop/HomeBrew ([#355](https://github.com/twilio/twilio-cli/issues/355)) ([eeff221](https://github.com/twilio/twilio-cli/commit/eeff221bc02739aebe6f73f74af62a5889164e42))
* releaserc json ([892c7f1](https://github.com/twilio/twilio-cli/commit/892c7f15b8dcf0f191052926638558978741bb5c))
* updating windows release workflow ([#347](https://github.com/twilio/twilio-cli/issues/347)) ([608bff4](https://github.com/twilio/twilio-cli/commit/608bff4092210cef42bfe9c765bbce0fc46c06ca))


### Library - Chores

* change semantic-release command in github action steps ([#351](https://github.com/twilio/twilio-cli/issues/351)) ([f8e1723](https://github.com/twilio/twilio-cli/commit/f8e17231c9a0f59070000806b3576b719d985c5a))
* Debian release fix ([#354](https://github.com/twilio/twilio-cli/issues/354)) ([fc4170e](https://github.com/twilio/twilio-cli/commit/fc4170e1310a558210ccb037498f2ef5469a8140))
* update vulnerable dependencies ([#352](https://github.com/twilio/twilio-cli/issues/352)) ([a810c1a](https://github.com/twilio/twilio-cli/commit/a810c1aad1a71d1e597850a136d3a088329d1cb9))

## [2.35.0](https://github.com/twilio/twilio-cli/compare/2.34.0...2.35.0) (2021-12-02)


### Library - Features

* adding windows package signing configurations ([#341](https://github.com/twilio/twilio-cli/issues/341)) ([7b9abb1](https://github.com/twilio/twilio-cli/commit/7b9abb18843e307f59f5dbc5410bdbf522828c1e))
* Enable a draft release for npm and homebrew for sanity testing ([#338](https://github.com/twilio/twilio-cli/issues/338)) ([9899fdf](https://github.com/twilio/twilio-cli/commit/9899fdf066873d211dc436e39aedeec95d387304))
* platform executables sanity testing ([#342](https://github.com/twilio/twilio-cli/issues/342)) ([369c152](https://github.com/twilio/twilio-cli/commit/369c152b16c79883b03e9a9ff43f937a25aeb30d))


### Library - Fixes

* apt postinst script  ([#343](https://github.com/twilio/twilio-cli/issues/343)) ([f405c9f](https://github.com/twilio/twilio-cli/commit/f405c9f84b99f0489b789f549a5106156b102eee))
* remove ngrok from force dependencies ([#346](https://github.com/twilio/twilio-cli/issues/346)) ([3080312](https://github.com/twilio/twilio-cli/commit/3080312e1e3bc049a275e63dd998005d82dc2a6a))
* update vulnerable dependencies packages ([#340](https://github.com/twilio/twilio-cli/issues/340)) ([f9eec20](https://github.com/twilio/twilio-cli/commit/f9eec200457c70754f1e2b9068a0ae678a70f985))


### Library - Chores

* Trigger scoop repo workflow through release ([#345](https://github.com/twilio/twilio-cli/issues/345)) ([7c674cf](https://github.com/twilio/twilio-cli/commit/7c674cfba9a444b45ca0411fe3400a65fc894622))

---------------------------
**Conversations**
- Add  resource

**Flex**
- Adding  and  objects to Flex Configuration

**Messaging**
- Update us_app_to_person endpoints to remove beta feature flag based access

**Supersim**
- Add IP Commands resource

**Verify**
- Add optional  parameter to the create access token endpoint.

**Video**
- Add maxParticipantDuration param to Rooms

**Twiml**
- Unrevert Add supported SSML children to , , , , , and .
- Revert Add supported SSML children to , , , , , and .## [2.34.0](https://github.com/twilio/twilio-cli/compare/2.33.0...2.34.0) (2021-11-18)


### Library - Fixes

* Added changes for lcov ([#319](https://github.com/twilio/twilio-cli/issues/319)) ([43cc6ad](https://github.com/twilio/twilio-cli/commit/43cc6adefea72c08f63bea1574fab35ffa6ded54))
* Disable hyperlinks in Ubuntu ([#329](https://github.com/twilio/twilio-cli/issues/329)) ([14f7cb3](https://github.com/twilio/twilio-cli/commit/14f7cb3560a02091550d5f26c86bfd19ca8a1607))
* reverting changes for the RPM build ([#326](https://github.com/twilio/twilio-cli/issues/326)) ([c9eaad8](https://github.com/twilio/twilio-cli/commit/c9eaad8e9cbdf0d36e5d7662daee55dfa4608f1d))
* updating release steps to fetch latest dependencies ([#332](https://github.com/twilio/twilio-cli/issues/332)) ([ece2b9f](https://github.com/twilio/twilio-cli/commit/ece2b9f397ffd18d74f90c38e17e74c920ca8548))


### Library - Features

* adding workflow for apt release ([#320](https://github.com/twilio/twilio-cli/issues/320)) ([bdfab17](https://github.com/twilio/twilio-cli/commit/bdfab17174a232a1cb2891f709ca24d34104eea1))


### Library - Chores

* update slack alerts color ([#336](https://github.com/twilio/twilio-cli/issues/336)) ([ba5ee89](https://github.com/twilio/twilio-cli/commit/ba5ee89ca59b283e5370327c3ca3494a8b2aec84))

---------------------------
**Frontline**
- Added  to User's resource

**Messaging**
- Added GET vetting API

**Verify**
- Add  to the attempts API.
- Allow to update  from  to  or  and viceversa for Verify Push
- Add  as a valid  value for Verify Push

**Twiml**
- Add supported SSML children to , , , , , and .## [2.33.0](https://github.com/twilio/twilio-cli/compare/2.32.1...2.33.0) (2021-11-04)


### Library - Features

* Added the tests and sonarcloud jobs ([#312](https://github.com/twilio/twilio-cli/issues/312)) ([bfc7d57](https://github.com/twilio/twilio-cli/commit/bfc7d573919c6beb23acd9844a923cbf3fb885d4))


### Library - Fixes

* Fixing the release issue ([#313](https://github.com/twilio/twilio-cli/issues/313)) ([b893be6](https://github.com/twilio/twilio-cli/commit/b893be61f0ca1543b8f8c5d0728ea1b7fcdfdbed))
* Pin peer dependency semantic-release ([#318](https://github.com/twilio/twilio-cli/issues/318)) ([00ac1d8](https://github.com/twilio/twilio-cli/commit/00ac1d8809b8c410445be67a7dc6f5154c2452de))


### Library - Chores

* Add xz compression for tarballs ([#321](https://github.com/twilio/twilio-cli/issues/321)) ([9bd5494](https://github.com/twilio/twilio-cli/commit/9bd5494264600ace8bd27752a1da59fecf53eda9))

---------------------------
**Library - Chore**
- [PR #46](https://github.com/twilio/twilio-oai/pull/46): migrate from travis over to gh actions. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Api**
- Updated  property to be treated as PII

**Messaging**
- Added a new enum for brand registration status named DELETED **(breaking change)**
- Add a new K12_EDUCATION use case in us_app_to_person_usecase api transaction
- Added a new enum for brand registration status named IN_REVIEW

**Serverless**
- Add node14 as a valid Build runtime

**Verify**
- Fix typos in Verify Push Factor documentation for the  parameter.
- Added  on verification creation
- Make  parameter public for Verification resource and  parameter public for Service resource. **(breaking change)**### [2.32.1](https://github.com/twilio/twilio-cli/compare/2.32.0...2.32.1) (2021-10-19)


### Library - Fixes

* Revert "Resolve security vulnerability ([#306](https://github.com/twilio/twilio-cli/issues/306))" ([#315](https://github.com/twilio/twilio-cli/issues/315)) ([#316](https://github.com/twilio/twilio-cli/issues/316)) ([53a2ded](https://github.com/twilio/twilio-cli/commit/53a2ded1a89d22bcf18fd2602c89646a4287eb3c))

## [2.33.0-rc.2](https://github.com/twilio/twilio-cli/compare/2.33.0-rc.1...2.33.0-rc.2) (2021-11-12)


### Library - Fixes

* Hardcoding the name of the first part of the package ([#327](https://github.com/twilio/twilio-cli/issues/327)) ([67b44cb](https://github.com/twilio/twilio-cli/commit/67b44cb59bbaf69a80bb0de02fe73c526e728034)), closes [#313](https://github.com/twilio/twilio-cli/issues/313) [#312](https://github.com/twilio/twilio-cli/issues/312) [#318](https://github.com/twilio/twilio-cli/issues/318) [#289](https://github.com/twilio/twilio-cli/issues/289) [#287](https://github.com/twilio/twilio-cli/issues/287) [#284](https://github.com/twilio/twilio-cli/issues/284) [#286](https://github.com/twilio/twilio-cli/issues/286) [#285](https://github.com/twilio/twilio-cli/issues/285) [#294](https://github.com/twilio/twilio-cli/issues/294) [#295](https://github.com/twilio/twilio-cli/issues/295) [#293](https://github.com/twilio/twilio-cli/issues/293) [#297](https://github.com/twilio/twilio-cli/issues/297) [#298](https://github.com/twilio/twilio-cli/issues/298) [#301](https://github.com/twilio/twilio-cli/issues/301) [#304](https://github.com/twilio/twilio-cli/issues/304) [#310](https://github.com/twilio/twilio-cli/issues/310) [#306](https://github.com/twilio/twilio-cli/issues/306) [#315](https://github.com/twilio/twilio-cli/issues/315) [#316](https://github.com/twilio/twilio-cli/issues/316) [#289](https://github.com/twilio/twilio-cli/issues/289) [#281](https://github.com/twilio/twilio-cli/issues/281) [#298](https://github.com/twilio/twilio-cli/issues/298) [#287](https://github.com/twilio/twilio-cli/issues/287) [#284](https://github.com/twilio/twilio-cli/issues/284) [#304](https://github.com/twilio/twilio-cli/issues/304) [#312](https://github.com/twilio/twilio-cli/issues/312) [#286](https://github.com/twilio/twilio-cli/issues/286) [#285](https://github.com/twilio/twilio-cli/issues/285) [#283](https://github.com/twilio/twilio-cli/issues/283) [#294](https://github.com/twilio/twilio-cli/issues/294) [#285](https://github.com/twilio/twilio-cli/issues/285) [#279](https://github.com/twilio/twilio-cli/issues/279) [#301](https://github.com/twilio/twilio-cli/issues/301) [#280](https://github.com/twilio/twilio-cli/issues/280) [#313](https://github.com/twilio/twilio-cli/issues/313) [#295](https://github.com/twilio/twilio-cli/issues/295) [#293](https://github.com/twilio/twilio-cli/issues/293) [#310](https://github.com/twilio/twilio-cli/issues/310) [#318](https://github.com/twilio/twilio-cli/issues/318) [#297](https://github.com/twilio/twilio-cli/issues/297) [#306](https://github.com/twilio/twilio-cli/issues/306) [#315](https://github.com/twilio/twilio-cli/issues/315) [#316](https://github.com/twilio/twilio-cli/issues/316) [#321](https://github.com/twilio/twilio-cli/issues/321)
* Update release feature branch ([#330](https://github.com/twilio/twilio-cli/issues/330)) ([5878348](https://github.com/twilio/twilio-cli/commit/5878348a8ae9a8f5ba0c42a176f114ec841cb688)), closes [#257](https://github.com/twilio/twilio-cli/issues/257) [#259](https://github.com/twilio/twilio-cli/issues/259) [#262](https://github.com/twilio/twilio-cli/issues/262) [#264](https://github.com/twilio/twilio-cli/issues/264) [#265](https://github.com/twilio/twilio-cli/issues/265) [#266](https://github.com/twilio/twilio-cli/issues/266) [#267](https://github.com/twilio/twilio-cli/issues/267) [#269](https://github.com/twilio/twilio-cli/issues/269) [#270](https://github.com/twilio/twilio-cli/issues/270) [#273](https://github.com/twilio/twilio-cli/issues/273) [#275](https://github.com/twilio/twilio-cli/issues/275) [#261](https://github.com/twilio/twilio-cli/issues/261) [#268](https://github.com/twilio/twilio-cli/issues/268) [#274](https://github.com/twilio/twilio-cli/issues/274) [#272](https://github.com/twilio/twilio-cli/issues/272) [#278](https://github.com/twilio/twilio-cli/issues/278)
* Updated cli-core version with the latest rc tag. ([abe116e](https://github.com/twilio/twilio-cli/commit/abe116e87e1ec261ee6fc22ba33a84577fb0f194))

## [2.33.0-rc.1](https://github.com/twilio/twilio-cli/compare/2.32.1...2.33.0-rc.1) (2021-11-03)


### Library - Features

* Merging main into release-feature-branch ([#322](https://github.com/twilio/twilio-cli/issues/322)) ([ef1f6d3](https://github.com/twilio/twilio-cli/commit/ef1f6d3add577a038bda57bd91e6b17bb309831b))


### Library - Fixes

* Changing repo names ([#324](https://github.com/twilio/twilio-cli/issues/324)) ([3ff79d2](https://github.com/twilio/twilio-cli/commit/3ff79d27a5402d7095eee1bb255863225c9bda68)), closes [#313](https://github.com/twilio/twilio-cli/issues/313) [#312](https://github.com/twilio/twilio-cli/issues/312) [#318](https://github.com/twilio/twilio-cli/issues/318) [#289](https://github.com/twilio/twilio-cli/issues/289) [#287](https://github.com/twilio/twilio-cli/issues/287) [#284](https://github.com/twilio/twilio-cli/issues/284) [#286](https://github.com/twilio/twilio-cli/issues/286) [#285](https://github.com/twilio/twilio-cli/issues/285) [#294](https://github.com/twilio/twilio-cli/issues/294) [#295](https://github.com/twilio/twilio-cli/issues/295) [#293](https://github.com/twilio/twilio-cli/issues/293) [#297](https://github.com/twilio/twilio-cli/issues/297) [#298](https://github.com/twilio/twilio-cli/issues/298) [#301](https://github.com/twilio/twilio-cli/issues/301) [#304](https://github.com/twilio/twilio-cli/issues/304) [#310](https://github.com/twilio/twilio-cli/issues/310) [#306](https://github.com/twilio/twilio-cli/issues/306) [#315](https://github.com/twilio/twilio-cli/issues/315) [#316](https://github.com/twilio/twilio-cli/issues/316) [#289](https://github.com/twilio/twilio-cli/issues/289) [#281](https://github.com/twilio/twilio-cli/issues/281) [#298](https://github.com/twilio/twilio-cli/issues/298) [#287](https://github.com/twilio/twilio-cli/issues/287) [#284](https://github.com/twilio/twilio-cli/issues/284) [#304](https://github.com/twilio/twilio-cli/issues/304) [#312](https://github.com/twilio/twilio-cli/issues/312) [#286](https://github.com/twilio/twilio-cli/issues/286) [#285](https://github.com/twilio/twilio-cli/issues/285) [#283](https://github.com/twilio/twilio-cli/issues/283) [#294](https://github.com/twilio/twilio-cli/issues/294) [#285](https://github.com/twilio/twilio-cli/issues/285) [#279](https://github.com/twilio/twilio-cli/issues/279) [#301](https://github.com/twilio/twilio-cli/issues/301) [#280](https://github.com/twilio/twilio-cli/issues/280) [#313](https://github.com/twilio/twilio-cli/issues/313) [#295](https://github.com/twilio/twilio-cli/issues/295) [#293](https://github.com/twilio/twilio-cli/issues/293) [#310](https://github.com/twilio/twilio-cli/issues/310) [#318](https://github.com/twilio/twilio-cli/issues/318) [#297](https://github.com/twilio/twilio-cli/issues/297) [#306](https://github.com/twilio/twilio-cli/issues/306) [#315](https://github.com/twilio/twilio-cli/issues/315) [#316](https://github.com/twilio/twilio-cli/issues/316) [#321](https://github.com/twilio/twilio-cli/issues/321)

## [2.27.0-rc.1](https://github.com/shamantraghav/twilio-cli/compare/2.26.0...2.27.0-rc.1) (2021-10-27)


### Library - Chores

* **release:** set `package.json` to 2.30.0 [skip ci] ([c451e50](https://github.com/shamantraghav/twilio-cli/commit/c451e50810f0b17a5ba55147cc04a0751795bc02)), closes [#289](https://github.com/shamantraghav/twilio-cli/issues/289) [#287](https://github.com/shamantraghav/twilio-cli/issues/287) [#284](https://github.com/shamantraghav/twilio-cli/issues/284) [#286](https://github.com/shamantraghav/twilio-cli/issues/286) [#285](https://github.com/shamantraghav/twilio-cli/issues/285)
* **release:** set `package.json` to 2.30.1 [skip ci] ([60207e0](https://github.com/shamantraghav/twilio-cli/commit/60207e0362772f3ff045b816195e34f42b8e2209)), closes [#294](https://github.com/shamantraghav/twilio-cli/issues/294) [#295](https://github.com/shamantraghav/twilio-cli/issues/295) [#293](https://github.com/shamantraghav/twilio-cli/issues/293)
* **release:** set `package.json` to 2.30.2 [skip ci] ([e2143ca](https://github.com/shamantraghav/twilio-cli/commit/e2143cac602bbc07e1535727bd457a6b2346b0bd)), closes [#297](https://github.com/shamantraghav/twilio-cli/issues/297)
* **release:** set `package.json` to 2.31.0 [skip ci] ([7b46f83](https://github.com/shamantraghav/twilio-cli/commit/7b46f83369fc0077d00ffe95f578f75b14b72eb6)), closes [#298](https://github.com/shamantraghav/twilio-cli/issues/298) [#301](https://github.com/shamantraghav/twilio-cli/issues/301)
* **release:** set `package.json` to 2.32.0 [skip ci] ([4e0b6f2](https://github.com/shamantraghav/twilio-cli/commit/4e0b6f2e7b3ea4ee4baaed093c190fc509f389c3)), closes [#304](https://github.com/shamantraghav/twilio-cli/issues/304) [#310](https://github.com/shamantraghav/twilio-cli/issues/310)
* **release:** set `package.json` to 2.32.1 [skip ci] ([943c3d6](https://github.com/shamantraghav/twilio-cli/commit/943c3d6aa899190aca27c0f836b1449579e18eb2)), closes [#306](https://github.com/shamantraghav/twilio-cli/issues/306) [#315](https://github.com/shamantraghav/twilio-cli/issues/315) [#316](https://github.com/shamantraghav/twilio-cli/issues/316)
* Add docker workflow to github actions ([#289](https://github.com/shamantraghav/twilio-cli/issues/289)) ([7e9d233](https://github.com/shamantraghav/twilio-cli/commit/7e9d233a5299f0f108af97b3299d286c39bfa226))
* Custom help implementation for displaying required flags ([#281](https://github.com/shamantraghav/twilio-cli/issues/281)) ([ecc315a](https://github.com/shamantraghav/twilio-cli/commit/ecc315a006761f9afbc05c9958ad683fa8bf56d7))
* Replaced the community actions with the scripts ([#298](https://github.com/shamantraghav/twilio-cli/issues/298)) ([316aeb6](https://github.com/shamantraghav/twilio-cli/commit/316aeb6cc98beab8c145d9be1b93f381aea56cfb))
* rotate sonarcloud token ([30f7bc7](https://github.com/shamantraghav/twilio-cli/commit/30f7bc7435795db73a5ef7f01d7328eaa316d6aa))


### Library - Features

* Added github actions for publish to s3 and trigger homebrew release ([#287](https://github.com/shamantraghav/twilio-cli/issues/287)) ([5d7acd6](https://github.com/shamantraghav/twilio-cli/commit/5d7acd6f9d04361d3b5a43ff9bfc5ae5c9d3be38))
* Added the GitHub actions for cli ([#284](https://github.com/shamantraghav/twilio-cli/issues/284)) ([49e2376](https://github.com/shamantraghav/twilio-cli/commit/49e23764205487d132cf84cf7ad9ee7c11ca53d1))
* Added the slack notifications for Github actions ([#304](https://github.com/shamantraghav/twilio-cli/issues/304)) ([8a14fdb](https://github.com/shamantraghav/twilio-cli/commit/8a14fdb8afb650f1e656b4a3fd9e6b2186c835ff))
* Added the tests and sonarcloud jobs ([#312](https://github.com/shamantraghav/twilio-cli/issues/312)) ([bfc7d57](https://github.com/shamantraghav/twilio-cli/commit/bfc7d573919c6beb23acd9844a923cbf3fb885d4))
* DII 47 hyperlinks in help ([#290](https://github.com/shamantraghav/twilio-cli/issues/290)) ([ce15661](https://github.com/shamantraghav/twilio-cli/commit/ce156611cea15af15dee6fefd9761f31e8754a19)), closes [#286](https://github.com/shamantraghav/twilio-cli/issues/286) [#285](https://github.com/shamantraghav/twilio-cli/issues/285)
* link to our API docs when you --help ([#283](https://github.com/shamantraghav/twilio-cli/issues/283)) ([37a857d](https://github.com/shamantraghav/twilio-cli/commit/37a857d8ac587ec59d2912f9d2a00cfe77fcb5c3))


### Library - Fixes

* Add aws session token ([#294](https://github.com/shamantraghav/twilio-cli/issues/294)) ([8cfac65](https://github.com/shamantraghav/twilio-cli/commit/8cfac65755e445ff4c6c579704d4109fd4b859da))
* Added missing require statement ([#285](https://github.com/shamantraghav/twilio-cli/issues/285)) ([10179cc](https://github.com/shamantraghav/twilio-cli/commit/10179ccfb757e8b289802d4e41c940bd3e4fc1b1))
* Added the condition to check the tag regex ([#279](https://github.com/shamantraghav/twilio-cli/issues/279)) ([ce87562](https://github.com/shamantraghav/twilio-cli/commit/ce875622ad03ef31d9d702629d0a91fec089888d))
* Added the following changes: ([#301](https://github.com/shamantraghav/twilio-cli/issues/301)) ([c69e226](https://github.com/shamantraghav/twilio-cli/commit/c69e2261429eac4068854f3012d709d8e8f7841a))
* Fixing failing test on twilio-cli ([#280](https://github.com/shamantraghav/twilio-cli/issues/280)) ([01afb70](https://github.com/shamantraghav/twilio-cli/commit/01afb7006b127a067c02a94109c48f370a6b5379))
* Fixing the release issue ([#313](https://github.com/shamantraghav/twilio-cli/issues/313)) ([b893be6](https://github.com/shamantraghav/twilio-cli/commit/b893be61f0ca1543b8f8c5d0728ea1b7fcdfdbed))
* Fork docker release workflow ([#295](https://github.com/shamantraghav/twilio-cli/issues/295)) ([c669c06](https://github.com/shamantraghav/twilio-cli/commit/c669c0626e6a2aaacb638be2f9badc1f4c1acdbe))
* Hide tests showing non-deterministic behaviour ([#293](https://github.com/shamantraghav/twilio-cli/issues/293)) ([75aa40c](https://github.com/shamantraghav/twilio-cli/commit/75aa40c6671aac6c4e1be72b6c10cd443fbc7893))
* Pin node version to 14.18.1 in Dockerfile ([#310](https://github.com/shamantraghav/twilio-cli/issues/310)) ([0588491](https://github.com/shamantraghav/twilio-cli/commit/058849189a2d54695655f5f7b00b8a15eae90148))
* Pin peer dependency semantic-release ([#318](https://github.com/shamantraghav/twilio-cli/issues/318)) ([00ac1d8](https://github.com/shamantraghav/twilio-cli/commit/00ac1d8809b8c410445be67a7dc6f5154c2452de))
* replaceAll bug ([#297](https://github.com/shamantraghav/twilio-cli/issues/297)) ([3e85ed2](https://github.com/shamantraghav/twilio-cli/commit/3e85ed2b1223aa5111bcd4690fb55ae5e5dae26a))
* Revert "Resolve security vulnerability ([#306](https://github.com/shamantraghav/twilio-cli/issues/306))" ([#315](https://github.com/shamantraghav/twilio-cli/issues/315)) ([#316](https://github.com/shamantraghav/twilio-cli/issues/316)) ([53a2ded](https://github.com/shamantraghav/twilio-cli/commit/53a2ded1a89d22bcf18fd2602c89646a4287eb3c))
* Updated api definitions changelog in CHANGES.md ([3236031](https://github.com/shamantraghav/twilio-cli/commit/32360314cc5ec00f752138c4127c37d59669fe76))

---------------------------
**Api**
- Corrected enum values for  values in  response. **(breaking change)**
- Clarify  values in  response.

**Messaging**
- Add PUT and List brand vettings api
- Removes beta feature flag based visibility for us_app_to_person_registered and usecase field.Updates test cases to add POLITICAL usecase. **(breaking change)**
- Add brand_feedback as optional field to BrandRegistrations

**Video**
- Add  to create room### [2.30.1](https://github.com/twilio/twilio-cli/compare/2.30.0...2.30.1) (2021-09-24)


### Library - Fixes

* Add aws session token ([#294](https://github.com/twilio/twilio-cli/issues/294)) ([8cfac65](https://github.com/twilio/twilio-cli/commit/8cfac65755e445ff4c6c579704d4109fd4b859da))
* Fork docker release workflow ([#295](https://github.com/twilio/twilio-cli/issues/295)) ([c669c06](https://github.com/twilio/twilio-cli/commit/c669c0626e6a2aaacb638be2f9badc1f4c1acdbe))
* Hide tests showing non-deterministic behaviour ([#293](https://github.com/twilio/twilio-cli/issues/293)) ([75aa40c](https://github.com/twilio/twilio-cli/commit/75aa40c6671aac6c4e1be72b6c10cd443fbc7893))

## [2.32.0](https://github.com/twilio/twilio-cli/compare/2.31.0...2.32.0) (2021-10-19)


### Library - Features

* Added the slack notifications for Github actions ([#304](https://github.com/twilio/twilio-cli/issues/304)) ([8a14fdb](https://github.com/twilio/twilio-cli/commit/8a14fdb8afb650f1e656b4a3fd9e6b2186c835ff))


### Library - Fixes

* Pin node version to 14.18.1 in Dockerfile ([#310](https://github.com/twilio/twilio-cli/issues/310)) ([0588491](https://github.com/twilio/twilio-cli/commit/058849189a2d54695655f5f7b00b8a15eae90148))

---------------------------
**Api**
- Corrected enum values for  values in  response. **(breaking change)**
- Clarify  values in  response.

**Messaging**
- Add PUT and List brand vettings api
- Removes beta feature flag based visibility for us_app_to_person_registered and usecase field.Updates test cases to add POLITICAL usecase. **(breaking change)**
- Add brand_feedback as optional field to BrandRegistrations

**Video**
- Add  to create room## [2.31.0](https://github.com/twilio/twilio-cli/compare/2.30.2...2.31.0) (2021-10-07)


### Library - Chores

* Replaced the community actions with the scripts ([#298](https://github.com/twilio/twilio-cli/issues/298)) ([316aeb6](https://github.com/twilio/twilio-cli/commit/316aeb6cc98beab8c145d9be1b93f381aea56cfb))


### Library - Fixes

* Added the following changes: ([#301](https://github.com/twilio/twilio-cli/issues/301)) ([c69e226](https://github.com/twilio/twilio-cli/commit/c69e2261429eac4068854f3012d709d8e8f7841a))

---------------------------
**Library - Fix**
- [PR #44](https://github.com/twilio/twilio-oai/pull/44): fix naming of params. Thanks to [@shwetha-manvinkurke](https://github.com/shwetha-manvinkurke)!

**Api**
- Add  attribute to  response.
- Add  resource

**Conversations**
- Added attachment parameters in configuration for  type of push notifications

**Flex**
- Adding  object to Flex Configuration

**Numbers**
- Add API endpoint for Bundle ReplaceItems resource
- Add API endpoint for Bundle Copies resource

**Serverless**
- Add domain_base field to Service response

**Taskrouter**
- Add  Header based on ETag for Worker Delete **(breaking change)**
- Add  Header based on Etag for Reservation Update
- Add  Header based on ETag for Worker Update
- Add  Header based on ETag for Worker Delete
- Add  as Response Header to Worker

**Trunking**
- Added  property on Trunks.

**Verify**
- Document new pilot  channel.### [2.30.2](https://github.com/twilio/twilio-cli/compare/2.30.1...2.30.2) (2021-09-24)


### Library - Fixes

* replaceAll bug ([#297](https://github.com/twilio/twilio-cli/issues/297)) ([3e85ed2](https://github.com/twilio/twilio-cli/commit/3e85ed2b1223aa5111bcd4690fb55ae5e5dae26a))

### [2.30.1](https://github.com/twilio/twilio-cli/compare/2.30.0...2.30.1) (2021-09-24)


### Library - Fixes

* Add aws session token ([#294](https://github.com/twilio/twilio-cli/issues/294)) ([8cfac65](https://github.com/twilio/twilio-cli/commit/8cfac65755e445ff4c6c579704d4109fd4b859da))
* Fork docker release workflow ([#295](https://github.com/twilio/twilio-cli/issues/295)) ([c669c06](https://github.com/twilio/twilio-cli/commit/c669c0626e6a2aaacb638be2f9badc1f4c1acdbe))
* Hide tests showing non-deterministic behaviour ([#293](https://github.com/twilio/twilio-cli/issues/293)) ([75aa40c](https://github.com/twilio/twilio-cli/commit/75aa40c6671aac6c4e1be72b6c10cd443fbc7893))

## [2.30.0](https://github.com/twilio/twilio-cli/compare/2.29.1...2.30.0) (2021-09-23)


### Library - Chores

* Add docker workflow to github actions ([#289](https://github.com/twilio/twilio-cli/issues/289)) ([7e9d233](https://github.com/twilio/twilio-cli/commit/7e9d233a5299f0f108af97b3299d286c39bfa226))


### Library - Features

* Added github actions for publish to s3 and trigger homebrew release ([#287](https://github.com/twilio/twilio-cli/issues/287)) ([5d7acd6](https://github.com/twilio/twilio-cli/commit/5d7acd6f9d04361d3b5a43ff9bfc5ae5c9d3be38))
* Added the GitHub actions for cli ([#284](https://github.com/twilio/twilio-cli/issues/284)) ([49e2376](https://github.com/twilio/twilio-cli/commit/49e23764205487d132cf84cf7ad9ee7c11ca53d1))
* DII 47 hyperlinks in help ([#290](https://github.com/twilio/twilio-cli/issues/290)) ([ce15661](https://github.com/twilio/twilio-cli/commit/ce156611cea15af15dee6fefd9761f31e8754a19)), closes [#286](https://github.com/twilio/twilio-cli/issues/286) [#285](https://github.com/twilio/twilio-cli/issues/285)


### Library - Fixes

* Updated api definitions changelog in CHANGES.md ([3236031](https://github.com/twilio/twilio-cli/commit/32360314cc5ec00f752138c4127c37d59669fe76))

---------------------------
**Events**
- Add segment sink

**Messaging**
- Add post_approval_required attribute in GET us_app_to_person_usecase api response
- Add Identity Status, Russell 3000, Tax Exempt Status and Should Skip SecVet fields for Brand Registrations
- Add Should Skip Secondary Vetting optional flag parameter to create Brand APItwilio-cli changelog
=====================

[2021-09-09] Version 2.29.1
---------------------------
**Library - Fix**
- [PR #285](https://github.com/twilio/twilio-cli/pull/285): Added missing require statement. Thanks to [@ravali-rimmalapudi](https://github.com/ravali-rimmalapudi)!

**Messaging**
- Add Identity Status, Russell 3000, Tax Exempt Status and Should Skip SecVet fields for Brand Registrations
- Add Should Skip Secondary Vetting optional flag parameter to create Brand API


[2021-09-09] Version 2.29.0
---------------------------
**Library - Feature**
- [PR #283](https://github.com/twilio/twilio-cli/pull/283): link to our API docs when you --help. Thanks to [@shrutiburman](https://github.com/shrutiburman)!

**Api**
- Revert adding `siprec` resource
- Add `siprec` resource

**Messaging**
- Add 'mock' as an optional field to brand_registration api
- Add 'mock' as an optional field to us_app_to_person api
- Adds more Use Cases in us_app_to_person_usecase api transaction and updates us_app_to_person_usecase docs

**Verify**
- Verify List Templates API endpoint added.


[2021-08-26] Version 2.28.1
---------------------------
**Library - Chore**
- [PR #281](https://github.com/twilio/twilio-cli/pull/281): Custom help implementation for displaying required flags. Thanks to [@onuzbee](https://github.com/onuzbee)!

**Api**
- Add Programmabled Voice SIP Refer call transfers (`calls-transfers`) to usage records
- Add Flex Voice Usage category (`flex-usage`) to usage records

**Conversations**
- Add `Order` query parameter to Message resource read operation

**Insights**
- Added `partial` to enum processing_state_request
- Added abnormal session filter in Call Summaries

**Messaging**
- Add brand_registration_sid as an optional query param for us_app_to_person_usecase api

**Pricing**
- add trunking_numbers resource (v2)
- add trunking_country resource (v2)

**Verify**
- Changed to private beta the `TemplateSid` optional parameter on Verification creation.
- Added the optional parameter `Order` to the list Challenges endpoint to define the list order.


[2021-08-12] Version 2.28.0
---------------------------
**Library - Fix**
- [PR #280](https://github.com/twilio/twilio-cli/pull/280): Fixing failing test on twilio-cli. Thanks to [@kridai](https://github.com/kridai)!
- [PR #279](https://github.com/twilio/twilio-cli/pull/279): Added the condition to check the tag regex. Thanks to [@ravali-rimmalapudi](https://github.com/ravali-rimmalapudi)!

**Library - Chore**
- [PR #276](https://github.com/twilio/twilio-cli/pull/276): Add sonarcloud configurations. Thanks to [@onuzbee](https://github.com/onuzbee)!

**Api**
- Corrected the `price`, `call_sid_to_coach`, and `uri` data types for Conference, Participant, and Recording **(breaking change)**
- Made documentation for property `time_limit` in the call api public. **(breaking change)**

**Insights**
- Added new endpoint to fetch Call Summaries

**Messaging**
- Revert brand registration api update to add brand_type field
- Add brand_type field to a2p brand_registration api

**Taskrouter**
- Add `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and `X-Rate-Limit-Config` as Response Headers to all TaskRouter endpoints

**Verify**
- Add `TemplateSid` optional parameter on Verification creation.
- Include `whatsapp` as a channel type in the verifications API.


[2021-07-29] Version 2.27.1
---------------------------
**Messaging**
- Add brand_type field to a2p brand_registration api

[2021-07-29] Version 2.27.1-rc
------------------------------
**Library - Fix**
- [PR #275](https://github.com/twilio/twilio-cli/pull/275): Update release-feature-branch with main. Thanks to [@ravali-rimmalapudi](https://github.com/ravali-rimmalapudi)!


[2021-07-29] Version 2.27.0
---------------------------
**Api**
- Added `domain_sid` in sip_credential_list_mapping and sip_ip_access_control_list_mapping APIs **(breaking change)**

**Conversations**
- Expose ParticipantConversations resource

**Taskrouter**
- Adding `links` to the activity resource

**Verify**
- Added a `Version` to Verify Factors `Webhooks` to add new fields without breaking old Webhooks.


[2021-07-15] Version 2.26.0
---------------------------
**Library - Chore**
- [PR #268](https://github.com/twilio/twilio-cli/pull/268): updating plugin-help version. Thanks to [@kridai](https://github.com/kridai)!

**Conversations**
- Changed `last_read_message_index` and `unread_messages_count` type in User Conversation's resource **(breaking change)**
- Expose UserConversations resource

**Messaging**
- Add brand_score field to brand registration responses

**Supersim**
- Add Billing Period resource for the Super Sim Pilot
- Add List endpoint to Billing Period resource for Super Sim Pilot
- Add Fetch endpoint to Billing Period resource for Super Sim Pilot

**Taskrouter**
- Update `transcribe` & `transcription_configuration` form params in Reservation update endpoint to have private visibility **(breaking change)**


[2021-06-22] Version 2.25.0
---------------------------
**Library - Feature**
- [PR #261](https://github.com/twilio/twilio-cli/pull/261): add assets plugin to available plugins. Thanks to [@philnash](https://github.com/philnash)!

**Api**
- Update `status` enum for Messages to include 'canceled'
- Update `update_status` enum for Messages to include 'canceled'

**Conversations**
- Read-only Conversation Email Binding property `binding`

**Events**
- join Sinks and Subscriptions service

**Taskrouter**
- Add `transcribe` & `transcription_configuration` form params to Reservation update endpoint

**Trusthub**
- Corrected the sid for policy sid in customer_profile_evaluation.json and trust_product_evaluation.json **(breaking change)**

**Verify**
- Improved the documentation of `challenge` adding the maximum and minimum expected lengths of some fields.
- Improve documentation regarding `notification` by updating the documentation of the field `ttl`.


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
