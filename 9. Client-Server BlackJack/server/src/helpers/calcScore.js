const calcScore = cards => {
  let total = cards.reduce((acc, card) => acc + card.value, 0);
  let numAces = cards.filter(card => card.rank === 'A').length;

  while (numAces > 0 && total > 21) {
    total -= 10;
    numAces--;
  }

  return total;
};

module.exports = calcScore;