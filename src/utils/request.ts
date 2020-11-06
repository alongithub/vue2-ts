/*
 * @Description: 接口请求模块，请求拦截器
 * @Author: sunwenlong
 * @Date: 2020-10-29 16:47:07
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-06 13:23:48
 */
import axios from "axios";
import store from '@/store';
import { Message } from 'element-ui';
import router from '@/router';
import qs from 'qs';

function redirectLogin() {
	router.push({
		name: 'login',
		query: {
			redirect: router.currentRoute.fullPath // 保存跳转登录前的页面
		}
	});
}

function refreshToken() {
	return axios.create()({
		method: 'POST',
		url: '/front/user/refresh_token',
		data: qs.stringify({
			refreshtoken: store.state.user.refresh_token
		})
	});
}

// axios 默认发送 application/json 格式请求
const request = axios.create({

});

// 请求拦截器
request.interceptors.request.use(function (config) {
	// 统一处理token
	const { user } = store.state;
	if (user && user.access_token) {
		config.headers.Authorization = user.access_token;
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});

// 响应拦截器
let isRefreshing = false; // 控制刷新token的状态,当token失效或者过期后，有多个请求同事发出时，锁定只有第一个请求刷新token
let requests: Array<Function> = []; // token失效或者过期后,有多个请求同时发出，第一个请求刷新token后会重新发送，剩下的请求暂存在这里，等token刷新成功弄后重新发送
request.interceptors.response.use(function (response) {
	// 2 xx 状态码的都会进入这里
	// 如果接口使用自定义状态码来定义token失效或过期，在这里拦截
	return response;
}, async function (error) {
	// > 2 xx 状态码会走这里
	// 如果接口使用http状态码403来定义token失效或过期，在这里拦截

	if (error.response) { // 请求收到响应了，但是状态码超出2 xx 范围
		// 400 401 403 404 5xx ...
		const { status } = error.response;
		if (status === 400) {
			Message.error('请求参数错误');
		} else if (status === 401) {
			// 未提供token，token无效，token过期
			if (!store.state.user) {
				redirectLogin();
				return Promise.reject(error);
			}

			if (!isRefreshing) {
				isRefreshing = true;
				// 如果有refresh_token , 尝试刷新token, refresh_token只能使用一次
				return refreshToken().then(res => {
					if (!res.data.success) {
						throw new Error('刷新Token 失败');
					}
					//	-> 成功，保存信息到本地，重发一次请求，并重发缓存中的请求
					store.commit('setUser', res.data.content);
					requests.forEach(cb => cb());
					requests = []; // 清空缓存中的接口
					return request(error.config);
				}).catch(err => {
					console.log(err);
					//	-> 失败，跳转到登录页
					store.commit('setUser', null);
					redirectLogin();
					return Promise.reject(error);
				}).finally(() => {
					isRefreshing = false;
				});
			}

			// token正在刷新时，把请求缓存到数组中，并返回一个挂起的promise，等数组中的函数被执行结束时，挂起状态结束，回到请求第一次发送的代码位置的回调中
			return new Promise(resolve => {
				requests.push(() => {
					resolve(request(error.config));
				});
			});

			// try {
			// 	// 刷新token的接口不需要拦截器，使用axios.create创建新的实例
			// 	const { data } = await axios.create()({
			// 		method: 'POST',
			// 		url: '/front/user/refresh_token',
			// 		data: qs.stringify({
			// 			refreshtoken: store.state.user.refresh_token
			// 		})
			// 	});
			// 	//	-> 成功，保存信息到本地，重发一次请求
			// 	store.commit('setUser', data.content);
			// 	return request(error.config);
			// } catch (error) {
			// 	//	-> 失败，跳转到登录页
			// 	store.commit('setUser', null);
			// 	redirectLogin();
			// 	return Promise.reject(error);
			// }
		} else if (status === 403) {
			Message.error('没有权限，请联系管理员');
		} else if (status === 404) {
			Message.error('请求资源不存在');
		} else if (status >= 500) {
			Message.error('服务端错误，请联系管理员');
		}
	} else if (error.request) { // 请求发出去了，但是没有收到响应
		Message.error('请求超时，请刷新重试');
	} else { // 在请求体里发生错误
		Message.error(`请求失败${error.message}`);
	}
	return Promise.reject(error);
});

export default request;
