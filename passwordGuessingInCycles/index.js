const allowedChars = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];

const givenPassword = 'qTuIp';

const login = (password) => {
  return password === givenPassword;
};

const createMask = (length = 1) => {
  return new Array(length).fill(0);
};

const generatePassword = (indexes) => {
  return indexes.map(index => allowedChars[index]).join('');
};

const brute = (endLength = 5) => {
  for (let i = 1; i <= endLength; i++) {
    let indexes = createMask(i);

    while (true) {
      const password = generatePassword(indexes);
      console.log(indexes);

      if (login(password)) {
        console.log(`Password found: ${password}`);
        return password;
      }

      let j = indexes.length - 1;
      while (j >= 0) {
        if (indexes[j] < allowedChars.length - 1) {
          indexes[j]++;
          break;
        } else {
          indexes[j] = 0;
          j--;
        }
      }

      if (j < 0) {
        break;
      }
    }
  }

  console.log('Password not found.');
  return null;
};

brute(givenPassword.length);


