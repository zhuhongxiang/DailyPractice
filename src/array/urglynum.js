/* 剑指 Offer 49. 丑数
我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。 */
var nthUglyNumber = function (n) {
  let sum = 1,
    count = 1,
    arr = [];
  while (sum < 6 * n) {
    sum += ((count + 2) * (count + 1)) / 2;
    count++;
  }
  let x, y, z;
  for (x = 0; x <= count; x++) {
    for (y = 0; y <= count; y++) {
      for (z = 0; z <= count; z++) {
        if (x + y + z <= count) {
          arr.push(Math.pow(2, x) * Math.pow(3, y) * Math.pow(5, z));
        }
      }
    }
  }
  arr.sort((x, y) => x - y);
  return arr[n - 1];
};
//动态规划官方解法
var nthUglyNumber = function (n) {
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  let x = 1,
    y = 1,
    z = 1;
  for (let i = 2; i <= n; i++) {
    const num2 = dp[x] * 2,
      num3 = dp[y] * 3,
      num5 = dp[z] * 5;
    dp[i] = Math.min(Math.min(num2, num3), num5);
    if (dp[i] === num2) {
      x++;
    }
    if (dp[i] === num3) {
      y++;
    }
    if (dp[i] === num5) {
      z++;
    }
  }
  return dp[n];
};

//最小堆+哈希表去重
class MinHeap {
  constructor() {
    this.heap = [];
  }

  indexParent(index) {
    return (index - 1) >> 1;
  }

  indexLeftChild(index) {
    return 2 * index + 1;
  }

  indexRightChild(index) {
    return 2 * index + 2;
  }

  swrap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  insert(item) {
    this.heap.push(item);
    this.shiftUp(this.heap.length - 1);
  }

  shiftUp(index) {
    if (index === 0) return;
    const parentIndex = this.indexParent(index);
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swrap(parentIndex, index);
      this.shiftUp(parentIndex);
    }
  }

  shiftDown(index) {
    const leftChildIndex = this.indexLeftChild(index);
    const rightChildIndex = this.indexRightChild(index);
    if (this.heap[leftChildIndex] < this.heap[index]) {
      this.swrap(leftChildIndex, index);
      this.shiftDown(leftChildIndex);
    }
    if (this.heap[rightChildIndex] < this.heap[index]) {
      this.swrap(rightChildIndex, index);
      this.shiftDown(rightChildIndex);
    }
  }

  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
    return this.heap[0];
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}
var nthUglyNumber = function (n) {
  const factors = [2, 3, 5];
  const set = new Set();
  const heap = new MinHeap();
  set.add(1);
  heap.insert(1);
  let urglyNum = 0;
  for (let i = 0; i < n; i++) {
    urglyNum = heap.pop();
    for (let factor of factors) {
      const next = urglyNum * factor;
      if (!set.has(next)) {
        set.add(next);
        heap.insert(next);
      }
    }
  }
  return urglyNum;
};
