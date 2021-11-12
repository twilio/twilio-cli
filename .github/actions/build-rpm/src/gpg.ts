import * as openpgp from 'openpgp';
import * as fs from 'fs';
import * as exec from '@actions/exec';
import * as path from 'path';


// implementation sourced from https://github.com/crazy-max/ghaction-import-gpg/blob/8c43807e82148a7bafc633cc9584d04bf54be8d0/src/gpg.ts
export interface PrivateKey {
    fingerprint: string;
    keyID: string;
}

// config settings to cache the passphrase for private key
export const agentConfig = `default-cache-ttl 7200
max-cache-ttl 31536000
allow-preset-passphrase`;
  
export const readPrivateKey = async (key: string): Promise<PrivateKey> => {
    const privateKey = await openpgp.readKey({
        armoredKey: key
    });

    return {
        fingerprint: privateKey.getFingerprint().toUpperCase(),
        keyID: await privateKey.getEncryptionKey().then(encKey => {
        // @ts-ignore
        return encKey?.getKeyID().toHex().toUpperCase();
        })
    }
}

  export const importKey = async(key: string): Promise<void> => {
    const keyPath: string = `key.pgp`;
    fs.writeFileSync(keyPath, key);
  
    await exec.exec('gpg', ['--import', '--batch', '--yes', keyPath], {
      ignoreReturnCode: true,
      silent: true
    }).then(res => {
        if (res != 0) {
          throw new Error('importing key failed');
        }
      })
  }

  const gpgConnectAgent = async (command: string): Promise<string> => {
    return await exec
      .getExecOutput(`gpg-connect-agent "${command}" /bye`, [], {
        ignoreReturnCode: true,
        silent: true
      })
      .then(res => {
        if (res.stderr.length > 0 && res.exitCode != 0) {
          throw new Error(res.stderr);
        }
        for (let line of res.stdout.replace(/\r/g, '').trim().split(/\n/g)) {
          if (line.startsWith('ERR')) {
            throw new Error(line);
          }
        }
        return res.stdout.trim();
      });
  };

  export const configureAgent = async (config: string): Promise<void> => {
    const gpgAgentConf = path.join(`${process.env.HOME}`, '.gnupg', 'gpg-agent.conf') ;
    await fs.writeFile(gpgAgentConf, config, function (err){
      if (err) throw err;
    });
    await gpgConnectAgent('RELOADAGENT');
  };
