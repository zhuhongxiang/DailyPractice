//二分查找练习
/* 二分查找需要数组是有序的，
1、先从有序数组的最中间元素开始查找，如果和要查找的元素相等，直接返回索引，若不相等则下一步。
2、如果指定的元素大于或者小于中间元素，则在大于或小于的那一半区域内查找，重复第一步直到找到目标元素。 */
//递归做法：
const search1 = (arr, key, start, end) => {
  if (end - start < 1) {
    return -1;
  }
  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === key) {
    return mid;
  } else if (arr[mid] < key) {
    return search1(arr, key, mid + 1, end);
  } else {
    return search1(arr, key, start, mid - 1);
  }
};

//非递归做法：
const search2 = (arr, key) => {
  let start = 0;
  let end = arr.length - 1;
  let mid = 0;
  while (start < end) {
    mid = Math.floor((start + end) / 2);
    if (arr[mid] === key) {
      return mid;
    } else if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
};

//测试
const arr = [23, 45, 18, 37, 92, 13, 24];
const arr1 = arr.sort((x, y) => x - y);
console.log(arr1);
console.log(search1(arr1, 20, 0, arr.length - 1));
