const { triggerAndWait } = require('@twilio/cli-core').releaseScripts.TriggerWaitWorkflow;
(async () => {
  await triggerAndWait();
})();
