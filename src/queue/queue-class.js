class Queue {
  constructor() {
    this.dataStore = [];
    this.offer = offer;
    this.poll = poll;
    this.peek = peek;
    this.end = end;
    this.toString = toString;
    this.empty = empty;
  }
  offer(element) {
    this.dataStore.push(element);
  }

  poll() {
    return this.dataStore.shift();
  }

  peek() {
    return this.dataStore[0];
  }

  end() {
    return this.dataStore[this.dataStore.length - 1];
  }

  toString() {
    let resStr = '';
    for (let i = 0; i < this.dataStore.length; ++i) {
      resStr += this.dataStore[i] + '\n';
    }
    return resStr;
  }

  empty() {
    if (this.dataStore.length == 0) {
      return true;
    } else {
      return false;
    }
  }
}
