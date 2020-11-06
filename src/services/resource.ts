/*
 * @Description: 资源相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-03 13:34:56
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-05 15:26:54
 */

import request from "@/utils/request";
// import qs from "qs";

export const getResourcePages = (data: any) => {
	return request({
		method: "POST",
		url: "/boss/resource/getResourcePages",
		data
	});
};

export const getRoleResource = (roleId: number|string) => {
	return request({
		method: "GET",
		url: "/boss/resource/getRoleResources",
		params: {
			roleId
		}
	});
};

export const allocRoleResource = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/resource/allocateRoleResources',
		data
	});
};
