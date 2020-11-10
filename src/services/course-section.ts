/*
 * @Description: 课程章节接口
 * @Author: sunwenlong
 * @Date: 2020-11-09 14:07:12
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 19:20:57
 */
import request from "@/utils/request";

/**
 * @name: 获取课程章节
 * @test: test font
 * @msg: 获取课程章节
 * @param {string} courseId
 * @return {*}
 */
export const getCourseSection = (courseId: string|number) => {
	return request({
		method: 'GET',
		url: '/boss/course/section/getSectionAndLesson',
		params: {
			courseId
		}
	});
};

/**
 * @name: 添加或和编辑章节
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const saveCourseSection = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/course/section/saveOrUpdateSection',
		data
	});
};

/**
 * @name: 添加或和编辑课时
 * @test: test font
 * @msg:
 * @param {any} data
 * @return {*}
 */
export const saveCourseLession = (data: any) => {
	return request({
		method: 'POST',
		url: '/boss/course/lesson/saveOrUpdate',
		data
	});
};

/**
 * @name: 获取章节详情
 * @test: test font
 * @msg:
 * @param {number} sectionId
 * @return {*}
 */
export const getSectionById = (sectionId: number|string) => {
	return request({
		method: 'GET',
		url: '/boss/course/section/getBySectionId',
		params: {
			sectionId
		}
	});
};
