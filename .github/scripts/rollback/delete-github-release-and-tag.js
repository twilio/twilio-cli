const { Octokit } = require('@octokit/rest');

async function main() {
  const {
    GITHUB_TOKEN,
    REPO_OWNER,
    REPO_NAME,
    ROLLBACK_VERSION,
  } = process.env;

  if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME || !ROLLBACK_VERSION) {
    throw new Error(
      'GITHUB_TOKEN, REPO_OWNER, REPO_NAME, and ROLLBACK_VERSION env vars are required'
    );
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });

  const tagVariants = [ROLLBACK_VERSION];

  // Delete matching releases
  const { data: releases } = await octokit.repos.listReleases({
    owner: REPO_OWNER,
    repo: REPO_NAME,
    page: 1, // only last release is needed, so fetching only 1st page
  });

  const rel = releases.find(r =>
    tagVariants.some(tag => r.tag_name === tag)
  );

  if (rel) {
    await octokit.repos.deleteRelease({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      release_id: rel.id,
    });
    console.log(`Deleted release for tag: ${rel.tag_name}`);
  } else {
    console.log(`No release found for: ${tagVariants.join(' or ')}`);
  }

  for (const t of tagVariants) {
    try {
      await octokit.git.deleteRef({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        ref: `tags/${t}`,
      });
      console.log(`Deleted tag: ${t}`);
    } catch (err) {
      if (err.status === 422) {
        console.log(`Tag ${t} does not exist.`);
      } else {
        throw err;
      }
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
