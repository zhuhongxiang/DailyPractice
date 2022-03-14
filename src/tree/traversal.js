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

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  const arr = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    arr.push(root.val);
    inorder(root.right);
  };
  inorder(root);
  return arr;
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
var preorderTraversal = function (root) {
  const arr = [];
  const preorder = (root) => {
    if (!root) return;
    arr.push(root.val);
    preorder(root.left);
    preorder(root.right);
  };
  preorder(root);
  return arr;
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

var postordertraversal = (root) => {
  const arr = [];
  const postorder = (root) => {
    if (!root) return null;
    postorder(root.left);
    postorder(root.right);
    arr.push(root.val);
  };
  return postorder(root);
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

//二叉树的广度优先遍历(层序遍历)
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

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const result = [];
  if (!root) return result;
  const queue = [];
  queue.push(root);
  while (queue.length != 0) {
    const qlen = queue.length;
    result.push([]);
    for (let i = 0; i < qlen; i++) {
      const node = queue.shift();
      result[result.length - 1].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/* 二叉搜索树的后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历的结果。如果是则输出true,否则输出false。假设输入的数组的任意两个数字都互不相同。 */

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function (postorder) {
  if (!postorder.length) return true;
  return test(postorder, 0, postorder.length - 1);
};

const test = (array, start, end) => {
  if (end >= start) return true;
  let i = end - 1;
  while (i >= start && array[i] > array[end]) i--;
  for (let j = i; j >= start; j--) {
    if (array[j] >= array[end]) return false;
  }
  return test(array, start, i) && test(array, i, end - 1);
};

//剑指 Offer 26. 树的子结构
/* 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。 */
// 自己思考的方法
var isSubStructure = function (A, B) {
  if (!B) return false;

  const compareTree = (l1, l2) => {
    if (!l1 || !l2) return false;
    let isSon = false;
    if (l1.val === l2.val) {
      isSon = true;
      if (l2.left) {
        isSon = compareTree(l1.left, l2.left);
      }
      if (l2.right) {
        isSon = compareTree(l1.right, l2.right);
      }
    }
    return isSon;
  };
  const travelTree = (l1, l2) => {
    if (!l1) return false;
    if (compareTree(l1, l2)) {
      return true;
    }
    if (l1.left && travelTree(l1.left, l2)) {
      return true;
    }
    if (l1.right && travelTree(l1.right, l2)) {
      return true;
    }
    return false;
  };
  return travelTree(A, B);
};

//官方解题思路
var isSubStructure = function (A, B) {
  if (!A || !B) return false;

  const compareTree = (l1, l2) => {
    if (!l2) return true;
    if (!l1 || l1.val !== l2.val) return false;
    return compareTree(l1.left, l2.left) && compareTree(l1.right, l2.right);
  };

  return (
    compareTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B)
  );
};
