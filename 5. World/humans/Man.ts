import { Human } from './Human.ts';

export class Man extends Human {
  /**
   * The gender of the human (always 'male').
   */
  public gender: string;

  /**
   * Create a Man.
   * @constructor
   * @param {...any} args - Arguments passed to the constructor of the base Human class.
   */
  constructor(...args: any[]) {
    super(...args);
    this.gender = 'male';
  }

  /**
   * Overrides the createPair method to set the partner's surname.
   * @param {Human[]} humans - An array of humans to find a partner from.
   * @returns {boolean} - True if a pair is created, false if not.
   */
  public createPair(humans: Human[]): boolean {
    const isPairCreated: boolean = super.createPair(humans);
    if (isPairCreated) this.partner.surname = this.surname;

    return isPairCreated;
  }
}
