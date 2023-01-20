let assert = require('assert');
const HuffmanTree = require('./HuffmanTree.js');
const TreeNode = require('./TreeNode.js');
let newtree;
let a = new TreeNode('a', 0.02);
let A = new HuffmanTree(a);

let b = new TreeNode('b', 0.09);
let B = new HuffmanTree(b);

let c = new TreeNode('c', 0.02);
let C = new HuffmanTree(c);

let d = new TreeNode('d', 0.5);
let D = new HuffmanTree(d);

let e = new TreeNode('e', 0.9);
let E = new HuffmanTree(e);

newtree = A.combine(C);
let newtree2 = newtree.combine(B);

let newtree3 = D.combine(E);
let newtree4 = newtree2.combine(newtree3);

let treeNodeArr = newtree4.traverseTree(newtree4);
//console.log(treeNodeArr.length);
for (let index = 0; index < treeNodeArr.length; index++) {
    if (treeNodeArr[index] instanceof TreeNode) {
        console.log( (treeNodeArr[index]).character + "    |    " + (treeNodeArr[index]).code );
    } else {
        throw new Error("treeNodeArr[index] is not TreeNode type");
    }
}