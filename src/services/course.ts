/*
 * @Description: 课程相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-06 14:48:06
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-08 23:04:20
 */
import request from "@/utils/request";

/**
 * @name: 分页获取课程列表
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const getPageCourses = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/course/getQueryCourses',
		data
	});
};

/**
 * @name: 修改上下架状态
 * @test: test font
 * @msg:
 * @param {number} courseId
 * @param {number} status
 * @return {*}
 */
export const changeCourseStatus = (courseId: number, status: number) => {
	return request({
		method: 'GET',
		url: '/boss/course/changeState',
		params: {
			courseId,
			status
		}
	});
};

/**
 * @name: 保存课程
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const saveCoutse = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/course/saveOrUpdateCourse',
		data
	});
};

/**
 * @name: 上传图片
 * @test: test font
 * @msg: 返回服务器图片地址
 * @param {any} data
 * @return {*}
 */
export const uploadImg = (
	data: any,
	onUploadProgress: (progressEvent: ProgressEvent) => void
) => {
	return request({
		method: 'POST',
		url: '/boss/course/upload',
		data,
		// HTML5 新增的上传响应事件 progress 封装
		// onUploadProgress(e) {
		// 	console.log(e.loaded); // 已上传文件的数据量
		// 	console.log(e.total); // 上传文件的总大小
		// 	Math.floor(e.loaded / e.total * 100);
		// }
		onUploadProgress
	});
};
