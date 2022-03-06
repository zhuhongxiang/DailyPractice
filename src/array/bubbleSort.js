//冒泡排序练习
/* 思想：
循环数组，比较当前元素和下一个元素，如果当前元素比下一个元素大，向上冒泡。
这样一次循环之后最后一个数就是本数组最大的数。
下一次循环继续上面的操作，不循环已经排序好的数。 */
function bubbleSort(arr) {
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] < arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
  }
}
//时间复杂度：最差O(n^2)，次数=n(n-1)/2，最好O(n)，即是在序列本来就是正序的情况下
//优化：当一次循环没有发生冒泡，说明已经排序完成，停止循环。
function bubbleSort(arr) {
  for (let j = 0; j < arr.length; j++) {
    let exchange = true;
    for (let i = 0; i < arr.length - 1 - j; i++) {
      if (arr[i] < arr[i + 1]) {
        exchange = false;
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
      }
    }
    if (exchange) {
      console.log('n共排了' + j + '趟');
      break;
    }
  }
}
//测试：
const arr = new Array(23, 45, 18, 37, 92, 13, 24);
bubbleSort(arr);
console.log('数组排序后为：' + arr);
