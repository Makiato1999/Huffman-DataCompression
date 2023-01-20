"use strict"

const kvPair = require("./kvPair");

class PriorityQueue {
    //private
    #_pq;

    constructor() {
        this.#_pq = [];
    }

    enqueue(element) {
        if ( element instanceof kvPair ) {
            if ( (this.#_pq).length == 0 ) {//empty
                (this.#_pq).push(element);
            } else {
                let index = 0;
                let sameArr = [];
                for (index = 0; index < this.#_pq.length; index++) {
                    if ( (this.#_pq)[index] instanceof kvPair) {
                        if ( ((this.#_pq)[index]).value > element.value ) {
                            //this.#_pq.splice(index, 0, element);

                            break;
                        }
                    } else {
                        throw new Error("priority queue inside element is not kvPair type");
                    }
                }
                this.#_pq.splice(index, 0, element);

                //now index which is one > element.value position, then we go back and traverse
                let j;
                for (j = 0; j < index; j++) {
                    if ( ((this.#_pq)[j]).value == element.value ) {

                        for (let k = index - 1; k >= j ; k--) { 
                            if ( this.compareTo( ((this.#_pq)[k]), element ) == false) {
                                let temp = ((this.#_pq)[k]);
                                this.#_pq.splice(k, 1, element);
                                this.#_pq.splice(k + 1, 1, temp);
                            }
                        }
                        break;

                    }
                }
                
            }
        } else {
            throw new Error("input element is not kvPair type");
        }
    }

    dequeue() {
        if ( (this.#_pq).length != 0 ) {
            return (this.#_pq).shift();
        } else {
            return 0;
        }
    }

    get array() {
        return this.#_pq;
    }


    // printQueue function
    printPQueue() {
	    var str = "";
	    for (var i = 0; i < this.#_pq.length; i++) {
            str += (this.#_pq)[i] + " ";
        }
	    return str;
    }


    compareTo(item, element) {
        let result = 0;
        let this_minASCII;
        let that_minASCII;
        //traverse this character to find smallest ASCII

        if (item instanceof kvPair && element instanceof kvPair) {
            let j = 0;
            this_minASCII = (item.key).charCodeAt(j);
            for (j = 1; j < (item.key).length; j++) {
                if ( (item.key).charCodeAt(j) < this_minASCII ) {
                    this_minASCII = (item.key).charCodeAt(j);
                }
            }

            let k = 0;
            that_minASCII = (element.key).charCodeAt(k);
            for (k = 1; k < (element.key).length; k++) {
                if ( (element.key).charCodeAt(k) < that_minASCII ) {
                    that_minASCII = (element.key).charCodeAt(k);
                }
            }
        }
        
        //compare
        if ( this_minASCII < that_minASCII ) {
            result = true;
        } else if ( this_minASCII > that_minASCII ) {
            result = false;
        } else {// == situation is impossible 
            return 0;
        }
        return result;//return position
    }


}
module.exports = PriorityQueue;