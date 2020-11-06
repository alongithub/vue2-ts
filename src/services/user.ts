/*
 * @Description: 用户相关的请求模块
 * @Author: sunwenlong
 * @Date: 2020-10-30 16:37:31
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-06 14:16:15
 */
import request from "@/utils/request";
import qs from "qs";

interface Login {
	phone: string;
	password: string;
}

export const login = (data: Login) => {
	return request({
		method: "POST",
		url: "/front/user/login",
		// axios 默认发送 application/json 格式请求
		// headers: {
		// 	"content-type": "application/x-www-form-urlencoded"
		// },
		// 当使用qs.stringify处理data后会默认发送application/x-www-form-urlencoded的请求
		// 如果data直接传递对象,默认会发送application/json的请求
		// 如果data是FormData 对象，则content-type会默认发送multipart/form-data请求
		data: qs.stringify(data)
	});
};

export const getUserInfo = () => {
	return request({
		method: "GET",
		url: "/front/user/getInfo"
	});
};

/**
 * @name: 分页条件查询用户列表
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
*/
export const getAllUser = (data: any) => {
	return request({
		method: "POST",
		url: '/boss/user/getUserPages',
		data
	});
};

/**
 * @name: 修改用户启用状态
 * @test: test font
 * @msg:
 * @param {number} userId
 * @param {0|1} status 1 启用 0 禁用
 * @return {*}
 */
export const changeUserStatus = (userId: number|string, status: 0|1) => {
	return status === 1
		? request({
			method: "GET",
			url: "/boss/user/enableUser",
			params: {
				userId
			}
		})
		: request({
			method: 'GET',
			url: '/boss/user/forbidUser',
			params: {
				userId
			}
		});
};

/**
 * @name: 给用户分配角色
 * @test: test font
 * @msg:
 * @param {any} data { "userId": 0, "roleIdList": []}
 * @return {*}
 */
export const allocUserRole = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/role/allocateUserRoles',
		data
	});
};

/**
 * @name: 获取用户角色
 * @test: test font
 * @msg:
 * @param {string} userId
 * @return {*}
 */
export const getUserRole = (userId: string|number) => {
	return request({
		method: 'GET',
		url: `/boss/role/user/${userId}`
	});
};
