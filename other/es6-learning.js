const ques1 = () => {
  const proxy = new Proxy(
    {},
    {
      get: function (target, handler) {
        return 35;
      }
    }
  );
  console.log(proxy.name);

  console.log(proxy.time);

  console.log(proxy.title);
};
const ques2 = () => {
  const target = {};
  const handler = {};
  const proxy = new Proxy(target, handler);
  proxy.a = 'b';
  console.log(target.a);
};
const ques3 = () => {
  const proxy = new Proxy(
    {},
    {
      get: function (target, handler) {
        return 35;
      }
    }
  );
  const obj = Object.create(proxy);
  console.log(obj.time);
};

const ques4 = () => {
  const handler = {
    get: function (target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello ' + name;
    },
    apply: function (target, thisBinding, args) {
      return args[0];
    },
    construct: function (target, args) {
      return { value: args[1] };
    }
  };
  const fproxy = new Proxy(function (x, y) {
    return x + y;
  }, handler);
  console.log(fproxy(1, 2));
  console.log(new fproxy(1, 2));
  console.log(fproxy.prototype === Object.prototype);
  console.log(fproxy.foo);
};

const ques5 = () => {
  const person = {
    name: '狗东'
  };
  const proxy = new Proxy(person, {
    get: function (target, key) {
      if (key in target) {
        return target[key];
      } else {
        throw new ReferenceError(`Prop name ${key} does not exist`);
      }
    }
  });
  console.log(proxy.name);
  console.log(proxy.time);
};

//get方法可以被继承
const ques6 = () => {
  const proxy = new Proxy(
    {},
    {
      get: function (target, key, receiver) {
        console.log('GET ' + key);
        return target[key];
      }
    }
  );
  const obj = Object.create(proxy);
  console.log(obj.foo);
};

const ques7 = () => {
  function createArray(...args) {
    const handler = {
      get: function (target, propKey, receiver) {
        const index = Number(propKey);
        if (index < 0) {
          propKey = String(target.length + index);
        }
        return Reflect.get(target, propKey, receiver);
      }
    };
    const arr = [...args];
    // arr.push(...args);
    return new Proxy(arr, handler);
  }
  const array = createArray('a', 'b', 'c');
  console.log(array[-2]);
};

const ques8 = () => {
  const pipe = (value) => {
    const funcStack = [];
    const oproxy = new Proxy(
      {},
      {
        get: function (objTarget, fnName) {
          if (fnName === 'get') {
            return funcStack.reduce(function (val, fn) {
              return fn(val);
            }, value);
          }
          funcStack.push(window[fnName]);
          return oproxy;
        }
      }
    );
    return oproxy;
  };
  const dubble = (n) => n * 2;
  const pow = (n) => n * n;
  const reverseInt = (n) => n.toSring().split('').reverse.join('') | 0;
  console.log(pipe(3).dubble.pow.reverseInt.get);
};

//下面的例子则是利用get拦截，实现一个生成各种 DOM 节点的通用函数dom。
const ques9 = () => {
  const dom = new Proxy(
    {},
    {
      get: function (target, property) {
        return function (args = {}, ...children) {
          let el = document.createElement(property);
          for (let key of Object.keys(args)) {
            el.setAttribute(key, args[key]);
          }
          for (let child of children) {
            if (typeof child === 'string') {
              child = document.createTextNode(child);
            }
            el.appendChild(child);
          }
        };
        return el;
      }
    }
  );
  const el = dom.div(
    {},
    'Hello, my name is ',
    dom.a({ href: '//example.com' }, 'Mark'),
    '. I like:',
    dom.ul(
      {},
      dom.li({}, 'The web'),
      dom.li({}, 'Food'),
      dom.li({}, "…actually that's it")
    )
  );
  document.body.appendChild(el);
};

const ques10 = () => {
  const proxy = new Proxy(
    {},
    {
      get: function (target, key, receiver) {
        return receiver;
      }
    }
  );
  proxy.getReceiver === proxy; // true
};

//如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错。

const ques11 = () => {
  const target = Object.defineProperties(
    {},
    {
      foo: {
        value: 123,
        writable: false,
        configurable: false
      }
    }
  );

  const handler = {
    get(target, propKey) {
      return 'abc';
    }
  };

  const proxy = new Proxy(target, handler);

  console.log(proxy.foo);

  // TypeError: Invariant check failed
};

//Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

/* const service = createWebService('http://example.com/data');

service.employees().then((json) => {
  const employees = JSON.parse(json);
  // ···
}); */
//上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

function createWebService(baseUrl) {
  return new Proxy(
    {},
    {
      get(target, propKey, receiver) {
        return () => httpGet(baseUrl + '/' + propKey);
      }
    }
  );
}

var maxValue = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dp = new Array(rows + cols + 1).fill(0);
  dp[1] = grid[0][0];
  let i = 0,
    j = 0,
    n = 2;

  while (i <= rows - 1 && j <= cols - 1) {
    if (i < rows - 1 && j < cols - 1) {
      const num1 = grid[i + 1][j] || 0;
      const num2 = grid[i][j + 1] || 0;
      const maxNum = Math.max(num1, num2);
      dp[n] = maxNum + dp[n - 1];

      n++;
      if (maxNum === num1) {
        i++;
      }
      if (maxNum === num2) {
        j++;
      }
    }
    if (i === rows - 1 || j === cols - 1) {
      break;
    }
  }
  while (i === rows - 1 && j < cols - 1) {
    dp[n] = dp[n - 1] + grid[i][++j];
    n++;
  }
  while (j === cols - 1 && i < rows - 1) {
    dp[n] = dp[n - 1] + grid[++i][j];
    n++;
  }
  return dp[n - 1];
};

var translateNum = function (num) {
  const str = num + '';
  let p = 0,
    q = 0,
    r = 1;
  for (let i = 0; i < str.length; i++) {
    p = q;
    q = r;
    r = 0;
    r += q;
    if (i === 0) {
      continue;
    }
    const s = str.substr(i - 1, 2);
    if (s <= '25' && s >= '10') {
      r += p;
    }
  }
  return r;
};
var lengthOfLongestSubstring = function (s) {
  let maxStr = '';
  const findStr = (s) => {
    let str = '';
    for (let i = 0; i < s.length; i++) {
      if (str.indexOf(s[i]) === -1) {
        str += s[i];
      } else {
        break;
      }
    }
    return str;
  };
  maxStr = findStr(s);
  console.log(maxStr);

  for (let i = 1; i < s.length - maxStr.length; i++) {
    const str = findStr(s.substr(i));
    if (str.length > maxStr.length) {
      maxStr = str;
    }
  }
  return maxStr;
};

var lengthOfLongestSubstring = function (s) {
  const dic = new Map();
  let res = 0,
    temp = 0;
  for (let j = 0; j < s.length; j++) {
    const i = dic.get(s[j]) || 0;
    dic.set(s[j], j);
    temp = temp < j - i ? temp + 1 : j - i;
    res = Math.max(temp, res);
  }
  return res;
};

var maxProfit = function (prices) {
  let i = 0,
    j = prices.length - 1;
  let max = 0;
  while (i < prices.length - 1) {
    if (prices[i + 1] < prices[i]) {
      i++;
    } else {
      break;
    }
  }
  while (j > i) {
    if (prices[j - 1] > prices[j]) {
      j--;
    } else {
      break;
    }
  }
  console.log(i, j);
  if (i < j) {
    const dp = Array(j - i + 1)
      .fill(0)
      .map((item) => Array(j - i + 1).fill(0));
    for (let k = i; k < j; k++) {
      for (let m = k + 1; m <= j; m++) {
        dp[k - i][m - k - 1] =
          prices[m] - prices[k] > 0 ? prices[m] - prices[k] : 0;
        max = Math.max(max, dp[k - i][m - k - 1]);
      }
    }
  }
  return max;
};
const data = [492416981291, 660748566521];
let l = data[0];
let r = data[1];
console.log(l);
let res;
if (l % 2 === 1) {
  res = BigInt(l);
  l--;
}
console.log(res);
if (r % 2 === 0) {
  res ^= BigInt(r);
  r--;
}

console.log(res);
res ^= (BigInt(BigInt(r) - BigInt(l) + BigInt(1)) / BigInt(2)) % BigInt(2);

console.log(res);
