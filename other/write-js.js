//01.数组扁平化
//数组扁平化是指将一个多维数组变为一个一维数组
function ques1() {
  const arr = [1, [2, [3, [4, 5]]], 6];
  // => [1, 2, 3, 4, 5, 6]
  //自己解用的方法：正则/函数递归
  const res = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
  console.log(res);
  const ans = [];
  function fn(array) {
    for (let item of array) {
      if (Array.isArray(item)) {
        fn(item);
      } else {
        ans.push(item);
      }
    }
  }
  fn(arr);
  console.log(ans);
  //其他方法：
  //方法一：使用flat()
  const res1 = arr.flat(Infinity);
  console.log(res1);

  //方法二：使用reduce
  const flatten = (arr) => {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
  };
  const res4 = flatten(arr);
  console.log(res4);
}

//02.函数去重
function ques2() {
  const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
  // => [1, '1', 17, true, false, 'true', 'a', {}, {}]
  //自己思考的方法：
  //方法一：使用Set
  const set = new Set(arr);
  const res1 = Array.from(set);
  console.log(res1);
  //方法二：使用Map
  const map = new Map();
  arr.forEach((item) => {
    map.set(item, item);
  });
  const res2 = Array.from(map.values());
  console.log('方法2：' + res2);
  //方法三：遍历构造新的数组(使用indexOf/inclues/filter)
  const res3 = [];
  arr.forEach((item) => {
    if (res3.indexOf(item) == -1) {
      res3.push(item);
    }
  });
  console.log(res3);

  //其他方法
  //方法四：两层for循环+splice
  const unique1 = (arr) => {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        if (arr[i] === arr[j]) {
          arr.splice(j, 1);
          // 每删除一个树，j--保证j的值经过自加后不变。同时，len--，减少循环次数提升性能
          len--;
          j--;
        }
      }
    }
    return arr;
  };
  console.log(unique1(arr));
  //方法五：使用filter
  const res5 = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
  console.log(res5);
}

//03.类数组转化为数组
//类数组是具有length属性，但不具有数组原型上的方法。常见的类数组有arguments、DOM操作方法返回的结果。
function ques3() {
  //自己思考的方法：
  //方法一：使用Array.from
  Array.from(document.querySelectorAll('div'));

  //其他方法
  //方法二：Array.prototype.slice.call()
  Array.prototype.slice.call(document.querySelectorAll('div'));
  //方法三：扩展运算符
  [...document.querySelectorAll('div')];
  //方法四：利用concat
  Array.prototype.concat.apply([], document.querySelectorAll('div'));
}

//04.实现一个bind函数
/* Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Type Error');
  }
  // 保存this的值
  var self = this;

  return function F() {
    // 考虑new的情况
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
}; */
function ques4() {
  const obj = {
    name: 'sven'
  };
  const func = function (a, b, c, d) {
    console.log(this.name); // 输出：sven
    console.log([a, b, c, d]); // 输出：[ 1, 2, 3, 4 ]
  }.bind(obj, 1, 2);

  func(3, 4);
}

//05.实现一个apply函数
//Function.prototype.apply()
//第一个参数是绑定的this，默认为window，第二个参数是数组或类数组
/* Function.prototype.apply = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}; */

//06.实现一个call函数
//与apply唯一不同的是，call()方法接受的是一个参数列表
/* Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Type Error');
  }
  const fn = Symbol('fn');
  context[fn] = this;

  const res = context[fn](...args);
  delete context[fn];
  return res;
}; */

//07.实现数组的filter函数
/* Array.prototype.filter = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or not undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + 'is not a function');
  }
  const res = [];
  // 让O成为回调函数的对象传递（强制转换对象）
  const O = Object(this);
  // >>>0 保证len为number，且为正整数
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    // 检查i是否在O的属性（会检查原型链）
    if (i in O) {
      // 回调函数调用传参
      if (callback.call(thisArg, O[i], i, O)) {
        res.push(O[i]);
      }
    }
  }
  return res;
}; */

//08.实现数组的map函数
/* Array.prototype.map = function (callback, thisArg) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const res = [];
  // 同理
  const O = Object(this);
  const len = O.length >>> 0;
  for (let i = 0; i < len; i++) {
    if (i in O) {
      // 调用回调函数并传入新数组
      res[i] = callback.call(thisArg, O[i], i, this);
    }
  }
  return res;
}; */

//09.实现数组的map函数
/* Array.prototype.forEach = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
}; */

//10.实现数组的reduce函数
/* Array.prototype.reduce = function (callback, initialValue) {
  if (this == undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callbackfn + ' is not a function');
  }
  const O = Object(this);
  const len = this.length >>> 0;
  let accumulator = initialValue;
  let k = 0;
  // 如果第二个参数为undefined的情况下
  // 则数组的第一个有效值作为累加器的初始值
  if (accumulator === undefined) {
    while (k < len && !(k in O)) {
      k++;
    }
    // 如果超出数组界限还没有找到累加器的初始值，则TypeError
    if (k >= len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = O[k++];
  }
  while (k < len) {
    if (k in O) {
      accumulator = callback.call(undefined, accumulator, O[k], k, O);
    }
    k++;
  }
  return accumulator;
}; */

//11.函数珂里化
//指的是将一个接受多个参数的函数 变为 接受一个参数返回一个函数的固定形式，这样便于再次调用，例如f(1)(2)
//经典面试题：实现add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;
function add() {
  const _args = [...arguments];
  function fn() {
    _args.push(...arguments);
    return fn;
  }
  fn.toString = function () {
    return _args.reduce((sum, cur) => sum + cur);
  };
  return fn;
}

//12.模拟new操作
/* 3个步骤：
1. 以ctor.prototype为原型创建一个对象。
2. 执行构造函数并将this绑定到新创建的对象上。
3. 判断构造函数执行返回的结果是否是引用数据类型，若是则返回构造函数执行的结果，否则返回创建的对象。 */
function newOperator(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type error');
  }
  const obj = Object.create(ctor.prototype);
  const res = ctor.apply(obj, args);

  const isObject = typeof res === 'object' && res != null;
  const isFunction = typeof res === 'function';
  return isObject || isFunction ? res : obj;
}

//13.instanceof
//instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上。
const myInstanceof = (left, right) => {
  //基本数据类型都返回false
  if (typeof left !== 'object' || left == null) {
    return false;
  }
  const proto = Object.getPrototypeOf(left);
  while (true) {
    if (proto === null) {
      return false;
    }
    if (proto === right.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
};

//14.实现继承
//14.1 组合(构造)继承
function Parent(name) {
  this.name = name || 'Parent';
  this.sleep = function () {
    console.log(this.name + '正在睡觉');
  };
}

Parent.prototype.eat = function (food) {
  console.log(this.name + ' is eatting ' + food);
};

function Child(name) {
  Parent.apply(this);
  this.name = name || 'child';
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

//14.2 原型链继承
// 定义一个动物类
function Animal(name) {
  // 属性
  this.name = name || 'Animal';
  // 实例方法
  this.sleep = function () {
    console.log(this.name + '正在睡觉！');
  };
}
// 原型方法
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

function ques14() {
  let child = new Child();
  child.name = 'cat';
  console.log(child.name);
  child.sleep();
  child.eat('fish');
  //　Test Code
  var cat = new Cat();
  console.log(cat.name);
  cat.eat('fish');
  cat.sleep();
}

//15.Object.is
//解决的主要是这两个问题：
/* +0 === -0  // true
Object.is(+0,-0) = false
NaN === NaN // false
Object.is(NaN,NaN) = true */
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

// 16.Object.assign
// Object.assign()方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象（请注意这个操作是浅拷贝）
Object.defineProperty(Object, 'assign', {
  value: function (target, ...args) {
    if (target == null) {
      throw new TypeError('can not convert undefined or null to Object');
    }
    // 目标对象需要统一是引用数据类型，若不是会自动转换
    const to = Object(target);

    for (let i = 0; i < args.length; i++) {
      // 每一个源对象
      const nextSource = args[i];

      if (nextSource != null) {
        // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
        for (const nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  },
  // 不可枚举
  enumerable: false,
  writable: true,
  configurable: true
});

//17. 深拷贝
//递归的完整版本（考虑到了Symbol属性）：
const deepCopy = (target, hash = new WeakMap()) => {
  if (typeof target !== 'object' || target == null) {
    return target;
  }
  if (hash.has(target)) {
    return hash.get(target);
  }
  const cloneTarget = Array.isArray(target) ? [] : {};
  hash.set(target, cloneTarget);

  const symkeys = Object.getOwnPropertySymbols(target);
  if (symkeys.length) {
    symkeys.forEach((symkey) => {
      if (typeof target[symkey] === 'object' && target[symkey] !== null) {
        cloneTarget[symkey] = deepCopy(target[symkey]);
      } else {
        cloneTarget[symkey] = target[symkey];
      }
    });
  }

  for (const o in target) {
    if (Object.prototype.hasOwnProperty.call(target, o)) {
      cloneTarget[o] =
        typeof target[o] === 'object' && target[o] !== null
          ? deepCopy(target[o], hash)
          : target[o];
    }
  }
  return cloneTarget;
};

const deepCopy2 = (extendObj) => {
  let str,
    newObj = extendObj.constructor === Array ? [] : {};
  if (typeof extendObj !== 'object') {
    return;
  } else if (window.JSON) {
    str = JSON.stringify(extendObj);
    newObj = JSON.parse(str);
  } else {
    for (const key in extendObj) {
      if (extendObj.hasOwnProperty(key)) {
        newObj[key] =
          typeof extendObj[key] === 'object' && extendObj[key] !== null
            ? deepCopy2(extendObj[key])
            : extendObj[key];
      }
    }
  }
  return newObj;
};

const ques17 = () => {
  var obj2 = {
    names: ['test0', 'test1', 'test3']
  };

  var obj1 = deepCopy(obj2);

  console.log(obj1, obj2);

  obj2.names[1] = 'test0';

  console.log(obj1, obj2);
};

//18. 实现一个Promise
// 模拟实现Promise
// Promise利用三大手段解决回调地狱：
// 1. 回调函数延迟绑定
// 2. 返回值穿透
// 3. 错误冒泡

// 定义三种状态
const PENDDING = 'PENDDING';
const FULLFILLED = 'FULLFILLED';
const REJECTED = 'REJECTED';
//基础版本
class Promise {
  constructor(exector) {
    this.status = PENDDING;
    this.value = undefined;
    this.reason = undefined;

    const reslove = (value) => {
      if (this.status === PENDDING) {
        this.status = FULLFILLED;
        this.value = value;
      }
    };

    const reject = (reason) => {
      if (this.status == PENDDING) {
        this.status = REJECTED;
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
Promise.all = function (promiseArr) {
  let promises = Array.from(promiseArr);
  return new Promise((reslove, reject) => {
    if (promises.length === 0) {
      reslove([]);
    } else {
      let result = []; //存放已成功的异步操作
      let index = 0; //记录已成功的操作数
      for (let i = 0; i < promises.length; i++) {
        Promise.resolve(promises[i]).then(
          (data) => {
            result[i] = data;
            if (++index === promises.length) {
              resolve(result);
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

Promise.race = function (promiseArr) {
  let promises = Array.from(promiseArr);
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        }
      );
    }
  });
};

//完整版本
class Promise {
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;
    // 成功态回调函数队列
    this.onFulfilledCallbacks = [];
    // 失败态回调函数队列
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态函数依次执行
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };
    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 失败态函数依次执行
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };
    try {
      // 立即执行executor
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject);
    } catch (e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          };
    // 保存this
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          // try捕获错误
          try {
            // 模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedCallbacks.push(() => {
          // 以下同理
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              // 不同点：此时是reject
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (self.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  static resolve(value) {
    if (value instanceof Promise) {
      // 如果是Promise实例，直接返回
      return value;
    } else {
      // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
      return new Promise((resolve, reject) => resolve(value));
    }
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(promiseArr) {
    const len = promiseArr.length;
    const values = new Array(len);
    // 记录已经成功执行的promise个数
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // Promise.resolve()处理，确保每一个都是promise实例
        Promise.resolve(promiseArr[i]).then(
          (val) => {
            values[i] = val;
            count++;
            // 如果全部执行完，返回promise的状态就可以改变了
            if (count === len) resolve(values);
          },
          (err) => reject(err)
        );
      }
    });
  }
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((p) => {
        Promise.resolve(p).then(
          (val) => resolve(val),
          (err) => reject(err)
        );
      });
    });
  }
}
