import { AliveObject } from './AliveObject.js';
import { EnemyBullet } from './EnemyBullet.js';

export class Invader extends AliveObject {
  static width = 45;
  static height = 45;

  constructor({ game, posX = 0, posY = 0, velocity = 3 }) {
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
  }

  update(velocity) {
    this.render();
    this.move(velocity);
    this.collideWithBullet();
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
        setTimeout(() => {
          const bulletIndex = this.game.bullets.indexOf(bullet);
          this.game.bullets.splice(bulletIndex, 1);

          const invaderIndex = this.game.bunch.invaders.indexOf(this);
          this.game.bunch.invaders.splice(invaderIndex, 1);
          this.game.bunch.recalculateWidth();

          this.game.score += 10;

          this.game.scoreEl.innerHTML = this.game.score;
        }, 0);
      }
    });
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
