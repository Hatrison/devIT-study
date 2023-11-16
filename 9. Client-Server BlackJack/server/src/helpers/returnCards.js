const returnCards = cards => {
  return cards.map(card => `${card.rank} - ${card.suit}`).join(', ');
};

module.exports = returnCards;
