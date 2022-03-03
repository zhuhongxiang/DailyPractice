const Set = require('./set');
let set = new Set([2, 1, 3]);

console.log(set.keys()); // [ '1', '2', '3' ]

console.log(set.values()); // [ 1, 2, 3 ]

console.log(set.size); // 3

set.delete(1);

console.log(set.values()); // [ 2, 3 ]

set.clear();

console.log(set.size); // 0

// 并集

let a = [1, 2, 3];

let b = new Set([4, 3, 2]);

let union = new Set(a).union(b).values();

console.log(union); // [ 1, 2, 3, 4 ]

// 交集

let c = new Set([4, 3, 2]);

let intersect = new Set([1, 2, 3]).intersect(c).values();

console.log(intersect); // [ 2, 3 ]

// 差集

let d = new Set([4, 3, 2]);

let difference = new Set([1, 2, 3]).difference(d).values();

// [1,2,3]和[4,3,2]的差集是1

console.log(difference); // [ 1 ]

console.log(new Set([4, 3]).subset(d)); // true
