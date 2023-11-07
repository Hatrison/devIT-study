import { AliveObject } from './AliveObject.js';
import { EnemyBullet } from './EnemyBullet.js';

export class Invader extends AliveObject {
  static width = 45;
  static height = 45;

  constructor({ game, posX = 0, posY = 0, velocity = 3, maxHp = 1 }) {
    const imageSrc = 'images/invader.png';
    super({
      game,
      posX,
      posY,
      width: Invader.width,
      height: Invader.height,
      velocity,
      imageSrc,
    });

    this.maxHp = maxHp;
    this.hp = this.maxHp;
  }

  render() {
    super.render();

    const healthBarWidth = this.width - 15;
    const healthBarHeight = 5;
    const healthBarX = this.posX - (healthBarWidth - this.width) / 2;
    const healthBarY = this.posY - healthBarHeight - 5;
    const currentHealth = this.hp / this.maxHp;

    this.game.ctx.fillStyle = 'green';
    this.game.ctx.fillRect(
      healthBarX,
      healthBarY,
      healthBarWidth * currentHealth,
      healthBarHeight
    );
  }

  update(velocity) {
    this.render();
    this.move(velocity);
    this.collideWithBullet();

    if (this.hp <= 0) {
      this.death();
    }
  }

  move(velocity) {
    this.posX += velocity.x;
    if (velocity.y) this.posY += velocity.y;
  }

  collideWithBullet() {
    this.game.bullets.forEach(bullet => {
      const bulletTop = bullet.posY - bullet.radius;
      const bulletBottom = bullet.posY + bullet.radius;
      const bulletLeft = bullet.posX - bullet.radius;
      const bulletRight = bullet.posX + bullet.radius;

      const invaderTop = this.posY;
      const invaderBottom = this.posY + this.height;
      const invaderLeft = this.posX;
      const invaderRight = this.posX + this.width;

      const colliding =
        bulletBottom >= invaderTop &&
        bulletTop <= invaderBottom &&
        bulletRight >= invaderLeft &&
        bulletLeft <= invaderRight;

      if (colliding) {
        this.hp--;

        const bulletIndex = this.game.bullets.indexOf(bullet);
        this.game.bullets.splice(bulletIndex, 1);
      }
    });
  }

  death() {
    setTimeout(() => {
      const invaderIndex = this.game.bunch.invaders.indexOf(this);
      this.game.bunch.invaders.splice(invaderIndex, 1);
      this.game.bunch.recalculateSize();

      this.game.score += 10 * this.maxHp * this.game.level;

      this.game.scoreEl.innerHTML = this.game.score;
    }, 0);
  }

  shoot() {
    this.game.enemyBullets.push(
      new EnemyBullet({
        game: this.game,
        posX: this.posX + this.width / 2,
        posY: this.posY + this.height,
      })
    );
  }
}
