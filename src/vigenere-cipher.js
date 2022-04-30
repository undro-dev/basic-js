const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const englishLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const START_POSITION_CHARCODE = 65;
function createArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let deleteEl = arr[i].splice(0, i);
    arr[i].push(...deleteEl);
  }
  return arr;
}
const tabulaRecta = createArr(Array.from({ length: englishLetters.length }, () => [...englishLetters]));

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this._reverseFlag = !isDirect;
  }
  encrypt(message, key) {
    if (message == undefined || key == undefined) throw Error("Incorrect arguments!");
    const keyUC = key.toUpperCase();
    const keyUCDried = keyUC.replace(/\s/g, "");

    const messageUC = message.toUpperCase();
    const messageUCDried = messageUC.trim();

    const res = [];

    const keyLength = keyUCDried.length;
    const msgLength = messageUCDried.length;

    for (let i = 0, n = 0; i < msgLength; i += 1, n += 1) {
      const messageChar = messageUCDried[i];
      if (!~alphabet.indexOf(messageChar)) {
        res.push(messageChar);
        n--;
        continue;
      }
      const messageCharCode = messageChar.charCodeAt(0);
      const shiftedRowIndex = keyUCDried.charCodeAt(n % keyLength) - START_POSITION_CHARCODE;
      const shiftedCharIndex = messageCharCode - START_POSITION_CHARCODE;
      res.push(tabulaRecta[shiftedRowIndex][shiftedCharIndex]);
    }
    if (this._reverseFlag === true) return res.reverse().join("");
    return res.join("");
  }
  decrypt(encryptedMessage, key) {
    if (encryptedMessage == undefined || key == undefined) throw Error("Incorrect arguments!");

    const keyUC = key.toUpperCase();
    const keyUCDried = keyUC.replace(/\s/g, "");

    const encryptedMessageUC = encryptedMessage.toUpperCase();
    const encryptedMessageUCDried = encryptedMessageUC.trim();

    const keyLength = keyUCDried.length;
    const msgLength = encryptedMessageUCDried.length;

    const res = [];

    for (let i = 0, n = 0; i < msgLength; i++, n++) {
      let encryptedMessageChar = encryptedMessageUCDried[i];

      const rowIndex = keyUCDried.charCodeAt(n % keyLength) - START_POSITION_CHARCODE;

      const row = tabulaRecta[rowIndex];

      if (!~alphabet.indexOf(encryptedMessageChar)) {
        res.push(encryptedMessageChar);
        n--;
        continue;
      }
      const targetIndex = row.indexOf(encryptedMessageChar);
      const unshiftedRow = tabulaRecta[0];
      const trueChar = unshiftedRow[targetIndex];

      res.push(trueChar);
    }
    if (this._reverseFlag === true) return res.reverse().join("");
    return res.join("");
  }
}

module.exports = {
  VigenereCipheringMachine,
};
