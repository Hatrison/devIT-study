import { Ability } from './Ability.js';

export class WeaponAbility extends Ability {
  constructor({ game, posY, posX, radius = 20, color = 'green' }) {
    super({ game, posY, posX, radius, color });
  }

  applyAbility() {
    this.game.player.reinforced = true;

    if (this.game.player.reinforcedTimeoutId) {
      clearTimeout(this.game.player.reinforcedTimeoutId);
    }

    this.game.player.reinforcedTimeoutId = setTimeout(() => {
      this.game.player.reinforced = false;
    }, 20 * 1000);
  }
}
