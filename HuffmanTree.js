"use strict"

const TreeNode = require("./TreeNode");

class HuffmanTree {
    #_root;

    constructor(root) {
        if (root instanceof TreeNode) {
            this.#_root = root;
        }
    }

    get root() {
        return this.#_root;
    }

    combine(subTree) {
        //combine this and parameter subtree
        let newRoot = new TreeNode('', 0);
        let newTree = new HuffmanTree(newRoot);

        if (newTree.root instanceof TreeNode) {
            if ( this.compareTo(subTree) == -1 ) {
                //thisTree < another subTree, 
                //thisTree(left), another subTree(right)
                (newTree.root).left = this.root;
                (newTree.root).right = subTree.root;
                //update new root weight
                (newTree.root).weight = (this.root).weight + (subTree.root).weight;
                //update new root character
                (newTree.root).character = ((this.root).character).toString() + ((subTree.root).character).toString();
            } else if ( this.compareTo(subTree) == 1 ) {
                //thisTree > another subTree, 
                //another subTree(left), thisTree(right)
                (newTree.root).left = subTree.root;
                (newTree.root).right = this.root;
                //update new root weight
                (newTree.root).weight = (subTree.root).weight + (this.root).weight;
                //update new root character
                (newTree.root).character = ((subTree.root).character).toString() + ((this.root).character).toString();
            } else if ( this.compareTo(subTree) == 0 ) {
                //thisTree = another subTree

                //traverse this tree to find smallest ASCII
                let this_minASCII = ((this.root).character).charCodeAt(0);
                for (let index = 1; index < ((this.root).character).length; index++) {
                    if ( ((this.root).character).charCodeAt(index) < this_minASCII ) {
                        this_minASCII = ((this.root).character).charCodeAt(index);
                    }
                }
                //traverse another tree(parameter subTree) to find smallest ASCII
                let that_minASCII = ((subTree.root).character).charCodeAt(0);
                for (let index = 1; index < ((subTree.root).character).length; index++) {
                    if ( ((subTree.root).character).charCodeAt(index) < that_minASCII ) {
                        that_minASCII = ((subTree.root).character).charCodeAt(index);
                    }
                }
                //compare
                if ( this_minASCII < that_minASCII ) {
                    //thisTree(left), another subTree(right)
                    (newTree.root).left = this.root;
                    (newTree.root).right = subTree.root;
                    //update new root weight
                    (newTree.root).weight = (this.root).weight + (subTree.root).weight;
                    //update new root character
                    (newTree.root).character = ((this.root).character).toString() + ((subTree.root).character).toString();
                } else if ( this_minASCII > that_minASCII ) {
                    //another subTree(left), thisTree(right)
                    (newTree.root).left = subTree.root;
                    (newTree.root).right = this.root;
                    //update new root weight
                    (newTree.root).weight = (subTree.root).weight + (this.root).weight;
                    //update new root character
                    (newTree.root).character = ((subTree.root).character).toString() + ((this.root).character).toString();
                } else {// == situation is impossible 
                    return 0;
                }
                
            }
        } else {
            throw new Error("newTree.root is not TreeNode type");
        }
        return newTree;
    }

    compareTo(subTree) {
        let result = 0;
        let deviation = Math.pow(10, -10);
        if (subTree instanceof HuffmanTree) {
            if (subTree.root instanceof TreeNode && this.root instanceof TreeNode) {
                if ( (this.root).weight < (subTree.root).weight ) {
                    //thisTree < another subTree, 
                    //thisTree(left), another subTree(right)
                    result = -1;
                } else if ( (this.root).weight > (subTree.root).weight ) {
                    //thisTree > another subTree, 
                    //another subTree(left), thisTree(right)
                    result = 1;
                } else if ( Math.abs((this.root).weight - (subTree.root).weight) < deviation ) {
                    //thisTree = another subTree
                    result = 0;
                }
            } else {
                throw new Error("subTree.root / this.root is not TreeNode type");
            }
        } else {
            throw new Error("subTree is not HuffmanTree type");
        }
        return result;
    }

    traverseTree(theTree) {//层级遍历
        let output = [];
        if (theTree instanceof HuffmanTree) {
            if (theTree.root instanceof TreeNode) {
                let queue = [];
                queue.push(theTree.root);
                while (queue.length > 0) {
                    let current = queue.shift();
                    if (current instanceof TreeNode) {
                        if ( current.left !== null && current.left instanceof TreeNode) {
                            (current.left).code = current.code + "0";
                            queue.push(current.left);
                        }
                        if ( current.right !== null && current.right instanceof TreeNode) {
                            (current.right).code = current.code + "1";
                            queue.push(current.right);
                        } 

                        if ( current.left === null && current.right === null ) {//current is leaf 
                            let newNode = new TreeNode(current.character, current.weight, current.code);
                            output.push(newNode);//save all leaves 
                        }
                    } else {
                        throw new Error("current is not TreeNode type / queue should save treeNode type");
                    }
                }
            } else {
                throw new Error("theTree.root is not TreeNode type");
            }
        } else {
            throw new Error("subTree is not HuffmanTree type");
        }
        return output;//output is a node array, like ArrayList<TreeNode>
    }

}
module.exports = HuffmanTree;





