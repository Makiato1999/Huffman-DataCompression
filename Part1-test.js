let assert = require('assert');
const Dictionary = require('./Dictionary');
const IntHash = require('./IntHash');
const StringHash = require('./StringHash');

//main function
let main = function() {
    console.log("---------- Hash Table Test --------------------------------------");
    test1();//test an empty Dictionary
    test5();//test insert two different element
    test2_1();//test a Dictionary with one element(key is string)
    test2_2();//test a Dictionary with one element(key is number)
    test3_1();//test two elements have same key(key is string)
    test3_2();//test two elements have same key(key is number)
    test4();//test two elements have same hash value
    console.log("---------- End of Hash Table Test -------------------------------");
}

//test an empty Dictionary
let test1 = function() {
    let dictionary = new Dictionary(100);
    assert(dictionary.isEmpty() == true);
    console.log("test an empty Dictionary ----------------------------------- PASS");  
}

//test a Dictionary with one element
let test2_1 = function() {
    let dictionary = new Dictionary(100);
    //key(string) = 'a', value = 3
    let key = new StringHash('abc');
    let value = 3;
    dictionary.put(key, value);
    assert(dictionary.isEmpty() == false);
    assert(dictionary.contains(key) == true);
    assert(dictionary.get(key) != null);
    assert(dictionary.get(key) === value);
    console.log("test a Dictionary with one element(key is string) ---------- PASS");  
}
let test2_2 = function() {
    let dictionary = new Dictionary(100);
    //key(number) = 10, value = 3
    let key = new IntHash(10);
    let value = 3;
    dictionary.put(key, value);
    assert(dictionary.isEmpty() == false);  
    assert(dictionary.contains(key) == true);
    assert(dictionary.get(key) != null);
    assert(dictionary.get(key) === value);
    console.log("test a Dictionary with one element(key is number) ---------- PASS"); 
}

//test two elements have same key
let test3_1 = function() {
    let dictionary = new Dictionary(100);
    //key(string) = 'a', value = 3
    let key = new StringHash('abc');
    let value = 3;
    //key2(string) = 'a', value2 = 5
    let key2 = new StringHash('abc');
    let value2 = 5;
    dictionary.put(key, value);
    assert(dictionary.isEmpty() == false);
    assert(dictionary.contains(key) == true);
    assert(dictionary.get(key) != null);
    assert(dictionary.get(key) === value);

    dictionary.put(key2, value2);
    assert(dictionary.isEmpty() == false);
    assert(dictionary.contains(key2) == true);
    assert(dictionary.get(key2) != null);
    assert(dictionary.get(key2) !== value);//after replaced
    assert(dictionary.get(key2) === value2);//value need to be updated

    assert(dictionary.get(key) === value2);
    //console.log(dictionary.get(key2));
    console.log("test two elements have same key(key is string) ------------- PASS");  
}
let test3_2 = function() {
    let dictionary = new Dictionary(100);
    //key(number) = 10, value = 3
    let key = new IntHash(10);
    let value = 3;
    //key2(number) = 10, value2 = 5
    let key2 = new IntHash(10);
    let value2 = 5;
    dictionary.put(key, value);
    assert(dictionary.isEmpty() == false);  
    assert(dictionary.contains(key) == true);
    assert(dictionary.get(key) != null);
    assert(dictionary.get(key) === value);

    dictionary.put(key2, value2);
    assert(dictionary.isEmpty() == false);
    assert(dictionary.contains(key2) == true);
    assert(dictionary.get(key2) != null);
    assert(dictionary.get(key2) !== value);//after replaced
    assert(dictionary.get(key2) === value2);//value need to be updated

    assert(dictionary.get(key) === value2);
    console.log("test two elements have same key(key is number) ------------- PASS"); 
}

//test two elements have same hash value
let test4 = function() {
    let dictionary = new Dictionary(100);
    //key(number) = 10, value = 3
    let key = new IntHash(10);//has value will be 0
    let value = 3;
    //key2(number) = 20, value2 = 5
    let key2 = new IntHash(20);//has value will be 0
    let value2 = 5;
    dictionary.put(key, value);
    assert(dictionary.isEmpty() == false);  
    assert(dictionary.contains(key) == true);
    assert(dictionary.get(key) != null);
    assert(dictionary.get(key) === value);

    dictionary.put(key2, value2);
    assert(dictionary.isEmpty() == false);
    assert(dictionary.contains(key2) == true);
    assert(dictionary.get(key2) != null);
    assert(dictionary.get(key2) === value2);

    assert(dictionary.get(key) !== value2);
    console.log("test two elements have same hash value --------------------- PASS"); 
}


let test5 = function() {
    let dictionary = new Dictionary(100);
    //key(number) = 10, value = 3
    let key = new IntHash(10);//has value will be 0
    let value = 3;
    //key2(number) = 20, value2 = 5
    let key2 = new IntHash(12);//has value will be 2
    let value2 = 5;

    dictionary.put(key, value);
    dictionary.put(key2, value2);
    assert(dictionary.get(key) !== value2);
    assert(dictionary.get(key) === value);
    assert(dictionary.get(key2) !== value);
    assert(dictionary.get(key2) === value2);
    console.log("test insert two different element -------------------------- PASS"); 
}

//executable main function
main();