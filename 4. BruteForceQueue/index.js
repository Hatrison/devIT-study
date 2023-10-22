import Queue from '../3. ConcurrentQueue/index.js';

const allowedChars = [
  'q',
  'w',
  'e',
  'r',
  't',
  'y',
  'u',
  'i',
  'o',
  'p',
  'Q',
  'W',
  'E',
  'R',
  'T',
  'Y',
  'U',
  'I',
  'O',
  'P',
];

const givenPassword = 'qTuIp';

/**
 * Represents a BruteForce class for password cracking.
 * @extends Queue
 */
class BruteForce extends Queue {
  /**
   * Create a new instance of the BruteForce class.
   * @param {number} [concurrency=1000] - The concurrency limit for concurrent execution.
   */
  constructor(concurrency = 1000) {
    super(concurrency);
    this.complete = () => console.log('Password not found!');
  }

  /**
   * Simulate a login attempt with a given password.
   * @param {string} password - The password to check.
   * @returns {Promise<{ success: boolean, password: string }>} - A promise that resolves with an object containing the success status and the password.
   */
  login = password => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: password === givenPassword, password });
      }, Math.random() * 1000);
    });
  };

  /**
   * Generate mask of indexes for password generation.
   * @param {number} [endLength=1] - The maximum length of the mask.
   * @yields {number[]} - An array of indexes with initial values of 0.
   */
  *createMask(endLength = 1) {
    let length = 1;
    while (length <= endLength) {
      yield new Array(length).fill(0);
      length++;
    }
  }

  /**
   * Generates a password based on an array of indexes.
   * @param {number[]} indexes - The array of indexes for generating the password.
   * @returns {string} - The generated password.
   */
  generatePassword = indexes => {
    return indexes.map(index => allowedChars[index]).join('');
  };

  /**
   * Generate the next combination of indexes for password generation.
   * @param {number[]} indexes - An array of indexes.
   * @yields {number[]} - The next combination of indexes.
   */
  *incrementIndexes(indexes) {
    let index = indexes.length - 1;

    while (index >= 0) {
      if (indexes[index] < allowedChars.length - 1) {
        indexes[index]++;
        yield indexes;
        index = indexes.length - 1;
      } else {
        indexes[index] = 0;
        index--;
      }
    }
  }

  /**
   * Brute force password searching.
   * @param {number} [endLength=1] - Maximum password length to search for.
   * @param {string[]} [knownChars=[]] - An array of characters that are known to be in the password.
   */
  brute = (endLength = 1, knownChars = []) => {
    const mask = this.createMask(endLength);
    let indexes = mask.next().value;
    let indexGenerator = this.incrementIndexes(indexes);

    while (true) {
      const password = this.generatePassword(indexes);

      const { value: nextIndexes, done } = indexGenerator.next();
      if (nextIndexes) indexes = nextIndexes;
      // If all combinations at the current length are processed, move to the next length.
      if (done) {
        indexes = mask.next().value;
        // If there are no more combinations to generate, exit the loop.
        if (!indexes) break;
        // Reset the indexGenerator to start from the beginning of the new combination length.
        indexGenerator = this.incrementIndexes(indexes);
      }

      // Calculate the number of known characters in the password.
      const charCount = knownChars.reduce((acc, char) => {
        if (password.includes(char)) return acc + 1;
        return acc;
      }, 0);
      // Calculate the priority based on the number of known characters.
      const priority = (charCount / password.length) * 100;

      this.add(() => this.login(password), {
        priority,
        onResolve: ({ success, password }) => {
          if (success) {
            console.log(`Password found: ${password}`);
            this.stop();
          }
        },
      });
    }
  };
}

const bruteForce = new BruteForce();
bruteForce.brute(givenPassword.length, ['q', 'T', 'u', 'I', 'p']);
