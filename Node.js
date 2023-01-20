"use strict"

class Node {
    //private field
    #_data;
    #_counter;
    #_next;

    constructor(data) {
        this.#_data = data;
        this.#_counter = 1;
        this.#_next = null;
    }

    get data() {
        return this.#_data;
    }

    get next() {
        return this.#_next;
    }

    set next(next) {
        this.#_next = next;
    }

    get counter() {
        return this.#_counter;
    }

    set counter(num) {
        this.#_counter = num;
    }

}
module.exports = Node;