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
    .map(() => Array(n).fill(false));
  const sums = (nums) => {
    let total = 0;
    while (nums) {
      total += nums % 10;
      nums = Math.floor(nums / 10);
    }
    return total;
  };
  const movingTest = (x, y) => {
    if (x >= m || y >= n || sums(x) + sums(y) > k || visited[x][y]) {
      return 0;
    }
    visited[x][y] = true;
    return 1 + movingTest(x + 1, y) + movingTest(x, y + 1);
  };
  return movingTest(0, 0);
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
console.log(validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]));

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
