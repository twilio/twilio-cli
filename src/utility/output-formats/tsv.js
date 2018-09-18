const columnify = require('columnify');

module.exports = (fullData, limitedData) => {
  return columnify(limitedData, {
    columnSplitter: '\t'
  });
};
