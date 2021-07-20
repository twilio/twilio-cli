const availableConfigs = ['edge'];
function getFromEnvironment(config) {
  const configEnv = `TWILIO_${config.toUpperCase()}`;
  if (process.env[configEnv]) {
    return process.env[configEnv];
  }
  return undefined;
}
module.exports = { availableConfigs, getFromEnvironment };
