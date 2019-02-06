const TSV = require('tsv');

module.exports = (fullData, limitedData) => {
  if (limitedData.length === 0) {
    return '';
  }

  return TSV.stringify(limitedData);
};
