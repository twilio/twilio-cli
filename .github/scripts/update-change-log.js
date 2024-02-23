/* eslint-disable no-console */
const fs = require('fs');

const cliChangelogFilename = 'CHANGES.md';

const updateChangeLog = async () => {
  try {
    console.log('Updating the CHANGES.md');
    const changes = process.argv[2] + '\n\n';
    if (changes) {
      const data = fs.readFileSync(cliChangelogFilename);
      if (data.toString().includes(changes)) {
        console.log(`Provided changes are already in cli changelog : ${changes}`);
        return;
      }
      const fd = fs.openSync(cliChangelogFilename, 'w+');
      const insert = Buffer.from(changes);
      fs.writeSync(fd, insert, 0, insert.length, 0);
      fs.writeSync(fd, data, 0, data.length, insert.length);
      fs.close(fd, (err) => {
        if (err) throw err;
      });
    } else {
      console.log('There are no changes provided');
    }
  } catch (error) {
    console.log(`Error while updating the changelog: ${error}`);
  }
};
(async () => {
  await updateChangeLog();
})();
