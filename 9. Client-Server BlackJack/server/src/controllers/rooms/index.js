const contrsWrapper = require('../../helpers/contrsWrapper');

const createRoom = require('./createRoom');
const joinRoom = require('./joinRoom');

module.exports = {
  createRoom: contrsWrapper(createRoom),
  joinRoom: contrsWrapper(joinRoom),
};
