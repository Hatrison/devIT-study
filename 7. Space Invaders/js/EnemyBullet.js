export class EnemyBullet {
  constructor({ game, posX, posY, velocity = 10 }) {
    this.game = game;
    this.posX = posX;
    this.posY = posY;
    this.velocity = velocity;
    this.width = 3;
    this.height = 10;
  }

  render() {
    this.game.ctx.fillStyle = 'yellow';
    this.game.ctx.fillRect(this.posX, this.posY, this.width, this.height);
  }

  update() {
    this.render();
    this.posY += this.velocity;

    if (this.posY >= this.game.canvas.height) {
      const index = this.game.enemyBullets.indexOf(this);
      this.game.enemyBullets.splice(index, 1);
    }
  }
}
