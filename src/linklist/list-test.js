//链表练习
/* 1.链表反转
思路：
以链表的头部节点为基准节点
将基准节点的下一个节点挪到头部作为头节点
当基准节点的next为null，则其已经成为最后一个节点，链表已经反转完成 */
const reverseList = (head) => {
  let currentNode = null;
  let headNode = head;
  while (head && head.next) {
    currentNode = head.next;
    head.next = currentNode.next;
    currentNode.next = headNode;
    headNode = currentNode;
  }
  return headNode;
};
const reverseList2 = (head) => {
  if (!head || !head.next) {
    return head;
  }
  let cur = reverseList2(head.next);
  head.next.next = head;
  head.next = null;
  return cur;
};
/* 2.删除链表中的节点：
1.删除的节点不是尾部节点 - 将next节点覆盖当前节点
2.删除的节点是尾部节点且等于头节点，只剩一个节点 - 将头节点置为null
3.删除的节点是尾节点且前面还有节点 - 遍历到末尾的前一个节点删除 */
const deleteNode = (head, node) => {
  if (node.next) {
    node.val = node.next.val;
    node.next = node.next.next;
  } else if (head == node) {
    head = null;
    node = null;
  } else {
    node = head;
    while (node.next.next) {
      node = node.next;
    }
    node.next = null;
    node = null;
  }
  return head;
};
/* leetCode题目1：
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
返回删除后的链表的头节点。

示例 1:

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9. */
//下面解法的思路是找到val对应的node再用上面根据node进行删除的逻辑，时间复杂度O(n+m)
function deleteDuplicates1(head, val) {
  let node = head;
  while (node.val !== val) {
    node = node.next;
  }
  if (node.next) {
    node.val = node.next.val;
    node.next = node.next.next;
  } else if (node === head) {
    node = null;
    head = null;
  } else {
    node = head;
    while (node.next.next) {
      node = node.next;
    }
    node.next = null;
    node = null;
  }
  return head;
}
//上面的解法最坏情况有2次遍历，下面的解法最坏情况只有一次遍历，时间复杂度O(n)
function deleteDuplicates2(head, val) {
  if (val === head.val) {
    if (head.next) {
      head = head.next;
    } else {
      head = null;
    }
  } else {
    let node = head;
    while (node.next.val !== val) {
      node = node.next;
    }
    if (node.next.next) {
      node = node.next;
      node.val = node.next.val;
      node.next = node.next.next;
    } else {
      node.next = null;
    }
  }
  return head;
}
/* leetCode题目2：
请编写一个函数，用于 删除单链表中某个特定节点 。在设计函数时需要注意，你无法访问链表的头节点 head ，只能直接访问 要被删除的节点 。

题目数据保证需要删除的节点 不是末尾节点 。 
输入：head = [4,5,1,9], node = 5
输出：[4,1,9]
解释：指定链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9*/
const deleteNode2 = (node) => {
  node.val = node.next.val;
  node.next = node.next.next;
};

//3.删除排序链表重复的节点
// 1.当前节点或当前节点的next为空，返回该节点
// 2.当前节点是重复节点：找到后面第一个不重复的节点
// 3.当前节点不重复：将当前的节点的next赋值为下一个不重复的节点

/* 题目1：给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回:已排序的链表 。
示例：
输入：head = [1,1,2]
输出：[1,2] */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function deleteDuplicates(head) {
  if (!head || !head.next) {
    return head;
  } else if (head.val === head.next.val) {
    let tempNode = head.next;
    while (tempNode && head.val === tempNode.val) {
      tempNode = tempNode.next;
    }
    head.next = deleteDuplicates(tempNode);
    return head;
  } else {
    head.next = deleteDuplicates(head.next);
    return head;
  }
}

/* 题目2：给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表 。
示例：
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5] */
function deleteDuplicates(head) {
  if (!head || !head.next) {
    return head;
  } else if (head.val === head.next.val) {
    let tempNode = head.next;
    while (tempNode && head.val === tempNode.val) {
      tempNode = tempNode.next;
    }
    return deleteDuplicates(tempNode);
  } else {
    head.next = deleteDuplicates(head.next);
    return head;
  }
}

//4.从尾部到头部打印链表
//利用数组的unshift方法对链表遍历并添加值到数组
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function (head) {
  const arr = [];
  while (head) {
    arr.unshift(head.val);
    head = head.next;
  }
  return arr;
};

//5.输入一个链表，输出该链表中倒数第k个结点
/* leetCode题目：
输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。
例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 1、2、3、4、5、6。这个链表的倒数第 3 个节点是值为 4 的节点。

示例：
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5. */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  const array = [];
  let node = head;
  while (node) {
    array.push(node.val);
    node = node.next;
  }
  const position = array.length - k;
  let ans = head;
  for (let i = 0; i < position; i++) {
    ans = ans.next;
  }
  return ans;
};

//6.合并两个有序的链表
/* 输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

示例1：
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
//自己思考的方法：递归的思想
var mergeTwoLists = function (l1, l2) {
  let ans = new ListNode(-1);
  if (!l1) {
    return (ans = l2);
  }
  if (!l2) {
    return (ans = l1);
  }
  if (l1.val <= l2.val) {
    ans.val = l1.val;
    ans.next = mergeTwoLists(l1.next, l2);
  } else {
    ans.val = l2.val;
    ans.next = mergeTwoLists(l1, l2.next);
  }

  return ans;
};
//循环解决：
var mergeTwoLists = function (l1, l2) {
  let l3 = new ListNode(-1);
  let c3 = l3;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      c3.next = l1;
      l1 = l1.next;
    } else {
      c3.next = l2;
      l2 = l2.next;
    }
    c3 = c3.next;
  }
  c3.next = l1 === null ? l2 : l1;
  return l3.next;
};
//7.链表排序
/* 归并排序(使用快慢指针)
1.将链表分成两个子链表
2.对两个子链表排序后再将它们合并成一个排序的链表 */
const sortList = (head) => {
  if (!head || !head.next) {
    return head;
  }
  let low = head;
  let fast = head.next;
  while (fast !== null && fast.next !== null) {
    low = low.next;
    fast = fast.next.next;
  }

  let newHead = low.next;
  low.next = null;

  let l1 = sortList(head);
  let l2 = sortList(newHead);

  let l3 = new ListNode(-1);
  let c3 = l3;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      c3.next = l1;
      l1 = l1.next;
    } else {
      c3.next = l2;
      l2 = l2.next;
    }
    c3 = c3.next;
  }
  c3.next = l1 === null ? l2 : l1;
  return l3.next;
};

const sortList2 = (head) => {
  if (!head || !head.next) {
    return head;
  }
  let fast = head.next;
  let low = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    low = low.next;
  }
  let newHead = low.next;
  low.next = null;

  let l1 = sortList2(head);
  let l2 = sortList2(newHead);

  let l3 = new ListNode(-1);
  let c3 = l3;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      c3.next = l1;
      l1 = l1.next;
    } else {
      c3.next = l2;
      l2 = l2.next;
    }
    c3 = c3.next;
  }
  c3.next = l1 === null ? l2 : l1;
  return l3.next;
};

//返回一个不要求升序的链表，实现链表数组拆分拼接
//思路：
// 使用Array.flat(Infinity)拉平数组，遍历数组内的链表创建新的链表
var mergeKLists = function (lists) {
  const arr = lists.flat(Infinity);
  let ans = new ListNode(-1);
  if (!arr) {
    return ans;
  } else {
    let l = ans;
    arr.forEach((item) => {
      if (!item) {
        return;
      }
      while (item.next) {
        l.next = item;
        item = item.next;
        l = l.next;
      }
      l.next = item;
      l = l.next;
    });
  }
  return ans.next;
};
//8.合并排序数组
/* 给定一个链表数组，每个链表都已经按升序排列。
请将所有链表合并到一个升序链表中，返回合并后的链表。 */
/* 示例 1：
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]。
示例 2：
输入：lists = []
输出：[]
示例 3：
输入：lists = [[]] 
输出：[]*/

//自己思考的方法：
/* 使用上面的函数内的方法得到一个没有排序的链表
再对链表内的数组进行排序 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const arr = lists.flat(Infinity);
  let ans = new ListNode(-1);
  if (!arr) {
    return ans;
  } else {
    let l = ans;
    arr.forEach((item) => {
      if (!item) {
        return;
      }
      while (item.next) {
        l.next = item;
        item = item.next;
        l = l.next;
      }
      l.next = item;
      l = l.next;
    });
  }
  return sortList(ans.next);
};

//官方解法：
/* 解题思路
    输入的k个排序链表，可以分成两部分，前k/2个链表和后k/2个链表
    如果将这前k/2个链表和后k/2个链表分别合并成两个排序的链表，再将两个排序的链表合并，那么所有链表都合并了
    下面代码中递归调用栈的深度为O(logn)，所以空间复杂度为O(logn)
    因为使用的是归并排序的思路，所以它的时间复杂度为O(nlogn) */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  // 当是空数组的情况下
  if (!lists.length) {
    return null;
  }
  // 合并两个排序链表
  const merge = (head1, head2) => {
    let dummy = new ListNode(0);
    let cur = dummy;
    // 新链表，新的值小就先接谁
    while (head1 && head2) {
      if (head1.val < head2.val) {
        cur.next = head1;
        head1 = head1.next;
      } else {
        cur.next = head2;
        head2 = head2.next;
      }
      cur = cur.next;
    }
    // 如果后面还有剩余的就把剩余的接上
    cur.next = head1 == null ? head2 : head1;
    return dummy.next;
  };
  const mergeLists = (lists, start, end) => {
    if (start + 1 == end) {
      return lists[start];
    }
    // 输入的k个排序链表，可以分成两部分，前k/2个链表和后k/2个链表
    // 如果将这前k/2个链表和后k/2个链表分别合并成两个排序的链表，再将两个排序的链表合并，那么所有链表都合并了
    let mid = (start + end) >> 1;
    let head1 = mergeLists(lists, start, mid);
    let head2 = mergeLists(lists, mid, end);
    return merge(head1, head2);
  };
  return mergeLists(lists, 0, lists.length);
};

const mergeKLists2 = (lists) => {
  if (!lists.length) {
    return null;
  }

  const merge = (l1, l2) => {
    const l3 = new ListNode(-1);
    const c3 = l3;
    while (l1 && l2) {
      if (l1.val <= l2.val) {
        c3.next = l1.next;
        l1 = l1.next;
      } else {
        c3.next = l2.next;
        l2 = l2.next;
      }
      c3 = c3.next;
    }
    c3.next = l1 === null ? l2 : l1;
    return l3.next;
  };

  const mergeLists = (lists, start, end) => {
    if (start + 1 == end) {
      return lists[start];
    }
    let mid = (start + end) >> 1;
    const head1 = mergeLists(lists, start, mid);
    const head2 = mergeLists(lists, mid + 1, end);
    return merge(head1, head2);
  };
  return mergeKLists(lists, 0, lists.length);
};

/* 9.删除链表的倒数第 n 个节点
给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。

示例：
给定一个链表: 1->2->3->4->5, 和 n = 2.

当删除了倒数第二个节点后，链表变为 1->2->3->5. */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let first = head;
  let second = head;
  while (n > 0 && first) {
    first = first.next;
    n--;
  }
  if (!first) {
    return head.next;
  }
  while (first.next) {
    first = first.next;
    second = second.next;
  }
  second.next = second.next.next;
  return head;
};

/* 10.：链表求和（leetcode两数相加）

给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

示例:
输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

解题思路：
1：取出每次遍历的链表值相加
2：如果进位则统计起来
3：题中l1,l2长度不确定，所以当l1,l2以及进位不为空时，继续计算
4：用一个新的对象存要返回的链表 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let list1 = l1;
  let list2 = l2;
  let l3;
  let c3;
  let add = 0;
  while (list1 || list2 || add) {
    let value1 = 0;
    let value2 = 0;
    let sum = 0;
    if (list1) {
      value1 = list1.val;
      list1 = list1.next;
    }
    if (list2) {
      value2 = list2.val;
      list2 = list2.next;
    }
    sum = value1 + value2 + add;
    add = Math.floor(sum / 10);
    if (!c3) {
      l3 = new ListNode(Math.floor(sum % 10));
      c3 = l3;
    } else {
      c3.next = new ListNode(Math.floor(sum % 10));
      c3 = c3.next;
    }
  }
  return l3;
};

const addTwoNumbers = (l1, l2) => {
  let list1 = l1;
  let list2 = l2;
  let l3;
  let c3;
  let add = 0;
  while (list1 || list2 || add) {
    let value1 = 0;
    let value2 = 0;
    let sum = 0;
    if (list1) {
      value1 = list1.val;
      list1 = list1.next;
    }
    if (list2) {
      value2 = list2.val;
      list2 = list2.next;
    }
    sum = value1 + value2 + add;
    add = Math.floor(sum / 10);
    if (!c3) {
      l3 = new ListNode(Math.floor(sum % 10));
      c3 = l3;
    } else {
      c3.next = new ListNode(Math.floor(sum % 10));
      c3 = c3.next;
    }
  }
  return l3.next;
};

/* 10.环形链表
给定一个链表，判断链表中是否形成环。

思路一: 循环一遍，用 Set 数据结构保存节点，利用节点的内存地址来进行判重，如果同样的节点走过两次，则表明已经形成了环。 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const set = new Set();
  let p = head;
  while (p) {
    if (set.has(p)) {
      return true;
    }
    set.add(p);
    p = p.next;
  }
  return false;
};

//思路二: 利用快慢指针，快指针一次走两步，慢指针一次走一步，如果两者相遇，则表明已经形成了环。
var hasCycle2 = function (head) {
  if (!head || !head.next) {
    return false;
  }
  let first = head.next;
  let low = head;
  while (first && first.next) {
    if (first === low) {
      return true;
    }
    first = first.next.next;
    low = low.next;
  }
  return false;
};
//方法三：判断值,依次设值为null看是否会回来
var hasCycle2 = function (head) {
  while (head) {
    if (head.val === null) {
      return true;
    }
    head.val = null;
    head = head.next;
  }
  return false;
};
