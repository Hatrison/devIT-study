const Room = require('../../schemas/rooms');
const createToken = require('../../helpers/createToken');
const { nanoid } = require('nanoid');
const initGame = require('../../utils/initGame');

const createRoom = async (req, res) => {
  const { deck, player, dealer } = initGame();
  const playerId = nanoid();

  const { id } = await Room.create({
    cards: deck.cards,
    players: [{ ...player, uid: playerId }],
    dealerCards: dealer.hand,
  });

  setTimeout(async () => {
    try {
      await Room.findByIdAndUpdate(id, { started: true });
    } catch (error) {
      console.log(error);
    }
  }, 20 * 1000);

  const roomToken = createToken(id);
  const userToken = createToken(playerId);

  return res.status(201).json({
    roomToken,
    userToken,
    dealerCards: dealer.hand,
    players: [player],
  });
};

module.exports = createRoom;
