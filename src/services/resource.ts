/*
 * @Description: 资源相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-03 13:34:56
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 15:16:36
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
