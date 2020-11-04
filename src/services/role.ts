/*
 * @Description: 角色相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-03 15:46:43
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 17:26:04
 */
import request from "@/utils/request";
// import qs from "qs";

export const getRolePages = (data: any) => {
	return request({
		method: "POST",
		url: "/boss/role/getRolePages",
		data
	});
};

export const createOrUpdateRole = (data: any) => {
	return request({
		method: "POST",
		url: "/boss/menu/saveOrUpdate",
		data
	});
};
