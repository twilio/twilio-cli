const { updateRelease } = require('@twilio/cli-core').releaseScripts.UpdateRelease;
(async () => {
  await updateRelease();
})();
