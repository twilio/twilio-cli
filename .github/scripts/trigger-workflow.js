const { triggerWorkflow } = require('@twilio/cli-core').releaseScripts.TriggerWorkflow;
(async () => {
  await triggerWorkflow();
})();
