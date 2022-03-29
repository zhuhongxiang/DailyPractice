const fs = require('fs');
const data = fs.readFileSync('/dev/stdin');
//中间加入数据处理
const inputs = data.toString('ascii').trim().split('\n');
const l1 = inputs[0]
  .trim()
  .split(' ')
  .map((x) => parseInt(x));

const rows = l1[0];
const cols = l1[1];
const mixter = [];
for (let i = 1; i < inputs.length; i++) {
  mixter.push(
    inputs[i]
      .trim()
      .split(' ')
      .map((x) => parseInt(x))
  );
}

const dp = Array(rows + 1)
  .fill(0)
  .map(() => Array(cols + 1).fill(0));
const xSteps = [0, 0, 1, -1],
  ySteps = [1, -1, 0, 0];
const dfs = (x, y) => {
  if (dp[x][y]) return dp[x][y];
  dp[x][y] = 1;
  for (let i = 0; i < 4; i++) {
    let x1 = x + xSteps[i];
    let y1 = y + ySteps[i];
    if (
      x1 >= 0 &&
      y1 >= 0 &&
      x1 < rows &&
      y1 < cols &&
      mixter[x][y] > mixter[x1][y1]
    ) {
      dfs(x1, y1);
      dp[x][y] = Math.max(dp[x][y], dp[x1][y1] + 1);
    }
  }
  return dp[x][y];
};
let result = -1;
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    result = Math.max(result, dfs(i, j));
  }
}
console.log(result);
process.exit(); // 请注意必须在出口点处加入此行
