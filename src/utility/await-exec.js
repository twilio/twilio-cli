/* Exec() a child process in a promise-friendly way */

const cp = require('child_process');

function Exec(command, options = { log: false, cwd: process.cwd() }) {
  return new Promise((done, failed) => {
    cp.exec(command, { ...options }, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout;
        err.stderr = stderr;
        failed(err);
        return;
      }

      done({ stdout, stderr });
    });
  });
}

module.exports = Exec;
