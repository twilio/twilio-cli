const chalk = require('chalk');
const columnify = require('columnify');

function headingTransform(heading) {
  const capitalizeWords = ['Id', 'Sid'];

  heading = heading.replace(/([A-Z])/g, ' $1');
  heading = heading.charAt(0).toUpperCase() + heading.slice(1);
  heading = heading
    .split(' ')
    .map(word => (capitalizeWords.indexOf(word) > -1 ? word.toUpperCase() : word))
    .join(' ');
  return chalk.bold(heading);
}

module.exports = (fullData, limitedData) => {
  if (limitedData.length === 0) {
    return '';
  }

  const columns = Object.keys(limitedData[0])
    .map(key => ({ key, value: { headingTransform } }))
    .reduce((map, obj) => {
      map[obj.key] = obj.value;
      return map;
    }, {});

  return columnify(limitedData, {
    columnSplitter: '  ',
    config: columns
  });
};
