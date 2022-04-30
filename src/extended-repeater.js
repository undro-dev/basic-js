const { NotImplementedError } = require("../extensions/index.js");

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  typeof str !== "string" ? (str = String(str)) : (str = str);
  if (options.addition == null && typeof options.addition == "object") options.addition = "null";
  if (options.addition == undefined) options.addition = "";
  if (typeof options.addition !== "string") options.addition = String(options.addition);
  if (options.separator == undefined) options.separator = "+";
  if (options.additionSeparator == undefined) options.additionSeparator = "|";

  let strAdd = str + options.addition + (options.additionSeparator + options.addition).repeat(options.additionRepeatTimes - 1);
  let result = strAdd + (options.separator + strAdd).repeat(options.repeatTimes - 1);
  return result;
}

module.exports = {
  repeater,
};
