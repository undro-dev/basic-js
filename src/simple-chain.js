const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  chainMaker: [],

  getLength() {
    return chainMaker.length;
  },
  addLink(value) {
    value === undefined ? this.chainMaker.push("") : this.chainMaker.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    if (position <= 0 || position > this.chainMaker.length - 1 || !Number.isInteger(position)) {
      this.chainMaker = [];
      throw new Error("You can't remove incorrect link!");
    } else {
      this.chainMaker.splice(position - 1, 1);
      return this;
    }
  },
  reverseChain() {
    this.chainMaker.reverse();
    return this;
  },
  finishChain() {
    let finishChainMaker = this.chainMaker.join("~~");
    this.chainMaker = [];
    return finishChainMaker;
  },
};

module.exports = {
  chainMaker,
};
