/*
 * @Description: 菜单的请求模块
 * @Author: sunwenlong
 * @Date: 2020-10-30 16:37:31
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 13:18:09
 */
import request from "@/utils/request";
// import qs from "qs";

export const createOrUpdateMenu = (data: any) => {
	return request({
		method: "POST",
		url: "/boss/menu/saveOrUpdate",
		data
	});
};

export const getEditMenuInfo = (id: string|number = -1) => {
	return request({
		method: "GET",
		url: "/boss/menu/getEditMenuInfo",
		params: {
			id
		}
	});
};

export const getAll = () => {
	return request({
		method: 'GET',
		url: '/boss/menu/getAll'
	});
};

export const deleteMenu = (id: number) => {
	return request({
		method: 'DELETE',
		url: `/boss/menu/${id}`
	});
};
