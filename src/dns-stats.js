const { NotImplementedError } = require("../extensions/index.js");

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(arr) {
  let res = {};
  arr = arr
    .map((item) => item.split("."))
    .map((item) => item.reverse())
    .map((item) => item.join("."));

  arr.forEach((item) => {
    res[item] = 1;
  });
  arr = arr.map((item) => item.split(""));
  arr.forEach((item) => {
    let indexLast = item.lastIndexOf(".");
    item.splice(indexLast);
  });
  arr.forEach((item) => {
    if (!res[item.join("")]) {
      res[item.join("")] = 1;
    } else {
      res[item.join("")]++;
    }
  });
  arr = arr.filter((item) => item.indexOf(".") !== -1);
  arr.forEach((item) => {
    let indexLast = item.lastIndexOf(".");
    res[item.splice(0, indexLast).join("")]++;
  });
  res = Object.entries(res).map(([key, value]) => [`.${key}`, value]);
  let obj = {};
  res.forEach((item) => {
    obj[item[0]] = item[1];
  });
  return obj;
}

module.exports = {
  getDNSStats,
};
