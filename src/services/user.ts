/*
 * @Description: 用户相关的请求模块
 * @Author: sunwenlong
 * @Date: 2020-10-30 16:37:31
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-02 11:10:02
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
