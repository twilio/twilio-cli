const qq = require('qqjs');
const pjson = require(`${process.cwd()}/package.json`);
const fs = require('fs');


function debArch(arch) {
  if (arch === 'x64') return 'amd64';
  if (arch === 'arm') return 'armel'
  throw new Error(`invalid arch: ${arch}`);
}

const scripts = {
  bin: () => `#!/usr/bin/env bash
set -e
echoerr() { echo "$@" 1>&2; }
get_script_dir () {
  SOURCE="\${BASH_SOURCE[0]}"
  # While \$SOURCE is a symlink, resolve it
  while [ -h "\$SOURCE" ]; do
    DIR="\$( cd -P "\$( dirname "\$SOURCE" )" && pwd )"
    SOURCE="\$( readlink "\$SOURCE" )"
    # If \$SOURCE was a relative symlink (so no "/" as prefix, need to resolve it relative to the symlink base directory
    [[ \$SOURCE != /* ]] && SOURCE="\$DIR/\$SOURCE"
  done
  DIR="\$( cd -P "\$( dirname "\$SOURCE" )" && pwd )"
  echo "\$DIR"
}
DIR=\$(get_script_dir)
export ${('UPDATE_INSTRUCTIONS')}="update with \\"sudo apt update && sudo apt install ${pjson.oclif.bin}\\""
\$DIR/node \$DIR/run "\$@"
`,
  control: (arch, debVersion) => `Package: ${pjson.oclif.bin}
Version: ${debVersion}
Section: main
Priority: standard
Architecture: ${arch}
Maintainer: ${pjson.author}
Description: ${pjson.description}
`,
  ftparchive: () => `
APT::FTPArchive::Release::Origin "${pjson.author}";
APT::FTPArchive::Release::Suite "stable";
}
`,
  postinst: () => `#!/usr/bin/env bash
cd /usr/lib/twilio-cli
PATH=$PATH:$PWD/bin eval $(PATH=$PATH:$PWD/bin node -p "require('./package').scripts.postinstall")
`
}


  const packDebian = async (arch) => {
    const description = 'pack Twilio CLI into debian package'
    const rootDir = process.cwd();
    const config = {
      bin: pjson.oclif.bin,
      dirname: pjson.name
    }

    if (process.platform !== 'linux') throw new Error('must be run from linux')
    const debVersion = `${pjson.version}-1`;
   //twilio-cli/dist/deb
    const dist =  qq.join(rootDir, 'dist','deb');
    await qq.rm(dist);
    await qq.mkdirp(dist);
    const build = async (arch) => {
      // example 'twilio_2.32.1-1_amd64'
      const versionedDebBase = `twilio_${debVersion}_${debArch(arch)}`;
      // 'twilio-cli/tmp/apt/twilio_2.32.1-1_amd64.apt'
      const workspace = qq.join(rootDir, 'tmp', 'apt', `${versionedDebBase}.apt`);
      await qq.rm(workspace);
      await qq.mkdirp([workspace, 'DEBIAN']);
      await qq.mkdirp([workspace, 'usr/bin']);
      await qq.mkdirp([workspace, 'usr/lib']);
      await qq.mkdirp([dist, debArch(arch)]);
      await qq.cp([rootDir,'tmp',`linux-${arch}`, pjson.oclif.bin], [workspace, 'usr/lib', pjson.name]);
      await qq.write([workspace, 'usr/lib', config.dirname, 'bin', config.bin], scripts.bin(config));
      await qq.write([workspace, 'DEBIAN/control'], scripts.control(debArch(arch), debVersion));
      await qq.write([workspace, 'DEBIAN/postinst'], scripts.postinst());
      // making files executable
      await qq.chmod([workspace, 'usr/lib', config.dirname, 'bin', config.bin], 0o755);
      await qq.chmod([workspace, 'DEBIAN/postinst'], 0o755);
      await qq.x(`ln -s "../lib/${config.dirname}/bin/${config.bin}" "${workspace}/usr/bin/${pjson.oclif.bin}"`);
      await qq.x(`dpkg --build "${workspace}" "${qq.join(dist, debArch(arch), `${versionedDebBase}.deb`)}"`);
    }
    try {
      // fetch existing Packages file which needs to be modified for new version
      await qq.x(`aws s3 cp s3://${pjson.oclif.update.s3.bucket}/apt/Packages Packages`, {cwd: dist, reject: false});
      const content = fs.readFileSync(`${dist}/Packages`);
    }
    catch(error) {
      console.log(`Cannot retrieve Packages file due to error: ${error} `);
      throw error;
    }
    fs.readFile(`${dist}/Packages`, function (err, data) {
    if(err) throw err;
    // check if version already exists
    if(data.includes(`Version: ${debVersion}`)){
      console.log(`the version ${debVersion} is already available`);
      throw new Error('verion already exists');
      }
    });
    for (const a of arch) {
      await build(a);
      await qq.x(`apt-ftparchive packages ${debArch(a)}/ >> Packages`, {cwd: dist});
    }
    await qq.x('gzip -c Packages > Packages.gz', {cwd: dist});
    await qq.x('bzip2 -k Packages', {cwd: dist});
    await qq.x('xz -k Packages', {cwd: dist});
    const ftparchive = qq.join(rootDir, 'tmp', 'apt', 'apt-ftparchive.conf');
    await qq.write(ftparchive, scripts.ftparchive(config));
    await qq.x(`apt-ftparchive -c "${ftparchive}" release . > Release`, {cwd: dist});
    const gpgKey = process.env.GPG_SIGNING_KEY_ID;
    const passphrase = process.env.GPG_SIGNING_KEY_PASSPHRASE;
    if (gpgKey) {
      await qq.x(`gpg --digest-algo SHA512 --clearsign -u ${gpgKey} --batch --pinentry-mode loopback --passphrase ${passphrase} -o InRelease Release`, {cwd: dist});
      await qq.x(`gpg --digest-algo SHA512 -abs -u ${gpgKey} --batch --pinentry-mode loopback --passphrase ${passphrase} -o Release.gpg Release`, {cwd: dist});
    }
    await qq.x(`aws s3 cp ${dist} s3://${pjson.oclif.update.s3.bucket}/apt --recursive --acl public-read`);
  }
  // importing secret key
  const importGPG  = async() => {
    let key  = process.env.GPG_SIGNING_KEY;
    const buff = Buffer.from(key, 'base64');
    key = buff.toString("utf8");
    const keyPath = `key.pgp`;
    fs.writeFileSync(keyPath, key);
    await qq.x(`gpg --import --batch --yes ${keyPath}`);
  }

(async () => {
  importGPG();
  const archStr = process.argv[2];
  const arches = archStr.split(",");
  await packDebian(arches);
})();


