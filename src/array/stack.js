function Stack() {
  this.dataStore = [];
  this.top = 0;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.clear = clear;
  this.length = length;
}

function push(element) {
  this.dataStore[this.top++] = element;
}

function pop(element) {
  return this.dataStore[--this.top];
}
function peek() {
  return this.dataStore[this.top - 1];
}

function length() {
  return this.top;
}

function clear() {
  this.top = 0;
}

/* let newstak = new Stack();
newstak.push('牛牛');
newstak.push('豆豆');
newstak.push('花花');

console.log(newstak.length());
console.log(newstak.peek());

const poped = newstak.pop();
console.log(poped); //
console.log(newstak.peek()); //
newstak.clear();

console.log(newstak.length());
console.log(newstak.peek());
newstak.push('羊羊');
console.log(newstak);
console.log(newstak.peek()); */

/* 
1.数制间互相转换

可以利用栈将一个数字从一种数值转换成另一种数制。假设想将数字n转换为以b为基数的数字。实现转换算法如下：

1.最高位为 n % b ,将此位压入栈
2.使用n / b 代替n
3.重复步骤1和2，直到n等于0,且没有余数。
4.持续将栈内元素弹出，直到栈为空。依次将这些元素排列，就得到转换后数字的字符串形式。
（此算法只针对基数为2-9的情况） */

function mulBase(num, base) {
  let s = new Stack();
  do {
    s.push(num % base);
    num = Math.floor((num /= base));
  } while (num > 0);
  let converted = '';
  while (s.length() > 0) {
    converted += s.pop();
  }
  return converted;
}

const num = 32;
const base = 2;

let newNum = mulBase(num, base);
//32 converted to base 2 is 100000
console.log(num + ' converted to base ' + base + ' is ' + newNum);

const num2 = 125;
const base2 = 8;

let newNum2 = mulBase(num2, base2);

//125 converted to base 8 is 175
console.log(num2 + ' converted to base ' + base2 + ' is ' + newNum2);

/* 2.回文。


回文是这样一种现象：一个单词，短语或数字，从前往后写和往后写都是一样的。比如： 单词"dad","racecar"就是回文。
如果忽略空格和标点符号，下面的句子也是回文。“A man, a plan, a canal:Panama”; 数字1001也是回文。

使用栈，可以轻松判断一个字符串是否回文。我们将拿到的自字符串的每个字符按照从左至右的顺序压入栈。
当字符串的字符都入栈后，栈内就保存了一个反转的字符串，最后的字符串在栈顶，第一个字符串在栈底。

字符串完整压入栈内后，通过持续弹出栈中的每个字母就可以得到一个新字符串，该字符串刚好与原来的字符串顺序相反。
我们只需比较两个字符串即可。如果他们相等，就是一个回文。

例子：判断给定字符串是否回文。 */
function isPalindrome(word) {
  let s = new Stack();
  for (let i = 0; i < word.length; ++i) {
    s.push(word[i]);
  }
  let rword = '';
  while (s.length() > 0) {
    rword += s.pop();
  }
  if (word == rword) {
    return true;
  } else {
    return false;
  }
}

const word = 'hello';
if (isPalindrome(word)) {
  console.log(word + ' 是回文的');
} else {
  console.log(word + ' 不是回文的');
}

const word2 = 'racecar';
if (isPalindrome(word2)) {
  console.log(word2 + ' 是回文的');
} else {
  console.log(word2 + ' 不是回文的');
}

/* 3. 递归演示；

栈常用来实现编程语言，使用栈实现递归即为一例（这里只用栈来模拟递归过程）。

为了演示如何用栈实现递归，考虑以下求阶乘的递归定义。首先看看5的阶乘是如何定义的

5! = 5*4*3*2*1 = 120

下面是一个递归函数，可以计算任何数字的阶乘 */

function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function factorialStack(n) {
  let s = new Stack();
  while (n > 1) {
    s.push(n--);
  }
  let count = 1;
  while (s.length() > 0) {
    count *= s.pop();
  }
  return count;
}

console.log(factorialStack(5));
