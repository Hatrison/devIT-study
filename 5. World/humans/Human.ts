export class Human {
  /**
   * Create a Human.
   * @constructor
   * @param {string} name - The name of the human.
   * @param {string} surname - The surname of the human.
   * @param {number} age - The age of the human.
   * @param {string} eyes - The color of the human eyes.
   * @param {string} hair - The color of the human's hair.
   * @param {string} skin - The color of the human's skin.
   * @param {string} bodyType - The body type of the human.
   * @param {number} maxHeight - The maximum height of the human.
   * @param {number} maxWeight - The maximum weight of the human.
   * @param {number} height - The current height of the human.
   * @param {number} weight - The current weight of the human.
   * @param {Human | any} partner - The partner of the human.
   * @param {Human[]} parents - The parents of the human.
   * @param {Human[]} children - The children of the human.
   * @param {string} profession - The profession of the human.
   * @param {string} gender - The gender of the human.
   */
  constructor(
    public name: string = 'Kolya',
    public surname: string = 'Valakas',
    public age: number = 0,
    public eyes: string = 'blue', //'brown' | 'blue' | 'green'
    protected hair: string = 'blond', // 'blond' | 'fair' | 'brunette' | 'ginger'
    protected skin: string = 'white', // 'white' | 'black'
    protected bodyType: string = 'meso', // 'ekto' | 'meso' | 'endo'
    protected maxHeight: number = 180,
    protected maxWeight: number = 100,
    protected height: number = 35,
    protected weight: number = 4,
    public partner: Human | any = null,
    public parents: Human[] = [],
    public children: Human[] = [],
    public profession?: string,
    public gender: string = 'male'
  ) {}

  /**
   * Checks if the human is eligible to create a pair.
   * @protected
   * @returns {boolean} - True if the human can create a pair, false if not.
   */
  protected canCreatePair(): boolean {
    return this.age >= 18 && this.partner === null;
  }

  /**
   * Creates a pair with another human from the given array.
   * @public
   * @param {Human[]} humans - An array of humans to find a partner from.
   * @returns {boolean} - True if a pair is successfully created, false if not.
   */
  public createPair(humans: Human[]): boolean {
    if (!this.canCreatePair()) return false;

    const partner: Human | null = this.findPartner(humans);
    if (!partner) return false;

    this.partner = partner;
    partner.partner = this;

    return true;
  }

  /**
   * Finds a suitable partner from the given array of humans.
   * @private
   * @param {Human[]} humans - An array of humans to search for a partner.
   * @returns {Human | null} - A suitable partner if found, or null if none are suitable.
   */
  private findPartner(humans: Human[]): Human | null {
    return (
      humans.find(
        (h: Human): boolean =>
          !this.isIncest(h) &&
          this.gender !== h.gender &&
          !h.partner &&
          h.age >= 18 &&
          Math.abs(this.age - h.age) <= 5
      ) || null
    );
  }

  /**
   * Checks if a human is a brother or sister of the current human (incest).
   * @param {Human} human - The human to check for incest.
   * @returns {boolean} - True if the specified human is a brother or sister, false if not.
   */
  public isIncest(human: Human): boolean {
    return this.parents[0]?.children.includes(human);
  }

  /**
   * Checks if the human is alive (age is less than or equal to 85).
   * @returns {boolean} - True if the human is alive, false if not.
   */
  public isAlive(): boolean {
    return this.age <= 85;
  }

  /**
   * Increases height and weight of the human based on age.
   */
  public increaseHeightAndWeight(): void {
    if (this.age < 3) {
      this.height += 25;
      this.weight += 3;
    } else if (this.age < 12) {
      this.height += 10;
      this.weight += 2;
    } else if (this.age < 18) {
      this.height += 2;
      this.weight += 1;
    } else {
      this.height >= this.maxHeight
        ? (this.height = this.maxHeight)
        : this.height++;
      this.weight >= this.maxWeight
        ? (this.weight = this.maxWeight)
        : this.weight++;
    }
  }

  public updateAbilityToBorn(): void {}

  public born(): Promise<Human[] | null> {
    return new Promise(resolve => {
      resolve(null);
    });
  }
}
