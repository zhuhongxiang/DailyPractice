// 1. Var变量提升题目
// 1-1：
/* b();
console.log(a);
var a = 'hello world';
function b() {
  console.log('call b first');
}
function b() {
  console.log('call b second');
} */

const { has } = require('core-js/core/dict');

// 1-2：
/* var a = 99; // 全局变量a
f(); // f是函数，虽然定义在调用的后面，但是函数声明会提升到作用域的顶部。
console.log(a); // a=>99,  此时是全局变量的a
function f() {
  console.log(a); // 当前的a变量是下面变量a声明提升后，默认值undefined
  var a = 10;
  console.log(a); // a => 10
} */

// 2. 函数+Object
/* var x = 1,
  y = 2;
var z = function () {
  var x = 2;
  return {
    x: x,
    y: function (a, b) {
      x = a + b;
    },
    z: function () {
      return x;
    }
  };
};

a = z(); //=>z = {x:2,fun,fun}
a.y(x, y); //=>y:function(1,2){x = 3} z:()=> 3 
console.log(a.z(), a.x, x); // =>3 2 1 */

// 3. 宏任务，微任务执行顺序
/* setTimeout(() => {
  console.log(1);
});
setTimeout(() => {
  console.log(2), 0;
});
console.log(3);
new Promise(function (resolve) {
  resolve();
}).then(() => {
  console.log(4), 0;
});
console.log(4);
setTimeout(() => {
  console.log(2), 10;
}); */
// => 3 4 4 1 2 2

// 4.var与let的区别
/* function foo() {
  console.log(name);
  console.log(age); // => ReferenceError: Cannot access 'age' before initialization
  var name = 'lsss';
  let age = 'ss';
}
foo(); */

// 5.宏/微任务与async await
/* console.log('script start');
async function async1() {
  console.log('async1');
  await async2();
  console.log('end');
}
async function async2() {
  console.log('async2');
}
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end'); */
//=> script start  async1  async2  promise1  script end  end  promise2  setTimeout

// 6.同名的函数和对象属性
/* function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    }
  };
}
c = fun(0).fun(1); // =>fun(1,0)
c.fun(2); // =>fun(2,1)
c.fun(3); // =>fun(3,1) */
// 输出结果：undefined -> 0 -> 1 -> 1

// 7.Promise的resolve, reject
/* new Promise((resolve, reject) => {
  reject(1);
})
  .catch(() => {
    console.log(2);
  })
  .then(
    () => console.log(3),
    (v) => console.log(v)
  ); */
// =>2 3

// 8.函数与new实例的类型
/* const Foo = function () {};
const foo = new Foo();
console.log(foo.__proto__);
console.log(Foo.__proto__); */
//=> {} {}

// 9.宏任务微任务执行顺序(setTimeout Promise)
/* setTimeout(function () {
  console.log(1);
}, 0);
new Promise(function executor(resolve) {
  console.log(2);
  for (var i = 0; i < 1e4; i++) {
    i == 9999 && resolve();
  }
  console.log(3);
}).then(function () {
  console.log(4);
});
console.log(5); */
// =>2 3 5 4 1

//10.宏任务微任务执行顺序(Promise async)
//10-1：
/* console.log(1);
new Promise(() => {
  console.log(2);
});
console.log(3);
console.log(1);
async function test() {
  await console.log(2);
}
test();
console.log(3); */
// =>1 2 3 1 2 3
//10-2：
/* async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout1');
}, 200);
setTimeout(function () {
  console.log('setTimeout2');
  new Promise(function (resolve) {
    resolve();
  }).then(function () {
    console.log('then1');
  });
  new Promise(function (resolve) {
    console.log('Promise1');
    resolve();
  }).then(function () {
    console.log('then2');
  });
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise2');
  resolve();
}).then(function () {
  console.log('then3');
});
console.log('script end'); */
// =>script start  async1 start  async2  promise2  script end  async1 end  then3  setTimeout2  Promise1  then1  then2 setTimeout1

// 10-3:
/* setTimeout(() => console.log(1), 0);

new Promise((resolve) => {
  console.log(2);
  resolve();
}).then(() => {
  console.log(3);
});

console.log(4); */
//=>2 4 3 1

//10-4:
/* setTimeout(() => {
  console.log('log-timeout');
}, 0);

process.nextTick(() => {
  console.log('tick');
});

const promise = new Promise((resolve) => {
  console.log('log-promise');

  resolve('promise resolve');
});

(async () => {
  console.log('async start');

  const str = await promise;

  console.log(str);
})();

promise.then(() => {
  console.log('log-promise1-then');
});

console.log('log-end'); */
//=> log-promise  async start  log-end  tick  promise resolve  log-promise1-then  log-timeout

//11.手写题1：settimeout(() => {console.log(1)}，1000)怎么让1在2s后打印，不能直接修改时间
//方法1：
/* setTimeout(() => {
  setTimeout(() => {
    console.log(1);
  }, 1000);
}, 1000);
 */
//方法2：
/* var count = 0;
var interval = setInterval(() => {
  if (++count == 1) {
    clearInterval(interval);
  }
  setTimeout(() => {
    console.log(1);
  }, 1000);
}, 1000); */

//12. 箭头函数
/* let a = (x) => x;
let b = (x) => {
  return x;
};
let c = (x) => {
  {
    x;
  }
};
console.log(a(1), b(1), c(1)); */
// =>1 1 undefined

//13. 函数作用域
/* var a = {
  name: 'bytedance',

  func: function () {
    console.log(this.name);
  }
};

a.func();

var fun1 = a.func;

fun1();

a.func.call({ name: 'toutiao' }); */
//=>bytedance  undefined  toutiao

//
/* var a = 20;
var obj = {
  a: 40
};
function fn() {
  function foo() {
    console.log(this.a);
  }
  foo();
  // 上面3行这块如果换成console.log(this.a) 输出的就是40
}

fn.call(obj);
fn();
//=> 20 20

var name = 'leo';
var teacher = {
  name: '大彬哥',
  showName: function () {
    let showTest = () => console.log(this.name);
    showTest();
  }
};
teacher.showName(); */

//实例链式调用：如let a = new Man(); a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi()；写出Man()构造函数
/* function Man() {
  this.sleep = (delay) => {
    const now = new Date().getTime;
    while (new Date().getTime - now < delay) {
      continue;
    }
    return this; */
/* setTimeout(()=> {
      return this;
    }, delay); */
/*   };
  this.sayHi = function () {
    console.log('Hi');
    return this;
  };
}

let a = new Man();
a.sleep(3000).sayHi().sleep(1000).sleep(2000).sayHi(); */

/* function Animal(name) {
  this.name = name || 'Animal';
  this.sleep = function () {
    console.log(this.name + '正在睡觉');
  };
}
Animal.prototype.eat = function (food) {
  console.log(this.name + ' 正在吃 ' + food);
};
function Cat(name) {
  //构造继承
  Animal.apply(this);
  this.name = name || 'cat';
}
//原型链继承
// Cat.prototype = new Animal();
//寄生组合继承
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
function ques14() {
  //　Test Code
  var cat = new Cat();
  cat.name = 'cat';
  console.log(cat.name);
  cat.eat('fish');
  cat.sleep();
} */

//Object.is
/* function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
} */

// 16.Object.assign
// Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）
/* Object.defineProperty(Object, 'assign', {
  value: function (target, ...args) {
    if (target === null) {
      throw new TypeError('cannot convert null to object');
    }
    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);
    for (let i = 0; i < args.length; i++) {
      sourceKeys = args[i];
      if (sourceKeys !== null) {
        for (const nextkey in sourceKeys) {
          if (Object.prototype.hasOwnProperty.call(sourceKeys, nextkey)) {
            to[nextkey] = sourceKeys[nextkey];
          }
        }
      }
    }
    return to;
  },
  enumerable: false,
  writable: true,
  configurable: true
}); */

const PENDDING = 'PENDDING';
const FULLFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(exector) {
    this.state = PENDDING;
    this.value = undefined;
    this.reason = undefined;

    const reslove = (value) => {
      if (this.state === PENDDING) {
        this.state = FULLFILLED;
        this.value = value;
      }
    };
    const reject = (reason) => {
      if (this.state === PENDDING) {
        this.state = REJECTED;
        this.reason = reason;
      }
    };
    try {
      exector(reslove, reject);
    } catch (e) {
      reject(e);
    }
  }
}

Promise.prototype.all = function (promiseArr) {
  const promises = Array.from(promiseArr);
  return new Promise((reslove, reject) => {
    if (promises.length === 0) {
      reslove([]);
    } else {
      for (let i = 0; i < promises.length; i++) {
        const result = [];
        let index = 0;
        Promise.reslove(promises[i]).then(
          (data) => {
            result[i] = data;
            if (++index === promiseArr.length) {
              reslove(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    }
  });
};

Promise.prototype.race = function (promiseArr) {
  const promises = Array.from(promiseArr);
  return new Promise((reslove, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.reslove(promises[i]).then(
        (data) => {
          reslove(data);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};

//防抖，非立即执行
function debounce1(func, wait) {
  let timeout;
  return function () {
    let self = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(self, args);
    }, wait);
  };
}
//立即执行
function debounce2(func, wait) {
  let timeout;
  return function () {
    let self = this;
    let args = arguments;
    if (timeout) {
      clearTimeout(timeout);
    }
    let callnow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    }, wait);
    if (callnow) {
      func.apply(self, args);
    }
  };
}

//合并版
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let self = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callnow) func.apply(self, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(self, args);
      }, wait);
    }
  };
}

//节流，时间戳版
function throttle1(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  };
}

//定时器版
function throttle2(func, wait) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}

//合并版
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait, type) {
  if (type === 1) {
    var previous = 0;
  } else if (type === 2) {
    var timeout;
  }
  return function () {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, this);
        }, wait);
      }
    }
  };
}

function createElement(vnode) {
  const tag = vnode.tag;
  const attrs = vnode.attrs || {};
  const children = vnode.children || [];

  if (!tag) {
    return;
  }

  let elem = document.createElement(tag);

  for (const attr in attrs) {
    if (attrs.hasOwnProperty(attr)) {
      elem.setAttribute(attr, attrs[attr]);
    }
  }
  children.forEach((child) => {
    children.appendChild(createElement(child));
  });
  return elem;
}

function updateChild(vnode, newVnode) {
  oldChildren = vnode.children || [];
  newChildren = newVnode.children || [];

  oldChildren.forEach((child, index) => {
    let newNodeChild = newChildren[index];
    if (child.tag === newNodeChild.tag) {
      updateChild(child, newNodeChild);
    } else {
      replaceChild(child, newNodeChild);
    }
  });
}
