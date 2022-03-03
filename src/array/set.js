function Set(arr = []) {
  let items = {};
  this.size = 0;

  this.has = function (val) {
    return items.hasOwnProperty(val);
  };

  this.add = function (val) {
    if (!this.has(val)) {
      items[val] = val;
      this.size++;
      return true;
    }
    return false;
  };

  arr.forEach((val, i) => {
    this.add(val);
  });

  this.delete = function (val) {
    if (this.has(val)) {
      delete items[val];
      this.size--;
      return true;
    }
    return false;
  };

  this.clear = function () {
    items = {};
    this.size = 0;
  };

  this.keys = function () {
    return Object.keys(items);
  };

  this.values = function () {
    return Object.values(items);
  };

  this.forEach = function (fn, context = this) {
    for (let i = 0; i < this.size; i++) {
      let item = Object.keys(items)[i];
      fn.call(context, item, item, items);
    }
  };

  this.union = function (other) {
    let union = new Set();
    let values = this.values();

    for (let val of values) {
      union.add(val);
    }

    let otherVal = other.values();
    for (let val of otherVal) {
      union.add(val);
    }

    return union;
  };

  this.intersect = function (other) {
    let ans = new Set();
    let values = this.values();

    for (let val of values) {
      if (other.has(val)) {
        ans.add(val);
      }
    }

    return ans;
  };

  this.difference = function (other) {
    let ans = new Set();
    let values = this.values();

    for (let val of values) {
      if (!other.has(val)) {
        ans.add(val);
      }
    }

    return ans;
  };

  this.subset = function (other) {
    if (this.size > other.size) {
      return false;
    } else {
      let values = this.values();
      for (let val of values) {
        if (!other.has(val)) {
          return false;
        }
      }
      return true;
    }
  };
}
module.exports = Set;
