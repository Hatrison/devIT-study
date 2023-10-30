export class Player {
  static #counter = 0;

  constructor(game) {
    this.game = game;
    this.hand = [];
    Player.#counter++;
    this.id = Player.#counter;
  }

  score() {
    return this.hand.reduce((acc, card) => acc + card.value, 0);
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
