export class Player {
  constructor() {
    this.hand = [];
    this.scoreboard = document.getElementById('player-points');
    this.cards = document.getElementById('player-cards');
  }

  score() {
    return this.hand.reduce((acc, card) => acc + card.value, 0);
  }

  render() {
    const cards = this.hand.map(card => card.render());
    const score = this.score();
    this.scoreboard.innerHTML = String(score);
    this.cards.innerHTML = cards.join('');
  }
}
