import { Card } from './Card.js';

export class Deck {
  constructor() {
    this.cards = [];
    this.suits = ['♥', '♦', '♣', '♠'];
    this.ranks = [
      { name: '2', value: 2 },
      { name: '3', value: 3 },
      { name: '4', value: 4 },
      { name: '5', value: 5 },
      { name: '6', value: 6 },
      { name: '7', value: 7 },
      { name: '8', value: 8 },
      { name: '9', value: 9 },
      { name: '10', value: 10 },
      { name: 'J', value: 10 },
      { name: 'Q', value: 10 },
      { name: 'K', value: 10 },
      { name: 'A', value: 11 },
    ];
    this.ranks.forEach(rank => {
      this.suits.forEach(suit => {
        this.cards.push(new Card(rank, suit));
      });
    });
  }

  shuffle() {
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  deal(num) {
    return this.cards.splice(0, num);
  }
}
