<!--
 * @Description: 添加章节与章节编辑
 * @Author: sunwenlong
 * @Date: 2020-11-09 16:20:18
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 16:45:37
-->
<template>
	<div class=''>

		<el-form
			:model="addForm"
			status-icon
			ref="addForm"
			label-width="100px"
			class="demo-ruleForm"
		>
			<el-form-item label="课程名称">
				<el-input
					type="text"
					disabled
				></el-input>
			</el-form-item>
			<el-form-item
				label="章节名称"
				prop="checkPass"
			>
				<el-input type="password"></el-input>
			</el-form-item>
			<el-form-item
				label="章节描述"
				prop="age"
			>
				<el-input type="textarea"></el-input>
			</el-form-item>
			<el-form-item
				label="章节描述"
				prop="age"
			>
				<el-input-number type="textarea"></el-input-number>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					@click="dialogVisible = false;"
				>取消</el-button>
				<el-button
					type="primary"
					@click="submitForm()"
				>确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { saveCourseSection, getSectionById } from "@/services/course-section";

export default Vue.extend({
	name: "SectionAddOrUpdate",
	created() {
		if (this.isEdit) {
			this.loadCourseSection();
		}
	},
	props: {
		isEdit: {
			type: Boolean,
			default: false
		},
		courseId: {
			type: [Number, String],
			required: true
		},
		courseName: String,
		sectionId: {
			type: [Number, String],
			default: ''
		}
	},
	methods: {
		async loadCourseSection() {
			const { data } = await getSectionById(this.sectionId);
			if (data.code === '000000') {

			}
		}
	}
});
</script>
