const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(str1, str2) {
  str1 = str1.split("");
  str2 = str2.split("");
  let count = 0;
  str1.forEach((item) => {
    let index = str2.indexOf(item);
    if (index !== -1) {
      count++;
      str2.splice(index, 1);
    }
  });
  return count;
}

module.exports = {
  getCommonCharacterCount,
};
