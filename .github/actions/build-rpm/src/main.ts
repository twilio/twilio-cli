import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as fs from 'fs';
import * as path from 'path';
import * as gpg from './gpg';
import * as util from './util';

const rpmBuildTmp = `${process.env.HOME}/rpmbuild`;
const rpmSourcesTmp = `${rpmBuildTmp}/SOURCES`;
const targetRpmBuildTmp = `${rpmBuildTmp}/RPMS`;
const outputRpmDir = `${process.env.GITHUB_WORKSPACE}/RPMS`;

// changes taken from https://github.com/Antikythera/build-rpm

async function run(): Promise<void> {
  try {
    // install earlier version of gpg

    const gpgversion = await exec.getExecOutput('gpg', ['--version']).then(res => res.stdout);
    core.debug(`gpg version  is ${gpgversion}`);
    const inputSpecFile = util.validateInputFile(core.getInput('spec_file'));
    const inputGpgPubKeyFile = util.validateInputFile(core.getInput('gpg_pub_key'));
    const targetSpecFile = `${rpmBuildTmp}/SPECS/${path.basename(
      inputSpecFile
    )}`
    const inputVariables = util.parseInputVariables(core.getInput('variables'));
    const inputSources = util.parseInputSources(core.getInput('sources'));
    const gpgKeyId = core.getInput('gpg_signing_key_id');
    const passphrase = core.getInput('gpg_signing_key_passphrase');

    //Importing public key
    core.debug(`Importing pub key from ${inputGpgPubKeyFile}`);
    await exec.exec(
    'gpg',
    [
      '--import',
      inputGpgPubKeyFile
    ]
    );

    let key  = core.getInput('gpg_signing_key');    
    // decode base64 encoded secret key 
    const buff = Buffer.from(key, 'base64');
    key = buff.toString("utf8");
    // Importing private key
    await gpg.importKey(key);
    const privateKey = await gpg.readPrivateKey(key);
    if (passphrase) {
      core.info('Configuring GnuPG agent');
      await gpg.configureAgent(gpg.agentConfig);
    }
     

    // Init rpmbuild dir tree
    await exec.exec('rpmdev-setuptree');

    // Copy spec file to dir tree
    core.debug(`Copying spec file ${inputSpecFile} to ${targetSpecFile}...`);
    fs.copyFileSync(inputSpecFile, targetSpecFile);
    core.debug('Done');

    // Copy sources to dir tree
    core.debug(`Copying source files...`);
    copyRpmSources(inputSources);
    core.debug('Done');

    // Create the action output RPM dir
    core.debug(`Creating the output dir: ${outputRpmDir}`);
    fs.mkdirSync(outputRpmDir, {recursive: true});
    core.debug('Done');

    // Run rpmbuild and save the rpm file name
    core.debug('Running rpmbuild...');
    const builtRpmFilePath = await runRpmbuild(
      buildRpmArgs(targetSpecFile, inputVariables)
    );
    await exec.exec('rpmsign', ['--define', `_gpg_name ${gpgKeyId}`,'--define', `__gpg_sign_cmd %{__gpg} gpg --no-armor --batch --pinentry-mode loopback --no-tty --yes --passphrase=${passphrase} -u "%{_gpg_name}" -sbo %{__signature_filename} %{__plaintext_filename}`,  '--resign', builtRpmFilePath]);
    core.debug(`Done, result: ${builtRpmFilePath}`);

    const builtRpmFileName = path.basename(builtRpmFilePath);

    // Copy the built RPM to the output dir
    core.debug(
      `Copying RPM ${builtRpmFilePath} to output dir ${outputRpmDir} ...`
    );
    util.copyFileToDir(builtRpmFilePath, outputRpmDir);
    core.debug('Done');

    core.setOutput('rpm_package_name', path.basename(builtRpmFilePath));
    core.setOutput('rpm_package_path', `RPMS/${builtRpmFileName}`);
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

function copyRpmSources(sources: string[]): void {
  for (const source of sources) {
    util.copyFileToDir(source, rpmSourcesTmp);
  }
}

function buildRpmArgs(
  specFile: string,
  variables: util.VariableKeyPair[]
): string[] {
  const cmd : Array<string> = [];

  for (const varPair of variables) {
    cmd.push('-D', `${varPair.name} ${varPair.value}`);
  }
  cmd.push(specFile);

  return cmd;
}

async function runRpmbuild(args: string[]): Promise<string> {
  const targetArgs = ['-bb'].concat(args);
  if ((await exec.exec('rpmbuild', targetArgs)) === 0) {
    const rpmFiles = util.findFileByExt(targetRpmBuildTmp, 'rpm');
    if (rpmFiles.length === 0) {
      throw new Error(`couldn't find the rpm file in ${targetRpmBuildTmp}`);
    }
    return path.resolve(rpmFiles[0]);
  } else {
    throw new Error('rpmbuild command failed');
  }
}

run();
