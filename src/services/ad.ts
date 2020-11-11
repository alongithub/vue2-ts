/*
 * @Description: 广告广告位相关接口
 * @Author: sunwenlong
 * @Date: 2020-11-10 14:38:11
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 17:26:58
 */
import request from '@/utils/request';

/**
 * @name: 获取全部广告列表
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getAdList = () => {
	return request({
		method: 'GET',
		url: '/front/ad/getAdList'
	});
};

/**
 * @name: 根据id获取广告信息
 * @test: test font
 * @msg:
 * @param {number} id
 * @return {*}
 */
export const getAdbyId = (id: number|string) => {
	return request({
		method: 'GET',
		url: '/front/ad/getAdById',
		params: {
			id
		}
	});
};

/**
 * @name: 修改或添加广告
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const saveOrUpdateAd = (data: any) => {
	return request({
		method: 'POST',
		url: '/front/ad/saveOrUpdate',
		data
	});
};

/**
 * @name: 更新广告状态
 * @test: test font
 * @msg:
 * @param {number} id
 * @param {number} status
 * @return {*}
 */
export const changeAdStatus = (id: number|string, status: number) => {
	return request({
		method: 'GET',
		url: '/front/ad/updateStatus',
		params: {
			id,
			status
		}
	});
};

/**
 * @name: 获取所有广告位
 * @test: test font
 * @msg:
 * @param {*}
 * @return {*}
 */
export const getAllSpace = () => {
	return request({
		method: 'GET',
		url: '/front/ad/space/getAllSpaces'
	});
};

/**
 * @name: 根据id获取广告位
 * @test: test font
 * @msg:
 * @param {*} id
 * @return {*}
 */
export const getSpaceById = (id: number|string) => {
	return request({
		method: 'GET',
		url: '/front/ad/space/getSpaceById',
		params: {
			id
		}
	});
};

/**
 * @name: 新增或修改广告位
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const saveOrUpdateSpave = (data: any) => {
	return request({
		method: 'POST',
		url: '/front/ad/space/saveOrUpdate',
		data
	});
};
