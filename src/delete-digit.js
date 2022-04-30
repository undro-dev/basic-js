const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let res = [];
  n = String(n)
    .split("")
    .map((item) => +item);
  let array = Array.from({ length: n.length }, () => [...n]);
  array.forEach((item, index) => {
    item.splice(index, 1);
    res.push(item);
  });
  res = res.map((item) => +item.join(""));
  return Math.max(...res);
}

module.exports = {
  deleteDigit,
};
