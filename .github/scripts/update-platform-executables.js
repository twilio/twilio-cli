const core = require('@actions/core');
const { GitHub } = require('@actions/github');
const fs = require('fs');
const path = require('path');

/**
 * Functionality from svenstaro/upload-release-action.
 * Link: https://github.com/svenstaro/upload-release-action
 */
const updatePlatformExecutables = async () => {
  try {
    const requiredParams = ['GITHUB_TOKEN', 'REPO_NAME', 'TAG_NAME'];
    for (const param of requiredParams) {
      if (!(param in process.env)) {
        core.setFailed(`Exiting, required param: ${param} is missing`);
        return;
      }
    }
    if(('FILE' in process.env) && !('ASSET_NAME' in process.env)){
      core.setFailed(`Exiting, required param: ASSET_NAME is missing`);
      return;
    }
    if(!('FILE' in process.env) && !('DIRNAME' in process.env)){
      core.setFailed(`Exiting, required params: FILE and DIRNAME are missing. Specify either of the two.`);
      return;
    }
    const github = new GitHub(process.env.GITHUB_TOKEN);
    const [owner, repo] = process.env.REPO_NAME
      ? process.env.REPO_NAME.split('/')
      : [null, null];
    const tag = process.env.TAG_NAME;
    const getReleaseResponse = await github.repos.getReleaseByTag({
      owner,
      repo,
      tag
    });

    const {
      data: {
        id: oldReleaseId,
        html_url: oldHtmlUrl,
        upload_url: oldUploadUrl,
        body: oldBody,
        draft: oldDraft,
        name: oldName,
        prerelease: oldPrerelease
      }
    } = getReleaseResponse;

    core.info(
      `Got release info: '${oldReleaseId}', ${oldName}, '${oldHtmlUrl}', '${oldUploadUrl},'`
    )
    core.info(`Body: ${oldBody}`)
    core.info(`Draft: ${oldDraft}, Prerelease: ${oldPrerelease}`)

    const assetName = process.env.ASSET_NAME;
    const file = process.env.FILE;
    const overwrite = process.env.OVERWRITE;
    const dirname= process.env.DIRNAME;

    const iterateOverFile = async (file,assetName) => {
      const stat = fs.statSync(file);
      if (!stat.isFile()) {
        core.setFailed(`Skipping ${file}, since its not a file`);
        return;
      }
      const file_size = stat.size;
      const file_bytes = fs.readFileSync(file);

      // Check for duplicates.
      const assets = await github.repos.listAssetsForRelease(
        {
          owner,
          repo,
          release_id: oldReleaseId
        });
      const duplicate_asset = assets.data.find(a => a.name === assetName)
      if (duplicate_asset !== undefined) {
        if (overwrite) {
          core.debug(
            `An asset called ${assetName} already exists in release ${tag} so we'll overwrite it.`
          )
          await github.repos.deleteReleaseAsset({
            owner,
            repo,
            asset_id: duplicate_asset.id
          })
        } else {
          core.debug(`An asset called ${assetName} already exists. Download URL: ${duplicate_asset.browser_download_url}`);
          return;
        }
      } else {
        core.debug(
          `No pre-existing asset called ${assetName} found in release ${tag}. All good.`
        )
      }

      core.debug(`Uploading ${file} to ${assetName} in release ${tag}.`)
      const uploaded_asset = await github.repos.uploadReleaseAsset(
        {
          url: oldUploadUrl,
          name: assetName,
          data: file_bytes,
          headers: {
            'content-type': 'binary/octet-stream',
            'content-length': file_size
          }
        }
      )

      core.info(`Updated release with asset: ${uploaded_asset.data.browser_download_url}`)
    }

    const iterateOverDirectory = async (dirname) => {
      const files = await fs.promises.readdir( dirname );
      // Loop them all with the new for...of
      for( const file of files ) {
        // Get the full paths
        const fromPath = path.join( dirname, file );
        // Stat the file to see if we have a file or dir
        const stat = await fs.promises.stat( fromPath );
        if( stat.isFile() ){
          iterateOverFile(dirname + "/" + file,file);
        }
        else if( stat.isDirectory() ){
          iterateOverDirectory(dirname + "/" + file)
        }
      }
    }
    if(dirname)
      await iterateOverDirectory(dirname);
    else if (file){
      await iterateOverFile(file,assetName);
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}
(async () => {
  await updatePlatformExecutables();
})();
