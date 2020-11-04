import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "./styles/index.scss";

Vue.config.productionTip = false;

Vue.use(ElementUI);

// 全局定义格式化时间过滤器
Vue.filter('timeFormat', function (time: string) {
	const date = new Date(time);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
