import * as core from '@actions/core'
import {exec} from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'
import {
  copyFileToDir,
  parseInputVariables,
  parseInputSources,
  findFileByExt,
  validateInputSpecFile,
  VariableKeyPair
} from './util'

const rpmBuildTmp = `${process.env.HOME}/rpmbuild`
const rpmSourcesTmp = `${rpmBuildTmp}/SOURCES`
const targetRpmBuildTmp = `${rpmBuildTmp}/RPMS`
const outputRpmDir = `${process.env.GITHUB_WORKSPACE}/RPMS`

async function run(): Promise<void> {
  try {
    const inputSpecFile = validateInputSpecFile(core.getInput('spec_file'))
    const targetSpecFile = `${rpmBuildTmp}/SPECS/${path.basename(
      inputSpecFile
    )}`
    const inputVariables = parseInputVariables(core.getInput('variables'))
    const inputSources = parseInputSources(core.getInput('sources'))

    // Init rpmbuild dir tree
    await exec('rpmdev-setuptree')

    // Copy spec file to dir tree
    core.debug(`Copying spec file ${inputSpecFile} to ${targetSpecFile}...`)
    fs.copyFileSync(inputSpecFile, targetSpecFile)
    core.debug('Done')

    // Copy sources to dir tree
    core.debug(`Copying source files...`)
    copyRpmSources(inputSources)
    core.debug('Done')

    // Create the action output RPM dir
    core.debug(`Creating the output dir: ${outputRpmDir}`)
    fs.mkdirSync(outputRpmDir, {recursive: true})
    core.debug('Done')

    // Run rpmbuild and save the rpm file name
    core.debug('Running rpmbuild...')
    const builtRpmFilePath = await runRpmbuild(
      buildRpmArgs(targetSpecFile, inputVariables)
    )
    core.debug(`Done, result: ${builtRpmFilePath}`)

    const builtRpmFileName = path.basename(builtRpmFilePath)

    // Copy the built RPM to the output dir
    core.debug(
      `Copying RPM ${builtRpmFilePath} to output dir ${outputRpmDir} ...`
    )
    copyFileToDir(builtRpmFilePath, outputRpmDir)
    core.debug('Done')

    core.setOutput('rpm_package_name', path.basename(builtRpmFilePath))
    core.setOutput('rpm_package_path', `RPMS/${builtRpmFileName}`)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

function copyRpmSources(sources: string[]): void {
  for (const source of sources) {
    copyFileToDir(source, rpmSourcesTmp)
  }
}

function buildRpmArgs(
  specFile: string,
  variables: VariableKeyPair[]
): string[] {
  const cmd = []

  for (const varPair of variables) {
    cmd.push('-D', `${varPair.name} ${varPair.value}`)
  }
  cmd.push(specFile)

  return cmd
}

async function runRpmbuild(args: string[]): Promise<string> {
  const targetArgs = ['-bb'].concat(args)
  if ((await exec('rpmbuild', targetArgs)) === 0) {
    const rpmFiles = findFileByExt(targetRpmBuildTmp, 'rpm')
    if (rpmFiles.length === 0) {
      throw new Error(`couldn't find the rpm file in ${targetRpmBuildTmp}`)
    }
    return path.resolve(rpmFiles[0])
  } else {
    throw new Error('rpmbuild command failed')
  }
}

run()