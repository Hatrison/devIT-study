import { GameObject } from './GameObject.js';

export class EnemyBullet extends GameObject {
  constructor({ game, posX, posY, velocity = 10 }) {
    super({ game, posX, posY, velocity, width: 3, height: 10 });
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
