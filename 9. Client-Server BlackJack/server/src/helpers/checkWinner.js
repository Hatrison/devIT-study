const checkWinner = (players, dealer) => {
  let message;
  const scores = players.map(player => player.score);
  const dealerScore = dealer.score;
  const playerScores = scores;
  const winningScores = playerScores.filter(score => score <= 21);
  const blackjackScores = playerScores.filter(score => score === 21);

  if (
    !winningScores.length ||
    winningScores.every(score => score < dealerScore)
  ) {
    message = 'Dealer won!';
  } else if (
    (blackjackScores.length && dealerScore === 21) ||
    winningScores.some(score => score === dealerScore)
  ) {
    message = 'Draw!';
  } else {
    const greatestScore = Math.max(...winningScores);
    const winners = playerScores.filter(score => score === greatestScore);

    if (winners.length === 1) {
      const number = playerScores.indexOf(greatestScore) + 1;
      message = `Player ${number} won!`;
    } else {
      message = `Draw!`;
    }
  }

  return message;
};

module.exports = checkWinner;
