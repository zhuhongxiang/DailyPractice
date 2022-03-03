var quickSort = function (array) {
  if (array.length < 2) {
    return;
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
  return quickSort(left).concat([target], quickSort(right));
};

var quickSort = function (array, start, end) {
  if (end - start < 1) {
    return;
  }
  const target = array[start];
  let l = start;
  let r = end;
  while (l < r) {
    while (l < r && array[l] < target) {
      l++;
    }
    array[r] = array[l];
    while (l < r && array[r] >= target) {
      r--;
    }
    array[l] = array[r];
  }
  array[l] = target;
  quickSort(array, start, l - 1);
  quickSort(array, l + 1, end);
  return array;
};
