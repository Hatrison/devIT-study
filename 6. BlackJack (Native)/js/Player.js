export class Player {
  static #counter = 0;

  constructor() {
    this.hand = [];
    Player.#counter++;
    this.id = Player.#counter;
  }

  score() {
    let total = this.hand.reduce((acc, card) => acc + card.value, 0);
    let numAces = this.hand.filter(card => card.rank === 'A').length;

    while (numAces > 0 && total > 21) {
      total -= 10;
      numAces--;
    }

    return total;
  }

  render() {
    const cards = this.hand.map(card => card.render());
    const score = this.score();

    return `<div class='player'>
              <div id='player' class='card-table'>
                <div class='info'>
                  <h2>Player ${this.id}</h2>
                  <div id='player-points' class='points'>${String(score)}</div>
                </div>
                <ul id='player-cards' class='cards'>${cards.join('')}</ul>
              </div>
              <ul id='buttons' class='buttons-list'>
                <li>
                  <button id='hit' class='button' disabled
                  data-player='${this.id}'>Hit</button>
                </li>
                <li>
                  <button id='stand' class='button' disabled 
                  data-player='${this.id}'>Stand</button>
                </li>
              </ul>
            </div>`;
  }
}
