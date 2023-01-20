"use strict"

//abstract class
class Hashable {
    //private field
    #normal_value;

    constructor(input_value) {
        if (this.constructor === Hashable) {
            throw new Error("Don't create abstract class.");
        } else {
            this.#normal_value = input_value;
        }
    }

    //transfer value to hash code
    hashVal() {}

    //compare two objects
    equals(object) {}
}
module.exports = Hashable;