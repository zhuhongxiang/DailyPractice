/* 剑指 Offer 13. 机器人的运动范围
地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，
它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。
例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。
请问该机器人能够到达多少个格子？ */

//利用set存坐标的动态规划解法
var movingCount = function (m, n, k) {
  const sums = (x) => {
    let ans = 0;
    while (x) {
      ans += x % 10;
      x = Math.floor(x / 10);
    }
    return ans;
  };
  const set = new Set();
  set.add(`(0, 0)`);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (
        (set.has(`(${i - 1}, ${j})`) || set.has(`(${i}, ${j - 1})`)) &&
        sums(i) + sums(j) <= k
      ) {
        set.add(`(${i}, ${j})`);
      }
    }
  }
  return set.size;
};

//深度优先遍历返回可达数量
var movingCount = function (m, n, k) {
  const visited = Array(m)
    .fill(0)
    .map(() => Array(n).fill(0));
  const sums = (num) => {
    let ans = 0;
    while (num) {
      ans += num % 10;
      num = Math.floor(num / 10);
    }
    return ans;
  };
  const movecount = (x, y) => {
    if (x >= m || y >= n || sums(x) + sums(y) > k || visited[x][y]) {
      return 0;
    }
    return 1 + movecount(x + 1, y) + movecount(x, y + 1);
  };
  return movecount(0, 0);
};
/* 剑指 Offer 14- I. 剪绳子
给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），
每段绳子的长度记为 k[0],k[1]...k[m-1] 。请问 k[0]*k[1]*...*k[m-1] 可能的最大乘积是多少？
例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。 */
/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  if (n < 4) return n - 1;
  const m = Math.floor(n / 3);
  const i = n % 3;
  if (i === 0) return Math.pow(3, m);
  if (i === 1) return Math.pow(3, m - 1) * 4;
  if (i === 2) return Math.pow(3, m) * 2;
};

var cuttingRope = function (n) {
  const dp = Array(n + 1).fill(0);
  dp[2] = 1;
  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      const nowBigger = Math.max(j * (i - j), j * dp[i - j]);
      dp[i] = Math.max(nowBigger, dp[i]);
    }
  }
  return dp[n];
};

var validateStackSequences = function (pushed, popped) {
  const arr = [];
  const validate = (c1, c2) => {
    arr.push(pushed[c1]);
    while (arr.length) {
      console.log(arr);
      while (arr[arr.length - 1] === popped[c2]) {
        console.log(arr[arr.length - 1], popped[c2]);
        arr.pop();
        c2++;
      }
      arr.push(pushed[++c1]);
      console.log(arr);
      if (c1 === pushed.length - 1) {
        break;
      }
    }
    console.log(arr);
    while (arr.length) {
      if (arr.pop() !== popped[c2++]) return false;
    }
    return true;
  };
  return validate(0, 0);
};

//官方解法思路
var validateStackSequences = function (pushed, popped) {
  const arr = [];
  let i = 0;
  for (let num of pushed) {
    arr.push(num);
    while (arr.length && arr[arr.length - 1] === popped[i]) {
      arr.pop();
      i++;
    }
  }
  return !arr.length;
};

//输入输出示例
function inAndout() {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.input,
    output: process.out
  });

  const K = 3;
  const inputs = [];
  rl.on('line', function (data) {
    //获取输入
    inputs.push(data);
    if (K === inputs.length) {
      const result = deal(inputs);
      console.log(result);
    }
  });
  const deal = (inputs) => {
    return movingCount(inputs[0], inputs[1], inputs[2]);
  };
}
var maxProfit = function (prices) {
  const len = prices.length;
  const onesell = (prices, l, r) => {
    if (r - l < 2) return 0;
    let min = Number.MAX_VALUE;
    let max = 0;
    for (let i = l; i < r; i++) {
      max = Math.max(max, prices[i] - min);
      min = Math.min(min, prices[i]);
    }
    return max;
  };
  let min = Number.MAX_VALUE;
  let max = 0;
  let p1 = -1;
  let p2 = -1;
  let fp1 = -1;
  for (let i = 0; i < len; i++) {
    max = Math.max(max, prices[i] - min);
    if (max === prices[i] - min) {
      p2 = i;
      fp1 = p1;
    }
    min = Math.min(min, prices[i]);
    if (min === prices[i]) {
      p1 = i;
    }
  }
  console.log(fp1, p2);
  return max + Math.max(onesell(prices, 0, fp1), onesell(prices, p2 + 1, len));
};
maxProfit([5, 9, 3, 8, 2]);

/* const fs = require('fs');
const data = fs.readFileSync('/dev/stdin');
const result = data
  .toString('ascii')
  .trim()
  .split(' ')
  .map((x) => praseInt(x))
  .reduce((x, y) => x + y, 0);
console.log(result);
process.exit(); */

const fs = require('fs');
const data = fs.readFileSync('/dev/stdin');
const result = data
  .toString('ascii')
  .trim()
  .split(' ')
  .map((x) => parseInt(x))
  .reduce((a, b) => a + b, 0);
console.log(result);
process.exit(); // 请注意必须在出口点处加入此行
