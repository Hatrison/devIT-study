const allowedChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

const givenPassword = 'qTuIp';

/**
 * Function to check a password.
 * @param {string} password - The password to check.
 * @returns {boolean} - Returns true if the password matches the target.
 */
const login = (password) => {
  return password === givenPassword;
};

/**
 * Creates an array of indexes with the specified length.
 * @param {number} length - The length of the indexes array.
 * @returns {number[]} - An array of indexes with initial values of 0.
 */
const createMask = (length = 1) => {
  return new Array(length).fill(0);
};

/**
 * Generates a password based on an array of indexes.
 * @param {number[]} indexes - The array of indexes for generating the password.
 * @returns {string} - The generated password.
 */
const generatePassword = (indexes) => {
  return indexes.map(index => allowedChars[index]).join('');
};

/**
 * Increments an array of indexes systematically for generating passwords.
 *
 * @param {number[]} indexes - An array of indexes.
 * @param {number} index - The current index in the `indexes` array.
 *
 * @returns {[number[], number]} - A tuple containing the updated `indexes` array and the current `index`.
 * If all combinations have been exhausted, the `index` will be negative, indicating the search is done.
 */
const incrementIndexes = (indexes, index) => {
  // Loop to increment indexes systematically, starting from the last character.
  while (index >= 0) {
    if (indexes[index] < allowedChars.length - 1) {
      // If the character index is not at the maximum, increment it and exit the loop.
      indexes[index]++;
      return [indexes, index];
    } else {
      // If the character index is at the maximum, reset it to 0 and move to the previous character.
      indexes[index] = 0;
      index--;
    }
  }

  // If all combinations have been exhausted, return an indicator that the search is done.
  return [indexes, index];
};

/**
 * Performs brute force password search of various lengths.
 * @param {number} endLength - Maximum password length to search for.
 * @returns {string|null} - The found password or null if the password is not found.
 */
const brute = (endLength = 5) => {
  for (let i = 1; i <= endLength; i++) {
    let indexes = createMask(i);

    while (true) {
      const password = generatePassword(indexes);

      if (login(password)) {
        console.log(`Password found: ${password}`);
        return password;
      }

      let index = indexes.length - 1;
      [indexes, index] = incrementIndexes(indexes, index);

      // If index becomes less than 0, it means all combinations have been exhausted for this password length.
      // In this case, exit the loop to move to the next password length.
      if (index < 0) {
        break;
      }
    }
  }

  console.log('Password not found.');
  return null;
};

brute(givenPassword.length);


