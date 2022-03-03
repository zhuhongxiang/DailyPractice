import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  beforeCreate() {
    // eslint-disable-next-line no-proto
    this.__proto__.$bus = this;
  },
  render: (h) => h(App)
}).$mount('#app');
