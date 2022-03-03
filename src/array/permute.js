//打印无重复数字数组全排列，[1,2,3] 打印[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
/* var permute = function (nums) {
  const res = [];
  back(0, nums.length);

  function swrap(a, b) {
    return ([nums[a], nums[b]] = [nums[b], nums[a]]);
  }

  function back(start, end) {
    if (start == end) {
      res.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      swrap(start, i);
      back(start + 1, end);
      swrap(start, i);
    }
  }
  return res;
}; */

var permute = function (nums) {
  const res = [];
  back(0, nums.length);

  function swrap(a, b) {
    return ([nums[a], nums[b]] = [nums[b], nums[a]]);
  }

  function back(start, end) {
    if (start == end) {
      res.push([...nums]);
      return;
    }

    for (let i = start; i < nums.length; ++i) {
      swrap(start, i);
      back(start + 1, end);
      swrap(start, i);
    }
  }
  return res;
};

console.log(permute([1, 2, 3]));

/* var permuteUnique = function (nums) {
  // 回溯法
  let LEN = nums.length;
  let result = [];
  help(0, [], []);
  return result;

  // 用一个数组记录某个元素( 下标 )是否被取过了
  function help(idx, cur, same) {
    if (idx == LEN) {
      result.push(cur);
      return;
    }

    // control 控制大的for循环分支过程中  不选择相同的数进行分支
    // same 判断求一次结果的过程中该索引是否重复使用

    let control = [];
    for (let i = 0; i < nums.length; i++) {
      if (control.indexOf(nums[i]) != -1 || same.indexOf(i) != -1) continue;

      control.push(nums[i]);
      let newSame = [...same, i];

      let add = [...cur, nums[i]];
      help(idx + 1, add, newSame);
    }
  }
}; */

var permuteUnique2 = function (nums) {
  const ans = [];
  const vis = new Array(nums.length).fill(false);
  const backtrack = (idx, perm) => {
    if (idx === nums.length) {
      ans.push(perm.slice());
      return;
    }
    for (let i = 0; i < nums.length; ++i) {
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }
      perm.push(nums[i]);
      vis[i] = true;
      backtrack(idx + 1, perm);
      vis[i] = false;
      perm.pop();
    }
  };
  nums.sort((x, y) => x - y);
  backtrack(0, []);
  return ans;
};

var permuteUnique = function (nums) {
  const res = [];
  const vis = new Array(nums.length).fill(false);
  const backtrack = (idx, perm) => {
    if (idx === nums.length) {
      res.push(perm.slice());
      return;
    }

    for (let i = 0; i < nums.length; ++i) {
      if (vis[i] || (i > 0 && nums[i] === nums[i - 1] && !vis[i - 1])) {
        continue;
      }

      perm.push(nums[i]);
      vis[i] = true;
      backtrack(idx + 1, perm);
      vis[i] = false;
      perm.pop();
    }
  };
  nums.sort((x, y) => x - y);
  backtrack(0, []);
  return res;
};
console.log(permuteUnique([1, 1, 3]));
