const contrsWrapper = require('../../helpers/contrsWrapper');

const createRoom = require('./createRoom');
const joinRoom = require('./joinRoom');
const exitRoom = require('./exitRoom');

module.exports = {
  createRoom: contrsWrapper(createRoom),
  joinRoom: contrsWrapper(joinRoom),
  exitRoom: contrsWrapper(exitRoom),
};
