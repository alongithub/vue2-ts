/*
 * @Description: 资源分类相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-03 15:16:23
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 15:19:16
 */
import request from "@/utils/request";
// import qs from "qs";

/**
 * @name: 获取资源分类列表
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getAllResourceCategory = () => {
	return request({
		method: 'GET',
		url: "/boss/resource/category/getAll"
	});
};
