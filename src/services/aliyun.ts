/*
 * @Description: 阿里云上传
 * @Author: sunwenlong
 * @Date: 2020-11-10 09:29:30
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 10:28:19
 */
import request from '@/utils/request';

/**
 * @name: 获取图片上传凭证
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getAliyunImagUploadAddressAndAuth = () => {
	return request({
		method: 'GET',
		url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
	});
};

/**
 * @name: 获取视频上传凭证
 * @test: test font
 * @msg:
 * @param {any} params
 * @return {*}
 */
export const getAliyunVideoUploadAddressAndAuth = (params: any) => {
	return request({
		method: 'GET',
		url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
		params
	});
};

/**
 * @name: 阿里云转码请求
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const aliyunTransCode = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/course/upload/aliyunTransCode.json',
		data
	});
};

/**
 * @name: 获取转码进度
 * @test: test font
 * @msg:
 * @param {any} params
 * @return {*}
 */
export const aliyunTransCodePercent = (lessonId: string|number) => {
	return request({
		method: 'GET',
		url: '/boss/course/upload/aliyunTransCodePercent.json',
		params: {
			lessonId
		}
	});
};
