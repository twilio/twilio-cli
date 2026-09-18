/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const updateCliCoreReleaseVersion = async () => {
  try {
    console.log('Updating the cli-core version');
    const cliCoreTagVersion = process.env.CLI_CORE_TAG
    // Path to package.json
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');

    // Read and parse package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update the desired key
    packageJson["dependencies"]["@twilio/cli-core"] = cliCoreTagVersion;

    // Write the updated object back to package.json
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

    console.info(`Updated package.json: Set twilio-cli-core to '${cliCoreTagVersion}'`);
  } catch (error) {
    console.error(`Failed to update package.json: ${error.message}`);
  }
};
(async () => {
  await updateCliCoreReleaseVersion();
})();
