function Dictionary() {
  this.dataStore = new Array();
  this.add = add;
  this.find = find;
  this.remove = remove;
  this.showAll = showAll;
  this.showAll2 = showAll2;
  this.count = count;
  this.clear = clear;
}

function add(key, value) {
  this.dataStore[key] = value;
}

function find(key) {
  return this.dataStore[key];
}

function remove(key) {
  delete this.dataStore[key];
}

function showAll() {
  for (let key of Object.keys(this.dataStore)) {
    console.log(key + '->' + this.dataStore[key]);
  }
}

function showAll2() {
  for (let key of Object.keys(this.dataStore).sort()) {
    console.log(key + '->' + this.dataStore[key]);
  }
}

function count() {
  let n = 0;
  for (let key in Object.keys(this.dataStore)) {
    ++n;
  }
  return n;
}

function clear() {
  for (let key of Object.keys(this.dataStore)) {
    delete this.dataStore[key];
  }
}

//测试
/* var pbook = new Dictionary();
pbook.add('Mike', '123');
pbook.add('David', '345');
pbook.add('Cynthia', '456');
console.log(" David's extension: " + pbook.find('David')); // David's extension: 345
pbook.remove('David');
pbook.showAll();
//Mike - > 123
//Cynthia - > 456
pbook.count(); //2
//pbook.clear()
pbook.showAll2(); */

var m = new Map(); // 空Map

m.set('Adam', 67); // 添加新的key-value
m.set('Bob', 59);

console.log(m.has('Adam')); // 是否存在key 'Adam': true

console.log(m.get('Adam')); // 67

console.log(m.delete('Adam')); // 删除key 'Adam'

console.log(m.get('Adam')); // undefined
