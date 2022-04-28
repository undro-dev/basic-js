const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) throw new Error(`'arr' parameter must be an instance of the Array!`);
  let array = arr.concat();
  for (let i = 0; i < array.length; i++) {
    if ((array[i] == "--double-next" || array[i] == "--discard-next") && array[i + 1] == undefined) {
      array.splice(i, 1);
    }
    if ((array[i] == "--discard-prev" || array[i] == "--double-prev") && array[i - 1] == undefined) {
      array.splice(i, 1);
    }

    if (array[i] == "--double-next" && array[i + 1] == arr[arr.indexOf("--double-next") + 1]) {
      array.splice(i, 1, array[i + 1]);
    }
    if (array[i] == "--discard-next" && array[i + 1] == arr[i + 1]) {
      array.splice(i, 2);
    }
    if (array[i] == "--double-prev" && array[i - 1] == arr[arr.indexOf("--double-prev") - 1]) {
      array.splice(i, 1, array[i - 1]);
    } else if (array[i] == "--double-prev") {
      array.splice(i, 1);
    }
    if (array[i] == "--discard-prev" && array[i - 1] !== arr[arr.indexOf("--discard-prev") - 1]) {
      array.splice(i, 1);
    } else if (array[i] == "--discard-prev" && array[i - 1] == arr[arr.indexOf("--discard-prev") - 1]) {
      array.splice(i - 1, 2);
    }
  }
  return array;
}

module.exports = {
  transform,
};
