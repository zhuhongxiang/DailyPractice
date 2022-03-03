// 中序遍历
// 递归实现：
var inordertraversal = function (root, array = []) {
  if (root) {
    inordertraversal(root.left, array);
    array.push(root.val);
    inordertraversal(root.right, array);
  }
  return array;
};

// 非递归实现：
var inordertraversal = function (root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
};

//前序遍历
//递归实现：
var preordertraversal = function (root, array = []) {
  if (root) {
    array.push(root.val);
    preordertraversal(root.left, array);
    preordertraversal(root.right, array);
  }
  return array;
};

//非递归实现：
var preordertraversal = function (root) {
  const result = [];
  const stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      result.push(current.val);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return result;
};

//后序遍历
//递归遍历：
var postordertraversal = function (root, array = []) {
  postordertraversal(root.left, array);
  postordertraversal(root.right, array);
  array.push(root.val);
};

var postordertraversal = function (root) {
  const result = [];
  const stack = [];
  let last = null;
  let current = root;
  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack[stack.length - 1];
    if (!current.right || current.right == last) {
      current = stack.pop();
      result.push(current.val);
      last = current;
      current = null;
    } else {
      current = current.right;
    }
  }
  return result;
};

//二叉树的广度优先遍历
var breadthFirstTraversal = function (root, queue = []) {
  const queue = [];
  const result = [];
  let current = null;
  queue.push(root);
  while (queue.length > 0) {
    current = queue.shift();
    result.push(current.val);
    if (current.left) {
      queue.push(current.left);
    }
    if (current.right) {
      queue.push(current.right);
    }
  }
  return result;
};
