"use strict"

const IntHash = require('./IntHash.js');
const StringHash = require('./StringHash.js');
const LinkedList = require('./LinkedList.js');
const kvPair = require('./kvPair.js');

//hash table
class Dictionary {
    //private field
    #_array;
    #_size;

    constructor(size) {
        if (typeof size === 'number' && size >= 0) {
            this.#_size = size;
            this.#_array = new Array(size);
            for (let index = 0; index < size; index++) {
                this.#_array[index] = new LinkedList();
            }
        } else {
            throw new Error("Your input size should be positive integer.")
        }
    }

    put(key, value) {
        if (key instanceof IntHash || key instanceof StringHash) {
            let hash_value = key.hashVal();
            let position = Number(hash_value) % this.#_size;
            if (this.contains(key) === true) {//find same hash_value
                if ((this.#_array[position]) instanceof LinkedList) {
                    if ((this.#_array[position]).find(key) != null) {//find same key
                        let _entry = new kvPair(key, value);
                        (this.#_array[position]).replace(_entry);
                    } else {//cant find same key
                        let _entry = new kvPair(key, value);
                        if ((this.#_array[position]) instanceof LinkedList) {
                            (this.#_array[position]).insert(_entry);
                        }
                    }
                }
            } else {//cant find same key
                let _entry = new kvPair(key, value);
                if ((this.#_array[position]) instanceof LinkedList) {
                    (this.#_array[position]).insert(_entry);
                }
            }
        } else {
            throw new Error("key is not hashable type");
        }
    }

    get(key) {
        let result = null;
        if (this.contains(key) === true) {//find same hash_value
            if (key instanceof IntHash || key instanceof StringHash) {
                let hash_value = key.hashVal();
                let position = Number(hash_value) % this.#_size;
                if ((this.#_array[position]) instanceof LinkedList) {//find same key

                    let element = (this.#_array[position]).find(key);
                    if (element instanceof kvPair) {
                        result = element.value;
                    } else {
                        throw new Error("element is not kvPair type");
                    }
                }
            } else {
                return undefined;
            }
        } else {
            throw new Error("cant find this key in dictionary");
        }
        return result;//return value
    }

    contains(key) {
        let result = false;
        if (key instanceof IntHash || key instanceof StringHash) {
            let hash_value = key.hashVal();
            let position = Number(hash_value) % this.#_size;
            if ((this.#_array[position]) instanceof LinkedList) {
                if ((this.#_array[position]).isEmpty() === true) {
                    result = false;
                } else {
                    result = true;
                }
            }
        }
        return result;
    }

    isEmpty() {
        let result = true;
        for (let index = 0; index < this.#_size; index++) {
            if ((this.#_array[index]) instanceof LinkedList) {
                if ((this.#_array[index]).isEmpty() == false) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    }

    get size() {
        return this.#_size;
    }

    get array() {
        return this.#_array;
    }
}
module.exports = Dictionary;



