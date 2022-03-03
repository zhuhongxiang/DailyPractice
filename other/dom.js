//遍历DOM树打印每个元素的tagName
//深度优先
function deepLogTagNames(parentNode) {
  console.log(parentNode.tagName);
  const childNodes = parentNode.childNodes;
  //过滤没有tagName的节点，遍历输出
  Array.prototype.filter
    .call(childNodes, (item) => item.tagName)
    .forEach((itemNode) => {
      deepLogTagNames(itemNode);
    });
}
deepLogTagNames(document.body);

//让VNode渲染成真正的DOM的模拟代码
function createElement(vnode) {
  const tag = vnode.tag;
  const attrs = vnode.attrs || {};
  const childrenNodes = vnode.childrenNodes || [];

  if (!tag) {
    return;
  }
  let elem = document.createElement(tag);

  let tagName;
  for (tagName in attrs) {
    if (attrs.hasOwnProperty(tagName)) {
      elem.setAttribute(tagName, attrs[tagName]);
    }
  }

  childrenNodes.forEach(function (childVNode) {
    elem.appendChild(createElement(childVNode));
  });

  return elem;
}

//vnode与newVnode如何对比的模拟代码
function updateChildren(Vnode, newVnode) {
  var children = Vnode.childrenNodes || [];
  var newChildren = newVnode.childrenNodes || [];

  children.forEach(function (childNodes, index) {
    var newChildNodes = newChildren[index];

    if (childNodes.tag === newChildNodes.tag) {
      updateChildren(childNodes, newChildNodes);
    } else {
      replaceNode(childNodes, newChildNodes);
    }
  });
}

function deepLogTagNames(parentNode) {
  console.log(parentNode.tagName);
  const childNodes = parentNode.childNodes;

  Array.prototype.filter
    .call(childNodes, (item) => item.tagName)
    .forEach((childNode) => {
      deepLogTagNames(childNode);
    });
}
deepLogTagNames(document.body);
