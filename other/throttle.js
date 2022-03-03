//节流函数
//时间戳版
function throttle(func, wait) {
  let privious = 0;
  return function () {
    let now = new Date();
    let content = this;
    let args = arguments;
    if (now - privious > wait) {
      func.apply(content, args);
      privious = now;
    }
  };
}

//定时器版
function throttle(func, wait) {
  let timeout;
  return function () {
    let content = this;
    let args = arguments;

    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null;
        func.apply(content, args);
      }, wait);
    }
  };
}

//双剑合璧版
function throttle(func, wait, type) {
  if (type === 1) {
    var privious = 0;
  } else if (type == 2) {
    var timeout;
  }
  return function () {
    let content = this;
    let args = arguments;

    if (type === 1) {
      let now = new Date();
      if (now - privious > wait) {
        func.apply(content, args);
        privious = now;
      }
    } else if (type == 2) {
      if (!timeout) {
        timeout = setTimeout(function () {
          timeout = null;
          func.apply(content, args);
        }, wait);
      }
    }
  };
}
