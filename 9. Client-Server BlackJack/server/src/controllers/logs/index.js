const contrsWrapper = require('../../helpers/contrsWrapper');

const log = require('./log');
const about = require('./about');

module.exports = {
  log: contrsWrapper(log),
  about: contrsWrapper(about),
};