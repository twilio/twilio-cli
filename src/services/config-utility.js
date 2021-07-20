const availableConfigs = ['edge'];
function getFromEnvironment(config) {
  const configEnv = `TWILIO_${config.toUpperCase()}`;
  return process.env[configEnv];
}
module.exports = { availableConfigs, getFromEnvironment };
