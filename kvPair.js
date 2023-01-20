"use strict"

class kvPair {
    //private field
    #_key;
    #_value;

    constructor(key, value) {
        this.#_key = key;
        this.#_value = value;
    }

    get key() {
        return this.#_key;
    }

    get value() {
        return this.#_value;
    }

    set value(newvalue) {
        this.#_value = newvalue;
    }

    
}
module.exports = kvPair;