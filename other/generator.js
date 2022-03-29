//生成器可以实现范围和填充数组
function* range(start, end) {
  while (start < end) {
    yield start++;
  }
}

function* zeros(n) {
  while (n--) {
    yield 0;
  }
}

function test() {
  for (let i of range(3, 6)) {
    console.log(i);
  }
  const arr = Array.from(zeros(8));
  console.log(arr);
}
test();
