import { GameObject } from './GameObject.js';

export class Ability extends GameObject {
  constructor({ game, posY, posX, radius = 20, color = 'red', velocity = 5 }) {
    super({ game, posX, posY, velocity });
    this.radius = radius;
    this.color = color;
  }

  render() {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

  update() {
    this.render();

    this.posY += this.velocity;

    if (this.posY + this.radius <= 0) {
      const index = this.game.abilities.indexOf(this);
      this.game.abilities.splice(index, 1);
    }
  }
}
