"use strict"

const kvPair = require('./kvPair.js');
const Hashable = require('./Hashable.js');

class IntHash extends Hashable {
    //private field
    #hash_value;
    #_key;

    constructor(input_value) {
        super();
        this.#hash_value = 0;
        if (typeof input_value  === 'number') {
            this.#_key = input_value;
        } else {
            throw new Error("Your input should be int type.");
        }
    }

    //return value in int object
    get key() {
        return this.#_key;
    }

    //transfer int to hash
    hashVal() {
        this.#hash_value = this.#_key;
        return this.#hash_value;
    }

    //compare two int object
    equals(object) {
        let result = false;
        if (object instanceof kvPair) {
            if (object.key instanceof IntHash) {
                if (this.key === object.key) {
                    result = true;
                }
            } else {
                throw new Error("object.key is not IntHash type");
            }
        } else {
            throw new Error("object is not kvPair type")
        }
        return result;
    }
}
module.exports = IntHash;