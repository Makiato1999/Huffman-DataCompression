"use strict"

const Hashable = require('./Hashable.js');
const kvPair = require('./kvPair.js');
const Node = require('./Node.js');

class LinkedList {
    //private field
    #_head;

    constructor() {
        this.#_head = null;
    }

    insert(data) {
        this.#_head = new Node(data);
    }

    isEmpty() {
        return (this.#_head === null);
    }

    find(key) {
        let result = null;
        let curr = this.#_head;
        //list is not empty
        //traverse
        if (curr instanceof Node) {

            while (curr !== null) {
                if (curr.data instanceof kvPair) {
                    if (key instanceof Hashable) {
                        if ((curr.data).key.key === key.key) {
                            result = curr.data;
                            break;
                        }
                    } else {
                        throw new Error("key is not hashable")
                    }
                } else {
                    throw new Error("curr.data is not kvPair type");
                }
                curr = curr.next;
            }
        }
        return result;//return kvPair object
    }

    replace(_entry) {
        let curr = this.#_head;
        let prev = null;

        if (_entry instanceof kvPair) {
            let newNode = new Node(_entry);
            //list is not empty
            //traverse
            if (curr instanceof Node) {
                while (curr !== null) {
                    if (curr.data instanceof kvPair && _entry instanceof kvPair) {
                        if ((curr.data).key.key === _entry.key.key) {
                            (curr.data).value = _entry.value;

                            curr.counter += 1;
                            break;
                        }
                    } else {
                        throw new Error("curr.data is not kvPair type");
                    }
                    prev = curr;
                    curr = curr.next;
                }
            }
        }
        /*
        //list is not empty
        //traverse
        if (curr instanceof Node) {
            while (curr !== null) {
                if (curr.data instanceof kvPair) {
                    if ((curr.data).key === key) {
                        prev.next = newNode;
                        prev.next.next = curr.next;
                        break;
                    }
                } else {
                    throw new Error("curr.data is not kvPair type");
                }
                prev = curr;
                curr = curr.next;
            }
        }
        */
    }

    traverse() {//transfer list to an array
        let curr = this.#_head;
        let key_array = [];
        if (curr instanceof Node) {
            while (curr !== null) {
                key_array.push(curr);
  
                curr = curr.next;
            }
        } else {
            throw new Error("curr is not Node type");
        }
        return key_array;//return node object
    }
    
}
module.exports = LinkedList;