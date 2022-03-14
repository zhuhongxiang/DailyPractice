const heapSort = (array) => {
  createHeap(array);
  console.log(array);
  for (let i = array.length - 1; i > 0; i--) {
    [array[i], array[0]] = [array[0], array[i]];
    adjust(array, 0, i);
  }
  return array;
};

const createHeap = (array) => {
  const len = array.length;
  const start = parseInt(len / 2) - 1;
  for (let i = start; i >= 0; i--) {
    adjust(array, i, len);
  }
};

const adjust = (array, target, len) => {
  for (let i = 2 * target + 1; i < len; i = 2 * i + 1) {
    if (i + 1 < len && array[i + 1] > array[i]) {
      i = i + 1;
    }
    if (array[i] > array[target]) {
      [array[i], array[target]] = [array[target], array[i]];
      target = i;
    } else {
      break;
    }
  }
};
/* const isMax = (a, b) => {
  return parseInt(a + '' + (b + '')) - 0 > parseInt(b + '' + (a + '')) - 0;
}; */
const arr = [3, 30, 34, 5, 9];
const res1 = heapSort(arr);
console.log('堆排序结果：' + res1);
