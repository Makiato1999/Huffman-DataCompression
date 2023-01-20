"use strict"

const kvPair = require('./kvPair.js');
const Hashable = require('./Hashable.js');

class StringHash extends Hashable {
    //private field
    #hash_value;
    #_key;

    constructor(input_value) {
        super();
        this.#hash_value = 0;
        if (typeof input_value  === 'string') {
            this.#_key = input_value;
        } else {
            throw new Error("Your input should be string type.")
        }
    }

    //return value in string object
    get key() {
        return this.#_key;
    }

    //transfer string to hash
    hashVal() {
        let p = 2;//prime
        let result = 0;
        let length = (this.#_key).length;
        let counter = length;
        for (let index = 0; index < length; index++) {
            //s[0]*p^n-1 + s[1]*p^n-2 + ...+ s[n-3]*p^2 + s[n-2]*p + s[n-1]
            let temp = Math.pow(p, --counter);
            result += this.#_key.charCodeAt(index) * temp;
        }
        this.#hash_value = result;
        return this.#hash_value;
    }

    //compare two string object
    equals(object) {
        let result = false;
        if (object instanceof kvPair) {
            if (object.key instanceof StringHash) {
                if (this.key === object.key) {
                    result = true;
                }
            } else {
                throw new Error("object.key is not StringHash type");
            }
        } else {
            throw new Error("object is not kvPair type");
        }
        return result;
    }
}
module.exports = StringHash;