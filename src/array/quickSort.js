//快速排序练习
/* 实现步骤：
- 选择一个基准元素`target`（一般选择第一个数）
- 将比`target`小的元素移动到数组左边，比`target`大的元素移动到数组右边
- 分别对`target`左侧和右侧的元素进行快速排序 */
//递归实现：
const quickSort1 = (array) => {
  if (array.length < 2) {
    return array;
  }
  const target = array[0];
  const left = [];
  const right = [];
  for (let i = 1; i < array.length; i++) {
    if (array[i] < target) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quickSort1(left).concat([target]).concat(quickSort1(right));
};
//非递归实现
/* 思路：
记录一个索引`l`从数组最左侧开始，记录一个索引`r`从数组右侧开始
在`l<r`的条件下，找到右侧小于`target`的值`array[r]`，并将其赋值到`array[l]`
在`l<r`的条件下，找到左侧大于`target`的值`array[l]`，并将其赋值到`array[r]`
这样让`l=r`时，左侧的值全部小于`target`，右侧的值全部小于`target`，将`target`放到该位置 */
const quickSort2 = (arr, start, end) => {
  if (end - start < 1) {
    return;
  }
  const target = arr[start];
  let l = start;
  let r = end;
  while (l < r) {
    while (l < r && arr[r] >= target) {
      r--;
    }
    arr[l] = arr[r];
    while (l < r && arr[l] < target) {
      l++;
    }
    arr[r] = arr[l];
  }
  arr[l] = target;
  quickSort2(arr, start, l - 1);
  quickSort2(arr, l + 1, end);
  return arr;
};
/* 
时间复杂度：平均`O(nlogn)`，最坏`O(n2)`，实际上大多数情况下小于`O(nlogn)`
空间复杂度:`O(logn)`（递归调用消耗）

稳定性：不稳定 */

const quickSort3 = (arr, start, end) => {
  if (end - start < 1) {
    return;
  }
  const target = arr[Math.floor(Math.random() * (end - start)) + start];
  const p = mid(arr, start, end, target);
  quickSort3(arr, start, p[0] - 1);
  quickSort3(arr, p[1] + 1, end);
  return arr;
};
const mid = (arr, l, r, target) => {
  let i = l;
  l = l - 1;
  r = r + 1;
  while (i < r) {
    if (arr[i] < target) {
      l++;
      [arr[i], arr[l]] = [arr[l], arr[i]];
      i++;
    } else if (arr[i] === target) {
      i++;
    } else {
      r--;
      [arr[i], arr[r]] = [arr[r], arr[i]];
    }
  }
  return [l + 1, r - 1];
};
//测试：
const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
// const res1 = quickSort1(arr);
// console.log('递归遍历的结果：' + res1);
// const res2 = quickSort2(arr, 0, arr.length - 1);
// console.log('非递归遍历的结果：' + res2);
const res3 = quickSort3(arr, 0, arr.length - 1);
console.log('随机选择+非递归遍历的结果：' + res3);

