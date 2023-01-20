"use strict"

const LEFT = 0;
const RIGHT = 1;

class TreeNode {
    //private field
    #_character;
    #_weight;
    #_code;
    #_left;
    #_right;

    constructor(character, weight, code) {
      if (arguments.length == 2) {
        this.#_character = character;
        this.#_weight = weight;
        this.#_code = "";
      } else if (arguments.length == 3) {
        this.#_character = character;
        this.#_weight = weight;
        this.#_code = code;
      } else {
        throw new Error("Invalid input");
      }
        this.#_left = null;
        this.#_right = null;
    }

    get character() {
        return (this.#_character);
    }

    set character(character) {
      this.#_character = character;
    }

    get weight() {
        return this.#_weight;
    }

    set weight(weight) {
      this.#_weight = weight;
    }

    get code() {
        return (this.#_code).toString();
    }

    set code(newCode) {
        this.#_code = newCode.toString();
    }

    get left() {
        return this.#_left;
    }

    set left(left) {
      this.#_left = left;
    }

    get right() {
        return this.#_right;
    }

    set right(right) {
      this.#_right = right;
    }
}
module.exports = TreeNode;