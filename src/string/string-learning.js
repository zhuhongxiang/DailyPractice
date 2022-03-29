/* 1～n 整数中 1 出现的次数
输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。 */
var countDigitOne = function (n) {
  let str = n + '',
    len = str.length,
    cur = len - 1,
    highNum,
    lowNum;
  let digit = 1;
  let res = 0;
  while (cur >= 0) {
    const num = str[cur] * 1; //当前索引值
    highNum = 0;
    lowNum = 0;

    if (num === 0 || num !== 1) {
      let leftIndex = 0;
      while (leftIndex < cur) {
        highNum = highNum * 10 + str[leftIndex] * 1;
        leftIndex++;
      }
      res += num === 0 ? highNum * digit : (highNum + 1) * digit;
    } else {
      let leftIndex = 0,
        rightIndex = cur + 1;
      while (leftIndex < cur) {
        highNum = highNum * 10 + str[leftIndex] * 1;
        leftIndex++;
      }
      while (rightIndex < len) {
        lowNum = lowNum * 10 + str[rightIndex] * 1;
        rightIndex++;
      }
      res += highNum * digit + lowNum + 1;
    }
    digit *= 10;
    cur--;
  }
  return res;
};

var countDigitOne = function (n) {
  let mulk = 1;
  let res = 0;
  for (let k = 0; n >= mulk; ++k) {
    res +=
      Math.floor(n / (mulk * 10)) * mulk +
      Math.min(Math.max((n % (mulk * 10)) - mulk + 1, 0), mulk);
    mulk *= 10;
  }
  return res;
};

/* 拉齐有一个 01 序列，他可以对这个序列进行任意多次变换，每次变换都是把序列的最后若干个元素放到最前面，
例如：010011，将最后 3 个元素 011 放到最前面，序列变为 011010 。
所有变换结束后，拉齐需要挑出一个全为 1 的连续区间，要求最大化区间长度。

数据范围：输入序列长度满足 1 \le n \le 50000 \1≤n≤50000  */
//思路：最好的办法就行将字符串首尾相连，一次遍历查找就行。不过我们也可以将字符串乘2，然后一次遍历查找最长连续1的长度。
while ((line = readline())) {
  const s1 = line;
  let c = 0;
  let res = 0;
  if (s1.indexOf(0) != -1) {
    const s2 = s1 + s1;
    const n = s2.length;
    for (let i = 0; i < n; i++) {
      if (s2[i] === '1') {
        c++;
        if (c > res) {
          res = c;
        }
      } else {
        c = 0;
      }
    }
    print(res);
  } else {
    print(s1.length);
  }
}
