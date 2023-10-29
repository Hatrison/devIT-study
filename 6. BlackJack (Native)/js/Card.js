export class Card {
  constructor(rank, suit) {
    this.rank = rank.name;
    this.suit = suit;
    this.value = rank.value;
  }

  render() {
    return `<li class='card 
            ${this.suit === '♥' || this.suit === '♦' ? 'red' : 'black'}'>
            <div class='rank'>${this.rank}</div>
            <div class='suit'>${this.suit}</div>
          </li>`;
  }
}
