const qq = require('qqjs');
const pjson = require(`${process.cwd()}/package.json`);
const fs = require('fs');
const path = require('path');

const rollbackVersion = process.env.ROLLBACK_VERSION;
const setLatest = process.env.SET_LATEST;
const cliName = 'twilio';
const bucket = pjson.oclif.update.s3.bucket;

if (!rollbackVersion || !setLatest) {
  throw new Error('Both ROLLBACK_VERSION and SET_LATEST environment variables are required');
}

const repoDir = 'repo';

// importing secret key
const importGPG  = async() => {
  console.log('Import GPG key...');
  let key  = process.env.GPG_SIGNING_KEY;
  const buff = Buffer.from(key, 'base64');
  key = buff.toString("utf8");
  const keyPath = `key.pgp`;
  fs.writeFileSync(keyPath, key);
  await qq.x(`gpg --import --batch --yes ${keyPath}`);
}

const rollback = async () => {
  try {
    console.log('Sync current apt repo from S3...');
    await qq.x(`aws s3 sync s3://${bucket}/apt ${repoDir}`);

    console.log('Remove buggy .deb files...');
    for (const arch of ['amd64', 'armel']) {
      const pattern = path.join(repoDir, arch, `${cliName}_*${rollbackVersion}*_${arch}.deb`);
      // Use glob removal
      await qq.rm(pattern);
      await qq.x(`apt-ftparchive packages ${arch}/ >> Packages`, {cwd: repoDir});
    }

    await qq.x('gzip -c Packages > Packages.gz', {cwd: repoDir});
    await qq.x('bzip2 -k Packages', {cwd: repoDir});
    await qq.x('xz -k Packages', {cwd: repoDir});
    fs.writeFileSync(path.join(repoDir, 'apt-ftparchive.conf'), `APT::FTPArchive::Release::Origin "${pjson.author}";\n`);
    await qq.x('apt-ftparchive -c apt-ftparchive.conf release . > Release', {cwd: repoDir});

    const gpgKey = process.env.GPG_SIGNING_KEY_ID;
    const passphrase = process.env.GPG_SIGNING_KEY_PASSPHRASE;

    if (gpgKey) {
      console.log('Sign Release files...');
      await qq.x(`gpg --digest-algo SHA512 --clearsign -u "${gpgKey}" --batch --pinentry-mode loopback --passphrase "${passphrase}" -o InRelease Release`, {cwd: repoDir});
      await qq.x(`gpg --digest-algo SHA512 -abs -u "${gpgKey}" --batch --pinentry-mode loopback --passphrase "${passphrase}" -o Release.gpg Release`, {cwd: repoDir});
    }


    console.log('Sync back to S3...');
    await qq.x(`aws s3 sync ${repoDir} s3://${bucket}/apt --acl public-read --delete`);

    console.log('APT rollback complete!');
  } catch (err) {
    console.error('APT rollback failed!', err);
    process.exit(1);
  }
}

(async () => {
  await importGPG();
  await rollback();
})();
