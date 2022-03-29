//归并排序
/* 利用归并的思想实现的排序方法。
该算法是采用分治法（Divide and Conquer）的一个非常典型的应用。（分治法将问题分成一些小的问题然后递归求解，
而治的阶段则将分的阶段得到的各答案"修补"在一起，即分而治之)。
将已有序的子序列合并，得到完全有序的序列：

  即先使每个子序列有序，再使子序列段间有序
  若将两个有序表合并成一个有序表，称为二路归并 */

/*   分割：
  将数组从中点进行分割，分为左、右两个数组
  递归分割左、右数组，直到数组长度小于2

  归并：
  如果需要合并，那么左右两数组已经有序了。
  创建一个临时存储数组temp，比较两数组第一个元素，将较小的元素加入临时数组
  若左右数组有一个为空，那么此时另一个数组一定大于temp中的所有元素，直接将其所有元素加入temp */

/*   写法1
  分割数组时直接将数组分割为两个数组，合并时直接合并数组。
  
  优点：思路简单，写法简单
  缺点：空间复杂度略高，需要复制多个数组 */

const mergeSort1 = (array) => {
  if (array.length < 2) {
    return array;
  }
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);
  return merge1(mergeSort1(left), mergeSort1(right));
};
const merge1 = (left, right) => {
  const temp = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      temp.push(left.shift());
    } else {
      temp.push(right.shift());
    }
  }
  while (left.length) {
    temp.push(left.shift());
  }
  while (right.length) {
    temp.push(right.shift());
  }
  return temp;
};

/* 记录数组的索引，使用left、right两个索引来限定当前分割的数组。

优点：空间复杂度低，只需一个temp存储空间，不需要拷贝数组

缺点：写法复杂 */

const mergeSort2 = (array, left, right) => {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    mergeSort2(array, left, mid);
    mergeSort2(array, mid + 1, right);
    merge2(array, left, mid, right);
  }
  return array;
};

const merge2 = (array, left, mid, right) => {
  let leftIndex = left;
  let rightIndex = mid + 1;
  let tempIndex = 0;
  const temp = new Array(right - left + 1).fill(0);
  while (leftIndex <= mid && rightIndex <= right) {
    temp[tempIndex++] =
      array[leftIndex] < array[rightIndex]
        ? array[leftIndex++]
        : array[rightIndex++];
  }
  while (leftIndex <= mid) {
    temp[tempIndex++] = array[leftIndex++];
  }
  while (rightIndex <= right) {
    temp[tempIndex++] = array[rightIndex++];
  }
  for (tempIndex = 0; tempIndex < temp.length; tempIndex++) {
    array[left + tempIndex] = temp[tempIndex];
  }
};

//测试：
const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const res1 = mergeSort1(arr);
console.log('写法一的结果：' + res1);
const res2 = mergeSort2(arr, 0, arr.length - 1);
console.log('写法二的结果：' + res2);
