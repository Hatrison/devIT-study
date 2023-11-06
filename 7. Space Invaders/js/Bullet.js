export class Bullet {
  constructor({ game, posX, posY, velocity = 20 }) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.velocity = velocity;
    this.radius = 5;
  }

  render() {
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
    this.game.ctx.fillStyle = 'red';
    this.game.ctx.fill();
    this.game.ctx.closePath();
  }

  update() {
    this.render();
    this.posY -= this.velocity;

    if (this.posY + this.radius <= 0) {
      const index = this.game.bullets.indexOf(this);
      this.game.bullets.splice(index, 1);
    }
  }
}
