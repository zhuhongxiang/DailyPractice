var PQueue = function () {
  this.dataStore = [];
  this.offer = offer;
  this.poll = poll;
  this.peek = peek;
  this.end = end;
  this.toString = toString;
  this.empty = empty;
};

function offer(element) {
  this.dataStore.push(element);
}

function poll() {
  let priority = this.dataStore[0].code;
  let place = 0;
  for (let i = 1; i < this.dataStore.length; ++i) {
    if (priority > this.dataStore[i].code) {
      place = i;
      priority = this.dataStore[i].code;
    }
  }
  return this.dataStore.splice(priority, 1);
}

function peek() {
  return this.dataStore[0];
}

function end() {
  return this.dataStore[this.dataStore.length - 1];
}

function toString() {
  let resStr = '';
  for (let i = 0; i < this.dataStore.length; ++i) {
    resStr += this.dataStore[i].item + ' code:' + this.dataStore[i].code + '\n';
  }
  return resStr;
}

function empty() {
  if (this.dataStore.length == 0) {
    return true;
  } else {
    return false;
  }
}

function size() {
  return this.dataStore.length;
}

function Element(item, code) {
  this.item = item;
  this.code = code;
}

let queue = new PQueue();
queue.offer(new Element('小明', 3));
queue.offer(new Element('小里', 1));
queue.poll();
console.log(queue.toString());
