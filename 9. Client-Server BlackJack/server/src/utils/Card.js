class Card {
  constructor(rank, suit) {
    this.rank = rank.name;
    this.suit = suit;
    this.value = rank.value;
  }

  get values() {
    return { value: this.value, suit: this.suit, rank: this.rank };
  }
}

module.exports = Card;
