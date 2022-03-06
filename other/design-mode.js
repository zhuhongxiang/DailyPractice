//单例设计模式
const Singleton = function (name) {
  this.name = name;
};
Singleton.prototype.getName = function () {
  console.log(this.name);
};

Singleton.getInstance = (function () {
  let instance;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();

const one = Singleton.getInstance('I am first one');
const two = Singleton.getInstance('I am second one');
console.log(one === two);
console.log(one);
console.log(two);

//工厂模式
/* 工厂模式是我们最常用的实例化对象模式了，是用工厂方法代替new操作的一种模式。

因为工厂模式就相当于创建实例对象的new，我们经常要根据类Class生成实例对象，
如A a=new A() 工厂模式也是用来创建实例对象的，所以以后new时就要多个心眼，
是否可以考虑使用工厂模式，虽然这样做，可能多做一些工作，但会给你系统带来更大的可扩展性和尽量少的修改量。 */
function Animal(opts) {
  if (typeof opts !== 'object') throw new TypeError('type error');
  let obj = new Object();
  obj.name = opts.name;
  obj.color = opts.color;
  obj.getInfo = function () {
    return '名称：' + obj.name + ',颜色：' + obj.color;
  };
  return obj;
}

const dog = Animal({ name: '狗', color: '黑色' });
console.log(dog.getInfo());

//构造函数模式
// 创建自定义的构造函数，从而定义自定义对象的属性和方法。使用构造函数的方法，既解决了重复实例化的问题，又解决了对象识别的问题。

function Animals(name, color) {
  this.name = name;
  this.color = color;
  this.getName = function () {
    return this.name;
  };
}
// 实例一个对象
const cat = new Animals('猫', '白色');
console.log(cat.getName());

//观察者模式
const Subject = function () {
  this.observers = [];
  this.addObserver = function (observer) {
    this.observers.push(observer);
  };
  this.removeObserver = function (observer) {
    this.observers = this.observers.filter((item) => item !== observer);
  };
  this.notify = function () {
    this.observers.forEach((item) => {
      item.update();
    });
  };
};

const Observer = function (name) {
  this.name = name;

  this.update = function () {
    console.log(`my name is ${this.name}`);
  };
};

let sub = new Subject();
let obs1 = new Observer('observer1');
let obs2 = new Observer('observer2');
let obs3 = new Observer('observer3');
sub.addObserver(obs1);
sub.addObserver(obs2);
sub.addObserver(obs3);
sub.removeObserver(obs3);
sub.notify();

//订阅者发布者模式(比观察者多了一个调度中心)
/* const sub1 = {
  update: () => {
    console.log('sub1');
  }
};
const sub2 = {
  update: () => {
    console.log('sub2');
  }
};
const sub3 = {
  update: () => {
    console.log('sub3');
  }
};

const Dep = function () {
  this.subs = [];
  this.append = (sub) => this.subs.push(sub);
  this.notify = () =>
    this.subs.forEach((sub) => {
      sub.update();
    });
};

const Publisher = function () {
  this.deps = [];
  this.addDep = (dep) => this.deps.push(dep);
  this.publish = () => this.deps.forEach((dep) => dep.notify());
};

let dep = new Dep();
dep.append(sub1);
dep.append(sub2);
dep.append(sub3);
let publisher = new Publisher();
publisher.addDep(dep);
publisher.publish(); */

class Publisher {
  constructor(name, dep) {
    this.name = name;
    this.dep = dep;
  }
  addTopic(topicName) {
    this.dep.addTopic(topicName);
  }
  removeTopic(topicName) {
    this.dep.removeTopic(topicName);
  }
  publish(topicName) {
    this.dep.notify(topicName);
  }
}

class Subscriber {
  constructor(name, dep) {
    this.name = name;
    this.dep = dep;
  }
  subscribe(topicName) {
    this.dep.subscribeTopic(topicName, this);
  }
  unsubscribe(topicName) {
    this.dep.unsubscribeTopic(topicName, this);
  }
  update(topic) {
    console.log(`${topic}'已经推送给了'${this.name}`);
  }
}

class Dep {
  constructor() {
    this.topics = {};
  }
  addTopic(topic) {
    this.topics[topic] = [];
  }
  removeTopic(topic) {
    delete this.topics[topic];
  }
  subscribeTopic(topic, sub) {
    if (this.topics[topic]) {
      this.topics[topic].push(sub);
    }
  }
  unsubscribeTopic(topic, sub) {
    this.topics[topic].forEach((item, index) => {
      if (item === sub) {
        this.topics[topic].slice(index, 1);
      }
    });
  }
  notify(topic) {
    this.topics[topic].forEach((item) => {
      item.update(topic);
    });
  }
}

var channel = new Dep();

var pub1 = new Publisher('报社1', channel);
var pub2 = new Publisher('报社2', channel);

pub1.addTopic('晨报1');
pub1.addTopic('晚报1');
pub2.addTopic('晨报2');

var sub1 = new Subscriber('小明', channel);
var sub2 = new Subscriber('小红', channel);
var sub3 = new Subscriber('小张', channel);

sub1.subscribe('晨报1');
sub2.subscribe('晨报1');
sub2.subscribe('晨报2');
sub3.subscribe('晚报1');

sub3.subscribe('晨报2');
sub3.unsubscribe('晨报2');

pub1.publish('晨报1');
pub1.publish('晚报1');
pub2.publish('晨报2');
