function List() {
  this.listSize = 0;
  this.pos = 0;
  this.dataStore = [];
  this.length = length;
  this.append = append;
  this.remove = remove;
  this.clear = clear;
  this.toString = toString;
  this.insert = insert;
  this.front = front;
  this.end = end;
  this.prev = prev;
  this.next = next;
  this.currPos = currPos;
  this.moveTo = moveTo;
  this.getElement = getElement;
  this.contains = contains;
}

function append(element) {
  this.dataStore[this.listSize++] = element;
}
function find(element) {
  for (let i = 0; i < this.listSize; ++i) {
    if (this.dataStore[i] == element) {
      return i;
    }
  }
  return -1;
}

function remove(element) {
  const index = find(element);
  if (index > -1) {
    this.dataStore.splice(index, 1);
    --this.listSize;
    return true;
  }
  return false;
}

function length() {
  return this.listSize;
}

function clear() {
  delete this.dataStore;
  this.dataStore = [];
  this.listSize = this.pos = 0;
}

function toString() {
  return this.dataStore;
}

function insert(element, after) {
  const index = find(after);
  if (index > -1) {
    this.dataStore.splice(index + 1, 0, element);
    ++this.listSize;
    return true;
  }
  return false;
}

function front() {
  this.pos = 0;
}

function end() {
  this.pos = this.listSize - 1;
}
function prev() {
  if (this.pos >= 0) {
    --this.pos;
  }
}
function next() {
  if (this.pos < this.listSize) {
    ++this.pos;
  }
}
function currPos() {
  return this.pos;
}
function moveTo(position) {
  if (position > 0 && position < this.listSize - 1) {
    this.pos = position;
  } else {
    console.log('position输入有误');
  }
}

function getElement() {
  return this.dataStore[this.pos];
}

function contains(element) {
  for (let i = 0; i < this.listSize; ++i) {
    if (this.dataStore[i] == element) {
      return i;
    }
  }
  return -1;
}
var names = new List();
names.append('锤锤');
names.append('牛牛');
names.append('豆豆');
names.append('羊羊');
names.append('兔兔');
names.append('花花');
console.log(names.contains('锤锤'));
/* names.front();
console.log(names.getElement()); //显示 “锤锤” */
/* names.next();
console.log(names.getElement()); //显示 “牛牛” */

//使用迭代器访问列表
/* 使用迭代器，可以不必关系数据的内部存储方式。以实现对列表的遍历。前面提到的方法fornt()，end(),prev(),next()和currPos就实现了List类的一个迭代器。
以下是和使用数组索引的方式相比，使用迭代器的一些优点。

  1.访问列表元素时不必关心底层的数据存储结构
  2.当为列表添加一个元素时，索引的值就不对了，此时只用更新列表，而不用更新迭代器。
  3.可以用不同类型的数据存储方式实现List类，迭代器为访问列表里的元素提供了统一的方式。 */

//迭代器从前往后遍历列表
/* for (names.front(); names.currPos() < names.length(); names.next()) {
  console.log(names.getElement());
} */

//迭代器从后往前遍历列表
/* for (names.end(); names.currPos() >= 0; names.prev()) {
  console.log(names.getElement());
} */
function createArr(file) {
  var arr = file.split('NNN');
  for (var i = 0; i < arr.length; ++i) {
    arr[i] = arr[i].trim();
  }
  return arr;
}

function displayList(list) {
  for (list.front(); list.currPos() < list.length(); list.next()) {
    if (list.getElement() instanceof Customer) {
      console.log(
        list.getElement()['name'] + ', ' + list.getElement()['movie']
      );
    } else {
      console.log(list.getElement());
    }
  }
}

function Customer(name, movie) {
  this.name = name;
  this.movie = movie;
}

function checkout(name, movie, filmList, customerList) {
  if (movieList.contains(movie)) {
    const c = new Customer(name, movie);
    customerList.append(c);
    filmList.remove(movie);
  } else {
    console.log(movie + 'is not available');
  }
}

const _movies =
  '(1)RogueTrader(《魔鬼营业员》)NNN(2)TradingPlaces(《颠倒乾坤》)NNN(3)WallStreet(《华尔街》)NNN(4)WallStreet2:MoneyNeverSleeps(《华尔街2：金钱永不眠》)NNN(5)BoilerRoom(《开水房》)NNN(6)GlengarryGlen Ross(《拜金一族》)NNN(7)Enron:TheSmartestGuysInTheRoom(《安然风暴:屋内聪明人》)NNN(8)Trader(《交易员》)NNN(9)AmericanPsycho(《美国精神病人》)NNN(10)BonfireoftheVanities(《虚荣的篝火》)';
const movies = createArr(_movies);
const movieList = new List();
const customers = new List();

movies.forEach((item) => {
  movieList.append(item);
});

//显示xx
displayList(movieList);

checkout('RogueTrader', 'Trader(《交易员》)', movieList, customers);

//xx
displayList(customers);
