"use strict"
const fs = require('fs');


const Dictionary = require('./Dictionary.js');
const HuffmanTree = require('./HuffmanTree.js');
const IntHash = require('./IntHash.js');
const kvPair = require('./kvPair.js');
const LinkedList = require('./LinkedList.js');
const Node = require('./Node.js');
const PriorityQueue = require('./PriorityQueue.js');
const StringHash = require('./StringHash.js');
const TreeNode = require('./TreeNode.js');

class HuffmanEncoder {
    //private field
    #_file;

    constructor(fileName) {
        if (typeof fileName === 'string') {
            this.#_file = fileName;
        } else {
            throw new Error("input should be like 'fileName.txt' ");
        }
    }

    encode() {
        let file = fs.readFileSync(this.#_file, 'utf8');
        if (typeof file === 'string') {
            //process text file
            let dictionary = new Dictionary(file.length);
            for (let index = 0; index < file.length; index++) {
                let key;
                let char = file.charAt(index);
                if (typeof char === 'string') {
                    key = new StringHash(char);
                } else if (typeof char === 'number') {
                    key = new IntHash(char);
                }
                dictionary.put(key, 0);
            }

            let pq = new PriorityQueue();
            //add to priority queue
            let pq_key;
            let weight;
            let pq_element;
            //traverse dictionary and put items in priority queue, prepare to operate tree
            for (let i = 0; i < dictionary.size; i++) {
                if ((dictionary.array)[i] instanceof LinkedList) {
                    if (((dictionary.array)[i]).isEmpty() == false) {
                        let temp = ((dictionary.array)[i]).traverse();//return node arr
                        //console.log((temp[0]).data.key.key +  "    |    " + (temp[0]).counter);
                        for (let j = 0; j < temp.length; j++) {
                            if (temp[j] instanceof Node) {
                                weight = (temp[j]).counter / file.length;
                                pq_key = (temp[j]).data.key.key;//pq_key is not string, pq_key.key is string
                                //console.log(pq_key.key  +  "    |    " + weight);
                                pq_element = new kvPair(pq_key, weight);
                                pq.enqueue(pq_element);
                            }
                        }
                    }
                } else {
                    throw new Error("dictionary[index] is not LinkedList type");
                }
            }
            this.printPQ(pq);
            //add to priority queue finished
            
            //this.processHuffman(pq);
            this.processHuffman(pq);

            
        } else {
            throw new Error("text file cant transfer to string");
        }
    }

    processHuffman(pq) {//PQ element is kvPair type, but in this kvPair, key is character(don't need to .key.key), value is weight
        console.log("---------------------------------------------------------------------------------------------------------");
        console.log("Start to construct Huffman tree:");
        
        if (pq instanceof PriorityQueue) {

            let root1;
            let tree1;
            let root2;
            let tree2;
            let newtree;
            let rootArr = [];
            let flag = false;
            while(pq.array.length > 1) {
                if (rootArr.length > 0) {
                     //get two smallest priority element, and construct two tree
                    let pair = pq.dequeue();
                    for (let index = 0; index < rootArr.length; index++) {
                        if (rootArr[index] instanceof HuffmanTree) {
                            if ((rootArr[index]).root.weight == pair.value && (rootArr[index]).root.character == pair.key) {
                                root1 = (rootArr[index]).root;
                                rootArr.splice(index, 1);
                                flag = true;
                                break;
                            } else {
                                flag = false;
                            }
                        } else {
                            throw new Error("rootArr[index] is not HuffmanTree type");
                        }
                    }
                    if (flag == false) {
                        root1 = new TreeNode(pair.key, pair.value);
                    }
                    tree1 = new HuffmanTree(root1);

                    flag = false;
                    pair = pq.dequeue();
                    for (let index = 0; index < rootArr.length; index++) {
                        if (rootArr[index] instanceof HuffmanTree) {
                            if ((rootArr[index]).root.weight == pair.value && (rootArr[index]).root.character == pair.key) {
                                root2 = (rootArr[index]).root;
                                rootArr.splice(index, 1);
                                flag = true;
                                break;
                            } else {
                                flag = false;
                            }
                        } else {
                            throw new Error("rootArr[index] is not HuffmanTree type");
                        }
                    }
                    if (flag == false)  {
                        root2 = new TreeNode(pair.key, pair.value);
                    }
                    tree2 = new HuffmanTree(root2);
                } else {//initiallize
                    //get two smallest priority element, and construct two tree
                    let pair = pq.dequeue();
                    root1 = new TreeNode(pair.key, pair.value);
                    //console.log(pair.key + "    |    " + pair.value);
                    tree1 = new HuffmanTree(root1);

                    pair = pq.dequeue();
                    root2 = new TreeNode(pair.key, pair.value);
                    //console.log(pair.key + "    |    " + pair.value);
                    tree2 = new HuffmanTree(root2);
                }
               
                //combine two tree
                newtree = tree1.combine(tree2);
                rootArr.push(newtree);
                console.log("---------------------------------------------------------------------------------------------------------");
                console.log("Join "+ JSON.stringify((newtree.root.left).character)
                            +" and "+ JSON.stringify((newtree.root.right).character)
                            +" into a tree (weight "
                            +(newtree.root).weight+")");
                let newPQpair = new kvPair(newtree.root.character, newtree.root.weight);
                pq.enqueue(newPQpair);

                this.printPQ(pq);
            }

            console.log("---------------------------------------------------------------------------------------------------------");
            console.log("Huffman encoding for the file is:");
            console.log("---------------------------------------------------------------------------------------------------------");
            let treeNodeArr = newtree.traverseTree(newtree);
            //let outputString = '';
            //console.log(treeNodeArr.length);
            for (let index = 0; index < treeNodeArr.length; index++) {
                if (treeNodeArr[index] instanceof TreeNode) {
                    console.log( JSON.stringify( (treeNodeArr[index]).character ) + "                        " + (treeNodeArr[index]).code );

                    //outputString += JSON.stringify( (treeNodeArr[index]).character )
                                    //+ "                        "
                                    //+ JSON.stringify( (treeNodeArr[index]).code ) + "\n";
                } else {
                    throw new Error("treeNodeArr[index] is not TreeNode type");
                }
            }

            



            //output encoded file
            let file = fs.readFileSync(this.#_file, 'utf8');
            let outputString = '';
            //traverse file
            for (let index = 0; index < file.length; index++) {

                //traverse treenode
                for (let index2 = 0; index2 < treeNodeArr.length; index2++) {
                    if (treeNodeArr[index2] instanceof TreeNode) {
                        if ((treeNodeArr[index2]).character === file.charAt(index) 
                            && file.charAt(index) != ' ' 
                            && file.charAt(index) != '\n' 
                            && file.charAt(index) != '\r') {
                            outputString += (treeNodeArr[index2]).code + " ";
                        }
                    } else {
                        throw new Error("treeNodeArr[index] is not TreeNode type");
                    }
                    
                }

            }

            fs.writeFileSync("hamlet.txt.huff", outputString);
            console.log("---------------------------------------------------------------------------------------------------------");

        } else {
            throw new Error("pq is not PriorityQueue type");
        }

    }


    printPQ(pq) {
        //print priority queue
        console.log("---------------------------------------------------------------------------------------------------------");
        console.log("Priority Queue:");
        for (let index = 0; index < (pq.array).length; index++) {
            console.log( JSON.stringify((pq.array)[index].key) + "                        " +  (pq.array)[index].value);
        }
    }
}
module.exports = HuffmanEncoder;



//let a = new HuffmanEncoder("Text.txt");
let a = new HuffmanEncoder("hamlet.txt");
a.encode();