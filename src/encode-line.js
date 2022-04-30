const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let currentChar = str.charAt(0);
  let count = 1;
  let encoding = "";

  for (let i = 1; i < str.length; i++) {
    let char = str.charAt(i);
    if (char === currentChar) {
      count++;
    } else {
      encoding += count + currentChar;
      count = 1;
      currentChar = char;
    }
  }
  encoding += count + currentChar;
  return encoding
    .split("")
    .filter((item) => +item !== 1)
    .join("");
}

module.exports = {
  encodeLine,
};
