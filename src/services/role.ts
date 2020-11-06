/*
 * @Description: 角色相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-03 15:46:43
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-06 13:34:46
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
		url: "/boss/role/saveOrUpdate",
		data
	});
};

export const deleteRole = (id: number) => {
	return request({
		method: "DELETE",
		url: `/boss/role/${id}`
	});
};

export const getRoleInfo = (id: number) => {
	return request({
		method: 'GET',
		url: `/boss/role/${id}`
	});
};

/**
 * @name: 获取所有角色
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getAllRoles = () => {
	return request({
		method: 'GET',
		url: '/boss/role/all'
	});
};
