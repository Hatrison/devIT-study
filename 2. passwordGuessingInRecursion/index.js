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
 * Recursively iterates through possible character combinations to find the password.
 * @param {number[]} indexes - Array of character indexes.
 * @param {number} level - Current recursion level.
 * @returns {string|null} - The found password or null if the password is not found.
 */
const recursiveGuessing = (indexes, level) => {
  if (level < 0) {
    const password = generatePassword(indexes);
    return login(password) ? password : null;
  }

  for (let i = 0; i < allowedChars.length; i++) {
    indexes[level] = i;
    const result = recursiveGuessing(indexes, level - 1);
    if (result) return result;
  }

  return null;
};

/**
 * Performs brute force password search of various lengths.
 * @param {number} endLength - Maximum password length to search for.
 * @returns {string|null} - The found password or null if the password is not found.
 */
const brute = (endLength = 5) => {
  for (let i = 1; i <= endLength; i++) {
    const indexes = createMask(i);
    const result = recursiveGuessing(indexes, indexes.length - 1);
    if (result) {
      console.log(`Password found: ${result}`);
      return result;
    }
  }

  console.log('Password not found.');
  return null;
};

brute(givenPassword.length);
