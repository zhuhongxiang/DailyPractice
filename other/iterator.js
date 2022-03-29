class Counter {
  constructor(limit) {
    this.limit = limit;
  }
  [Symbol.iterator]() {
    let count = 1,
      limit = this.limit;
    return {
      next() {
        if (count <= limit) {
          return { done: false, value: count++ };
        } else {
          return { done: true, value: undefined };
        }
      },
      return() {
        console.log('exit early!');
        return { done: true };
      }
    };
  }
}

function test() {
  const counter = new Counter(5);

  for (let c of counter) {
    if (c > 2) {
      break;
    }
    console.log(c);
  }

  //数组的迭代器不关闭
  const arr = [1, 2, 3, 4, 5];
  let iter = arr[Symbol.iterator]();
  for (let c of arr) {
    if (c > 2) {
      break;
    }
    console.log(c);
  }
  //迭代器不关闭可以继续从上次离开的地方遍历
  for (let c of arr) {
    console.log(c);
  }
}
test();
