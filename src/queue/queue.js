var Queue = function () {
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
  return this.dataStore.shift();
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
    resStr += this.dataStore[i] + '\n';
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

//使用队列对数据进行排序(基数排序)
/**
 *
 * @param {[]} nums 数组
 * @param {Queue} queues 队列
 * @param {Number} n 队列数量
 * @param {Number} digit 位(十位：10/个位:1)
 */
function saveToQueue(nums, queues, n, digit) {
  for (let i = 0; i < n; ++i) {
    if (digit === 1) {
      queues[nums[i] % 10].offer(nums[i]);
    } else {
      queues[Math.floor(nums[i] / 10)].offer(nums[i]);
    }
  }
}

function collect(queues, nums) {
  let i = 0;
  for (let j = 0; j < 10; ++j) {
    while (!queues[j].empty()) {
      nums[i++] = queues[j].poll(); //注意这里应该使用while，把所有个/十位相同的数字取出来
    }
  }
}

function displayArr(nums) {
  for (let i = 0; i < nums.length; ++i) {
    console.log(nums[i] + ' ');
  }
}

let queues = [];
for (let i = 0; i < 10; ++i) {
  queues[i] = new Queue();
}

let nums = [];
for (let i = 0; i < 10; ++i) {
  nums.push(Math.floor(Math.floor(Math.random() * 101)));
}

console.log('排序前的基数为：');
displayArr(nums);
saveToQueue(nums, queues, 10, 1);
collect(queues, nums);
console.log('第一次排序后基数为：');
displayArr(nums);
saveToQueue(nums, queues, 10, 10);
collect(queues, nums);
console.log('第二次排序后基数为：');
displayArr(nums);
