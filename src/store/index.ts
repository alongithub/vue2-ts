import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		// JSON.parse('null') === null // true
		user: JSON.parse(window.localStorage.getItem('user') || 'null') // 当前登录状态
	},
	mutations: {
		setUser (state, payload) {
			try {
				state.user = JSON.parse(payload);

				// TODO 用户信息持久化 // 本地存储只能存字符串
				window.localStorage.setItem('user', payload);
			} catch(e) {}
		}
	},
	actions: {
	},
	modules: {
	}
});
