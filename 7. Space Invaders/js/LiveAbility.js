import { Ability } from './Ability.js';

export class LiveAbility extends Ability {
  constructor({ game, posY, posX, radius = 20, color = 'red' }) {
    super({ game, posY, posX, radius, color });
  }

  applyAbility() {
    this.game.increaseLive();
  }
}
