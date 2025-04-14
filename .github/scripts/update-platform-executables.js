const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');

/**
 * Functionality from svenstaro/upload-release-action.
 * Link: https://github.com/svenstaro/upload-release-action
 */
const updatePlatformExecutables = async () => {
  try {
    const requiredParams = ['GITHUB_TOKEN', 'REPO_NAME', 'TAG_NAME', 'ASSET_NAME', 'FILE'];
    for (const param of requiredParams) {
      if (!(param in process.env)) {
        core.setFailed(`Exiting, required param: ${param} is missing`);
        return;
      }
    }
    const octokit = new github.getOctokit(process.env.GITHUB_TOKEN);
    const [owner, repo] = process.env.REPO_NAME
      ? process.env.REPO_NAME.split('/')
      : [null, null];
    const tag = process.env.TAG_NAME;
    const getReleaseResponse = await octokit.rest.repos.getReleaseByTag({
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

    const stat = fs.statSync(file);
    if (!stat.isFile()) {
      core.setFailed(`Skipping ${file}, since its not a file`);
      return;
    }
    const file_size = stat.size;
    const file_bytes = fs.readFileSync(file);

    // Check for duplicates.
    const assets = await octokit.rest.repos.listReleaseAssets(
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
        await octokit.rest.repos.deleteReleaseAsset({
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
    const uploaded_asset = await octokit.rest.repos.uploadReleaseAsset(
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
  } catch (error) {
    core.setFailed(error.message)
  }
}
(async () => {
  await updatePlatformExecutables();
})();

