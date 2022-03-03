//防抖函数
//非立即执行版：
function debounce(func, wait) {
  let timeout;
  return function () {
    let content = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(function () {
      func.apply(content, args);
    }, wait);
  };
}

//立即执行版
function debounce(func, wait) {
  let timeout;
  return function () {
    let content = this;
    let args = arguments;

    if (timeout) clearTimeout(time);

    let now = !time;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (now) {
      func.apply(content, args);
    }
  };
}

//双剑合璧版
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let content = this;
    let args = arguments;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      let callnow = !timeout;
      timeout = setTimeout(function () {
        timeout = null;
      }, wait);
      if (callnow) {
        func.apply(content, args);
      }
    } else {
      timeout = setTimeout(function () {
        func.apply(content, args);
      }, wait);
    }
  };
}
