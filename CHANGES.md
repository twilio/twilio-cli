## 1.0.0 (2021-11-17)


### ⚠ BREAKING CHANGES

* bump CLI core to pick up breaking camelCase change (#171)
* raise Node requirement to v10 and upgrade dependencies (#170)

### Library - Docs

* add regional flag and regional/edge env vars to general usage doc ([#206](https://github.com/shrutiburman/twilio-cli/issues/206)) ([911a63b](https://github.com/shrutiburman/twilio-cli/commit/911a63b009bdd80479ccc1f708665bd2876ae093))
* add test credentials disclaimer ([#250](https://github.com/shrutiburman/twilio-cli/issues/250)) ([0a1b331](https://github.com/shrutiburman/twilio-cli/commit/0a1b33183770ced0858e1346ca11b7be0ef26df9))
* baseline all the templated markdown docs ([#152](https://github.com/shrutiburman/twilio-cli/issues/152)) ([124edba](https://github.com/shrutiburman/twilio-cli/commit/124edbaaa64b7fb8c89e4a1238c5901ed21a2152))
* how to use the CLI to interact with Twilio subaccounts ([#194](https://github.com/shrutiburman/twilio-cli/issues/194)) ([1b98879](https://github.com/shrutiburman/twilio-cli/commit/1b98879b5f7e68cdcb6f82f8cc532d1832424360))
* remove internal changelong entires ([fb16954](https://github.com/shrutiburman/twilio-cli/commit/fb16954dda4a40ff028ab690a18ae2a79f5f5d11))
* remove the note about time filtering not working when listing monitor alerts ([5b04c41](https://github.com/shrutiburman/twilio-cli/commit/5b04c412744aa5463da0b798c814def8936563e8))
* Update templated markdown docs to use new default branch name ([1a63983](https://github.com/shrutiburman/twilio-cli/commit/1a63983a68017411c0a5770050a7b85f74a3b53a))
* update the wording for the env vars setup ([bfd765f](https://github.com/shrutiburman/twilio-cli/commit/bfd765f7e31f368fcb6fe04572977b68cba14f11))


### Library - Features

* add '--no-attachment' option to 'email:send' ([#169](https://github.com/shrutiburman/twilio-cli/issues/169)) ([bb9de3d](https://github.com/shrutiburman/twilio-cli/commit/bb9de3ddf1f961a2445d6aaddd00fc5500d19353))
* add 'plugins:available' command that lists trusted, uninstalled plugins ([#193](https://github.com/shrutiburman/twilio-cli/issues/193)) ([ef04bad](https://github.com/shrutiburman/twilio-cli/commit/ef04bade8ac79c356dd7772787c658bff2360779)), closes [#117](https://github.com/shrutiburman/twilio-cli/issues/117)
* add assets plugin to available plugins ([#261](https://github.com/shrutiburman/twilio-cli/issues/261)) ([3fbd71d](https://github.com/shrutiburman/twilio-cli/commit/3fbd71df49e48e1da6015bebd5d3187cf991f374))
* add custom HTTP header parameter support ([#200](https://github.com/shrutiburman/twilio-cli/issues/200)) ([1fef00e](https://github.com/shrutiburman/twilio-cli/commit/1fef00e601124d5d858393e6cbe1b2198304f117))
* add signal2020 plugin to known commands list ([#220](https://github.com/shrutiburman/twilio-cli/issues/220)) ([2553fc7](https://github.com/shrutiburman/twilio-cli/commit/2553fc71a13cbffdf71078486aa5623b4c28bf77))
* add the official autopilot plugin to the trusted plugins list ([#142](https://github.com/shrutiburman/twilio-cli/issues/142)) ([89ccd40](https://github.com/shrutiburman/twilio-cli/commit/89ccd401809088788efe02b6eda08564970ea087))
* Added github actions for publish to s3 and trigger homebrew release ([#287](https://github.com/shrutiburman/twilio-cli/issues/287)) ([5d7acd6](https://github.com/shrutiburman/twilio-cli/commit/5d7acd6f9d04361d3b5a43ff9bfc5ae5c9d3be38))
* Added the GitHub actions for cli ([#284](https://github.com/shrutiburman/twilio-cli/issues/284)) ([49e2376](https://github.com/shrutiburman/twilio-cli/commit/49e23764205487d132cf84cf7ad9ee7c11ca53d1))
* Added the slack notifications for Github actions ([#304](https://github.com/shrutiburman/twilio-cli/issues/304)) ([8a14fdb](https://github.com/shrutiburman/twilio-cli/commit/8a14fdb8afb650f1e656b4a3fd9e6b2186c835ff))
* Added the tests and sonarcloud jobs ([#312](https://github.com/shrutiburman/twilio-cli/issues/312)) ([bfc7d57](https://github.com/shrutiburman/twilio-cli/commit/bfc7d573919c6beb23acd9844a923cbf3fb885d4))
* block installation via npm when Node.js requirement not met ([#208](https://github.com/shrutiburman/twilio-cli/issues/208)) ([d58017d](https://github.com/shrutiburman/twilio-cli/commit/d58017d68224dbe0f531cc3234b3f46aa935afb8))
* Content-type detection for attachments in email:send ([#167](https://github.com/shrutiburman/twilio-cli/issues/167)) ([785c74c](https://github.com/shrutiburman/twilio-cli/commit/785c74cf9cea371e21b541294c391f37aae3d669))
* DII 47 hyperlinks in help ([#290](https://github.com/shrutiburman/twilio-cli/issues/290)) ([ce15661](https://github.com/shrutiburman/twilio-cli/commit/ce156611cea15af15dee6fefd9761f31e8754a19)), closes [#286](https://github.com/shrutiburman/twilio-cli/issues/286) [#285](https://github.com/shrutiburman/twilio-cli/issues/285)
* link to our API docs when you --help ([#283](https://github.com/shrutiburman/twilio-cli/issues/283)) ([37a857d](https://github.com/shrutiburman/twilio-cli/commit/37a857d8ac587ec59d2912f9d2a00cfe77fcb5c3))
* Makes file paths with tildes work for email:send ([#218](https://github.com/shrutiburman/twilio-cli/issues/218)) ([4601971](https://github.com/shrutiburman/twilio-cli/commit/46019716dc701d8974718029dc38d62b97cab8b8))
* move Twilio (Sub)Account APIs to their own topic ([#195](https://github.com/shrutiburman/twilio-cli/issues/195)) ([35340f3](https://github.com/shrutiburman/twilio-cli/commit/35340f34b9aeaf12a875f69f74f514cb41f537e6))
* prompt to install known plugin when command is not found ([#191](https://github.com/shrutiburman/twilio-cli/issues/191)) ([f64acf5](https://github.com/shrutiburman/twilio-cli/commit/f64acf56348f7aa73ec31fd05a2fd57a53eda17e))
* sanity check the account SID and auth token when creating profiles ([#153](https://github.com/shrutiburman/twilio-cli/issues/153)) ([174fd53](https://github.com/shrutiburman/twilio-cli/commit/174fd535ca3452572ed65c3bd4e4acdb835501d6))
* update the mechanics of the login command ([#156](https://github.com/shrutiburman/twilio-cli/issues/156)) ([a3f8e02](https://github.com/shrutiburman/twilio-cli/commit/a3f8e0206216bad05d9454fbb15ea40b6d1f1740))


### Library - Chores

* **release:** set `package.json` to 2.33.0 [skip ci] ([678c7ce](https://github.com/shrutiburman/twilio-cli/commit/678c7cec50929436132bf96683cad5993426100f)), closes [#312](https://github.com/shrutiburman/twilio-cli/issues/312) [#313](https://github.com/shrutiburman/twilio-cli/issues/313) [#318](https://github.com/shrutiburman/twilio-cli/issues/318) [#321](https://github.com/shrutiburman/twilio-cli/issues/321)
* Add xz compression for tarballs ([#321](https://github.com/shrutiburman/twilio-cli/issues/321)) ([9bd5494](https://github.com/shrutiburman/twilio-cli/commit/9bd5494264600ace8bd27752a1da59fecf53eda9))
* **release:** set `package.json` to 2.30.0 [skip ci] ([c451e50](https://github.com/shrutiburman/twilio-cli/commit/c451e50810f0b17a5ba55147cc04a0751795bc02)), closes [#289](https://github.com/shrutiburman/twilio-cli/issues/289) [#287](https://github.com/shrutiburman/twilio-cli/issues/287) [#284](https://github.com/shrutiburman/twilio-cli/issues/284) [#286](https://github.com/shrutiburman/twilio-cli/issues/286) [#285](https://github.com/shrutiburman/twilio-cli/issues/285)
* **release:** set `package.json` to 2.30.1 [skip ci] ([60207e0](https://github.com/shrutiburman/twilio-cli/commit/60207e0362772f3ff045b816195e34f42b8e2209)), closes [#294](https://github.com/shrutiburman/twilio-cli/issues/294) [#295](https://github.com/shrutiburman/twilio-cli/issues/295) [#293](https://github.com/shrutiburman/twilio-cli/issues/293)
* **release:** set `package.json` to 2.30.2 [skip ci] ([e2143ca](https://github.com/shrutiburman/twilio-cli/commit/e2143cac602bbc07e1535727bd457a6b2346b0bd)), closes [#297](https://github.com/shrutiburman/twilio-cli/issues/297)
* **release:** set `package.json` to 2.31.0 [skip ci] ([7b46f83](https://github.com/shrutiburman/twilio-cli/commit/7b46f83369fc0077d00ffe95f578f75b14b72eb6)), closes [#298](https://github.com/shrutiburman/twilio-cli/issues/298) [#301](https://github.com/shrutiburman/twilio-cli/issues/301)
* **release:** set `package.json` to 2.32.0 [skip ci] ([4e0b6f2](https://github.com/shrutiburman/twilio-cli/commit/4e0b6f2e7b3ea4ee4baaed093c190fc509f389c3)), closes [#304](https://github.com/shrutiburman/twilio-cli/issues/304) [#310](https://github.com/shrutiburman/twilio-cli/issues/310)
* **release:** set `package.json` to 2.32.1 [skip ci] ([943c3d6](https://github.com/shrutiburman/twilio-cli/commit/943c3d6aa899190aca27c0f836b1449579e18eb2)), closes [#306](https://github.com/shrutiburman/twilio-cli/issues/306) [#315](https://github.com/shrutiburman/twilio-cli/issues/315) [#316](https://github.com/shrutiburman/twilio-cli/issues/316)
* Add docker workflow to github actions ([#289](https://github.com/shrutiburman/twilio-cli/issues/289)) ([7e9d233](https://github.com/shrutiburman/twilio-cli/commit/7e9d233a5299f0f108af97b3299d286c39bfa226))
* bump CLI core to pick up breaking camelCase change ([#171](https://github.com/shrutiburman/twilio-cli/issues/171)) ([678b87b](https://github.com/shrutiburman/twilio-cli/commit/678b87b39a4479c453417743db33bf606ae5b2f5))
* Custom help implementation for displaying required flags ([#281](https://github.com/shrutiburman/twilio-cli/issues/281)) ([ecc315a](https://github.com/shrutiburman/twilio-cli/commit/ecc315a006761f9afbc05c9958ad683fa8bf56d7))
* drop codecov from appveyor ([985c916](https://github.com/shrutiburman/twilio-cli/commit/985c91692e9c394d88f6e026f697db0399ccc9a7))
* Indicate environment variables being used in profiles:list ([#247](https://github.com/shrutiburman/twilio-cli/issues/247)) ([cc67cd3](https://github.com/shrutiburman/twilio-cli/commit/cc67cd307056745eb14fb4515419a7077547deb5))
* lint using twilio-style ([#204](https://github.com/shrutiburman/twilio-cli/issues/204)) ([0b600bc](https://github.com/shrutiburman/twilio-cli/commit/0b600bc82d365a713a4ebe6385a997e69c6a93a7))
* move encrypted tokens to environment variables ([8bd2192](https://github.com/shrutiburman/twilio-cli/commit/8bd21920efedd94f574a399005518070c86f0887))
* move the debugger command out of the debugger plugin ([#161](https://github.com/shrutiburman/twilio-cli/issues/161)) ([a57eba3](https://github.com/shrutiburman/twilio-cli/commit/a57eba3ae2dde6904d1fcadc888b6aacfdd3b803))
* Pin eslint dependencies ([67b34fa](https://github.com/shrutiburman/twilio-cli/commit/67b34fa51d8c98a4b84edec666c49553465aedbf))
* raise Node requirement to v10 and upgrade dependencies ([#170](https://github.com/shrutiburman/twilio-cli/issues/170)) ([15de108](https://github.com/shrutiburman/twilio-cli/commit/15de108c1a1ea55398e3934757533d971a31bf8a))
* refactor reading data from file or stdin ([#158](https://github.com/shrutiburman/twilio-cli/issues/158)) ([66a8ac6](https://github.com/shrutiburman/twilio-cli/commit/66a8ac6635b54f89d7358277d3504faf3cf1e2f1))
* remove preview gate ([#243](https://github.com/shrutiburman/twilio-cli/issues/243)) ([39bb467](https://github.com/shrutiburman/twilio-cli/commit/39bb4678ee4d850057365a527e0264cc2f788956))
* replace tags with vendor extension ([#234](https://github.com/shrutiburman/twilio-cli/issues/234)) ([4e91b40](https://github.com/shrutiburman/twilio-cli/commit/4e91b40ab203b69c12b4be8bcc9f7fbfcef7b2d1))
* Replaced the community actions with the scripts ([#298](https://github.com/shrutiburman/twilio-cli/issues/298)) ([316aeb6](https://github.com/shrutiburman/twilio-cli/commit/316aeb6cc98beab8c145d9be1b93f381aea56cfb))
* rotate slack token ([8a98d98](https://github.com/shrutiburman/twilio-cli/commit/8a98d98a7775b0890f9ed136209dcd763eb8476b))
* rotate sonarcloud token ([30f7bc7](https://github.com/shrutiburman/twilio-cli/commit/30f7bc7435795db73a5ef7f01d7328eaa316d6aa))
* update badge ([a84e82d](https://github.com/shrutiburman/twilio-cli/commit/a84e82d1e6885c8a42a5d20660e405a49e5a8d89))
* update CI config to use new default branch name ([293cff5](https://github.com/shrutiburman/twilio-cli/commit/293cff5b0f2de6757fe563d0d97795d6429a963c))
* update dependencies ([#136](https://github.com/shrutiburman/twilio-cli/issues/136)) ([f927a8b](https://github.com/shrutiburman/twilio-cli/commit/f927a8b96979bb7199ebfba3d6d388eaabb1502b))
* update dependencies after audit ([a95c460](https://github.com/shrutiburman/twilio-cli/commit/a95c46034e7f5b1a8c4b651070938d0712f30920))
* update dependencies after audit ([5f45bc9](https://github.com/shrutiburman/twilio-cli/commit/5f45bc93314c6dbdfc9563b720c07f1b60238ce8))
* update GitHub branch references to use HEAD ([#210](https://github.com/shrutiburman/twilio-cli/issues/210)) ([b69c987](https://github.com/shrutiburman/twilio-cli/commit/b69c98786f80b6967d64b9edb038af30871878a3))
* update README to reflect default branch rename ([91208e8](https://github.com/shrutiburman/twilio-cli/commit/91208e833bfbc0405837ff04978ce76a9cad9985))
* update template files ([bf540d4](https://github.com/shrutiburman/twilio-cli/commit/bf540d414d59eef0650fc8813fa3b61115f62217))
* update template files ([6ac6563](https://github.com/shrutiburman/twilio-cli/commit/6ac6563e60a56d9d306dd3bf0300d3f7ae4aa43f))
* update template files ([43a7cd9](https://github.com/shrutiburman/twilio-cli/commit/43a7cd94977d2b0279d54362a1b1fb093b75baae))
* update template files and dependencies ([#237](https://github.com/shrutiburman/twilio-cli/issues/237)) ([96cd74e](https://github.com/shrutiburman/twilio-cli/commit/96cd74e4408c975b03ab173ccf6092394101f7f2))
* update Travis CI Slack notifications ([65f937d](https://github.com/shrutiburman/twilio-cli/commit/65f937d97974d8aecc3d912a75988c1bac981ba9))
* Updating help description to include the quickstart doc url ([#248](https://github.com/shrutiburman/twilio-cli/issues/248)) ([bd8fb41](https://github.com/shrutiburman/twilio-cli/commit/bd8fb413d78bc9f59902d133d3dc2820c1203928))
* updating plugin-help version ([#268](https://github.com/shrutiburman/twilio-cli/issues/268)) ([bb1384b](https://github.com/shrutiburman/twilio-cli/commit/bb1384bede008a5fc39092ce3393c8ec443001dd))
* upgrade dev dependencies ([5df6b15](https://github.com/shrutiburman/twilio-cli/commit/5df6b15505e3733fa2e83d6d394fa127811e1254))
* upgrade dev dependencies and fix eslint errors/warnings ([#157](https://github.com/shrutiburman/twilio-cli/issues/157)) ([151e3cc](https://github.com/shrutiburman/twilio-cli/commit/151e3cc4f1f893b16e04ef701970fe4fd6323a1d))


### Library - Fixes

* Add aws session token ([#294](https://github.com/shrutiburman/twilio-cli/issues/294)) ([8cfac65](https://github.com/shrutiburman/twilio-cli/commit/8cfac65755e445ff4c6c579704d4109fd4b859da))
* Added changes for lcov ([#319](https://github.com/shrutiburman/twilio-cli/issues/319)) ([43cc6ad](https://github.com/shrutiburman/twilio-cli/commit/43cc6adefea72c08f63bea1574fab35ffa6ded54))
* added in @oclif/color 0.1.0 dependency ([#172](https://github.com/shrutiburman/twilio-cli/issues/172)) ([2096a8d](https://github.com/shrutiburman/twilio-cli/commit/2096a8d17158a4f040d6c192faf971f508590135))
* Added missing require statement ([#285](https://github.com/shrutiburman/twilio-cli/issues/285)) ([10179cc](https://github.com/shrutiburman/twilio-cli/commit/10179ccfb757e8b289802d4e41c940bd3e4fc1b1))
* Added the condition to check the tag regex ([#279](https://github.com/shrutiburman/twilio-cli/issues/279)) ([ce87562](https://github.com/shrutiburman/twilio-cli/commit/ce875622ad03ef31d9d702629d0a91fec089888d))
* Added the following changes: ([#301](https://github.com/shrutiburman/twilio-cli/issues/301)) ([c69e226](https://github.com/shrutiburman/twilio-cli/commit/c69e2261429eac4068854f3012d709d8e8f7841a))
* allow login when no user has no username ([#155](https://github.com/shrutiburman/twilio-cli/issues/155)) ([7d4b55c](https://github.com/shrutiburman/twilio-cli/commit/7d4b55c4c8765c51f44b9dd380cd983584361af0))
* commands with actions without parameters ([#230](https://github.com/shrutiburman/twilio-cli/issues/230)) ([45b766c](https://github.com/shrutiburman/twilio-cli/commit/45b766cbbb1b21211960e56e392bacd648bc99db))
* conform to eslint guidelines ([#254](https://github.com/shrutiburman/twilio-cli/issues/254)) ([13173be](https://github.com/shrutiburman/twilio-cli/commit/13173be624ddb6c69aef239f59ae0b487e42b874))
* Disable hyperlinks in Ubuntu ([#329](https://github.com/shrutiburman/twilio-cli/issues/329)) ([14f7cb3](https://github.com/shrutiburman/twilio-cli/commit/14f7cb3560a02091550d5f26c86bfd19ca8a1607))
* don't debug log the API key secret when creating profiles ([#199](https://github.com/shrutiburman/twilio-cli/issues/199)) ([00666ea](https://github.com/shrutiburman/twilio-cli/commit/00666ea56295a2a63dcbaf0567efced2df62ea46))
* don't get so fancy with the font color scheme ([#198](https://github.com/shrutiburman/twilio-cli/issues/198)) ([a640c6a](https://github.com/shrutiburman/twilio-cli/commit/a640c6a8bb1ff190939372af07e67862230ac570))
* Don't overwrite parameters when building request ([#141](https://github.com/shrutiburman/twilio-cli/issues/141)) ([edc3da9](https://github.com/shrutiburman/twilio-cli/commit/edc3da9a52cd64bf4f1612512b679847bb44c46f))
* drop the lock file checkout step during packaging ([bdb9c82](https://github.com/shrutiburman/twilio-cli/commit/bdb9c82c375f283d59195518a7cf1f2d61e076b9))
* drop the lock file since it doesn't get published ([#143](https://github.com/shrutiburman/twilio-cli/issues/143)) ([a75f95a](https://github.com/shrutiburman/twilio-cli/commit/a75f95a6b372d8fd44eaa9f007fdbdf27d996466))
* dynamically install ngrok and zork if needed ([#138](https://github.com/shrutiburman/twilio-cli/issues/138)) ([28da6b6](https://github.com/shrutiburman/twilio-cli/commit/28da6b6cf9e9508e195502d77ed179ebca7ee229))
* eagerly load keytar during profile creation ([#139](https://github.com/shrutiburman/twilio-cli/issues/139)) ([e505e17](https://github.com/shrutiburman/twilio-cli/commit/e505e179577e9d3e9fc689a92709e6be1b635ab4))
* Fixing failing test on twilio-cli ([#280](https://github.com/shrutiburman/twilio-cli/issues/280)) ([01afb70](https://github.com/shrutiburman/twilio-cli/commit/01afb7006b127a067c02a94109c48f370a6b5379))
* Fixing the release issue ([#313](https://github.com/shrutiburman/twilio-cli/issues/313)) ([b893be6](https://github.com/shrutiburman/twilio-cli/commit/b893be61f0ca1543b8f8c5d0728ea1b7fcdfdbed))
* Fork docker release workflow ([#295](https://github.com/shrutiburman/twilio-cli/issues/295)) ([c669c06](https://github.com/shrutiburman/twilio-cli/commit/c669c0626e6a2aaacb638be2f9badc1f4c1acdbe))
* Hide tests showing non-deterministic behaviour ([#293](https://github.com/shrutiburman/twilio-cli/issues/293)) ([75aa40c](https://github.com/shrutiburman/twilio-cli/commit/75aa40c6671aac6c4e1be72b6c10cd443fbc7893))
* increase Node minimum version requirement to 10.12.0 ([#91](https://github.com/shrutiburman/twilio-cli/issues/91)) ([ce196d0](https://github.com/shrutiburman/twilio-cli/commit/ce196d0316c36264f8be216cda67205731f8c543))
* make ngrok an optional dependency since it is installed at runtime ([#140](https://github.com/shrutiburman/twilio-cli/issues/140)) ([6982963](https://github.com/shrutiburman/twilio-cli/commit/6982963eb71f44b38fc12ce7ab518132fcd53cfe))
* move the mocha config file to the project root ([3f4aefd](https://github.com/shrutiburman/twilio-cli/commit/3f4aefd9ff8ff498630f223097c4545034aea19d))
* move the plugin-install hook handler out of the init folder ([bd8f030](https://github.com/shrutiburman/twilio-cli/commit/bd8f03030000a6f04dfffa34008f57749337ea30))
* no more ignoring low severity vulnerabilities ([79c008f](https://github.com/shrutiburman/twilio-cli/commit/79c008fdf064bcff0b4a90b21fd6e4145b360b1e))
* pin 'tslib' to avoid issues when interacting with plugin-plugins ([#189](https://github.com/shrutiburman/twilio-cli/issues/189)) ([b558f27](https://github.com/shrutiburman/twilio-cli/commit/b558f27f0cd0062705887d2d39322cbba822ad5c))
* Pin node version to 14.18.1 in Dockerfile ([#310](https://github.com/shrutiburman/twilio-cli/issues/310)) ([0588491](https://github.com/shrutiburman/twilio-cli/commit/058849189a2d54695655f5f7b00b8a15eae90148))
* Pin peer dependency semantic-release ([#318](https://github.com/shrutiburman/twilio-cli/issues/318)) ([00ac1d8](https://github.com/shrutiburman/twilio-cli/commit/00ac1d8809b8c410445be67a7dc6f5154c2452de))
* remove the profile option from the "profiles:remove" command ([#226](https://github.com/shrutiburman/twilio-cli/issues/226)) ([cb58d24](https://github.com/shrutiburman/twilio-cli/commit/cb58d24a75d16cb42f9d6b50f45c55a16e4f555d))
* replaceAll bug ([#297](https://github.com/shrutiburman/twilio-cli/issues/297)) ([3e85ed2](https://github.com/shrutiburman/twilio-cli/commit/3e85ed2b1223aa5111bcd4690fb55ae5e5dae26a))
* Revert "Resolve security vulnerability ([#306](https://github.com/shrutiburman/twilio-cli/issues/306))" ([#315](https://github.com/shrutiburman/twilio-cli/issues/315)) ([#316](https://github.com/shrutiburman/twilio-cli/issues/316)) ([53a2ded](https://github.com/shrutiburman/twilio-cli/commit/53a2ded1a89d22bcf18fd2602c89646a4287eb3c))
* reverting changes for the RPM build ([#326](https://github.com/shrutiburman/twilio-cli/issues/326)) ([c9eaad8](https://github.com/shrutiburman/twilio-cli/commit/c9eaad8e9cbdf0d36e5d7662daee55dfa4608f1d))
* rollback plugin-help upgrade ([dc705db](https://github.com/shrutiburman/twilio-cli/commit/dc705db4ddf038e93868dd546a9c6821653f36d0))
* rollback the lock file changes and remove the lock file during install ([#144](https://github.com/shrutiburman/twilio-cli/issues/144)) ([5653efa](https://github.com/shrutiburman/twilio-cli/commit/5653efa3dea88db72763a5434d0e4dd60358980e))
* travis npm deploy ([#150](https://github.com/shrutiburman/twilio-cli/issues/150)) ([34a67cd](https://github.com/shrutiburman/twilio-cli/commit/34a67cdc7ec155b2202e310317cd144a8d242993))
* unhide the Twilio region flag when creating profiles ([#201](https://github.com/shrutiburman/twilio-cli/issues/201)) ([cc87c60](https://github.com/shrutiburman/twilio-cli/commit/cc87c606f525c40a9264f362058178706be458c3))
* update package lock and AppVeyor test ([8321a89](https://github.com/shrutiburman/twilio-cli/commit/8321a89227d11e6c98671dede144a06015fd94e2))
* update travis build badge link ([#151](https://github.com/shrutiburman/twilio-cli/issues/151)) ([e62b676](https://github.com/shrutiburman/twilio-cli/commit/e62b6766080713b4a721046ac88569b036f58683))
* Updated api definitions changelog in CHANGES.md ([3236031](https://github.com/shrutiburman/twilio-cli/commit/32360314cc5ec00f752138c4127c37d59669fe76))
* upgrade dependencies and drop tslib pinning ([#197](https://github.com/shrutiburman/twilio-cli/issues/197)) ([f69d2bd](https://github.com/shrutiburman/twilio-cli/commit/f69d2bdda7b591a0c6d0103a3be4073b2f376a50))
* **chore:** Fix error message when exceeding schema max items ([#125](https://github.com/shrutiburman/twilio-cli/issues/125)) ([46c472b](https://github.com/shrutiburman/twilio-cli/commit/46c472beebb07685404251ebff46f577067acee3))

## [2.33.0](https://github.com/twilio/twilio-cli/compare/2.32.1...2.33.0) (2021-11-04)


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
