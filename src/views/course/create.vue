<!--
 * @Description:新建课程
 * @Author: sunwenlong
 * @Date: 2020-11-06 15:31:07
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 09:18:42
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">
				<el-steps
					:active="activeStep"
					simple
				>
					<el-step
						v-for="(step,index) in steps"
						:key="index"
						style="cursor: pointer;"
						@click.native="activeStep=index"
						:title="step.title"
						:icon="step.icon"
					></el-step>

				</el-steps>
			</div>
			<el-form label-width="80px">
				<div v-show="activeStep===0">
					<el-form-item label="课程名称">
						<el-input v-model="course.courseName"></el-input>
					</el-form-item>
					<el-form-item label="课程简介">
						<el-input v-model="course.brief"></el-input>
					</el-form-item>
					<el-form-item label="课程概述">
						<el-input
							v-model="course.previewFirstField"
							style="margin-bottom: 10px"
							placeholder="概述"
						></el-input>
						<el-input
							v-model="course.previewSecondField"
							placeholder="概述2"
						></el-input>
					</el-form-item>
					<el-form-item label="讲师姓名">
						<el-input v-model="course.teacherDTO.teacherName"></el-input>
					</el-form-item>
					<el-form-item label="讲师简介">
						<el-input v-model="course.teacherDTO.description"></el-input>
					</el-form-item>
					<el-form-item label="课程排序">
						<el-input-number v-model="course.sortNum"></el-input-number>
					</el-form-item>
				</div>
				<div v-show="activeStep===1">
					<el-form-item label="课程封面">

						<!--
							1 v-model 父组件会传递一个value的数据给子组件
							2 默认监听input事件， 修改绑定的数据
						-->
						<image-upload v-model="course.courseListImg" />
					</el-form-item>
					<el-form-item label="介绍封面">
						<image-upload v-model="course.courseImgUrl" />
					</el-form-item>

				</div>
				<div v-show="activeStep===2">
					<el-form-item label="售卖价格">
						<el-input v-model="course.discounts">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="商品原价">
						<el-input v-model="course.price">
							<template slot="append">元</template>
						</el-input>
					</el-form-item>
					<el-form-item label="销量">
						<el-input v-model="course.sales">
							<template slot="append">单</template>
						</el-input>
					</el-form-item>
					<el-form-item label="活动标签">
						<el-input v-model="course.discountsTag">
						</el-input>
					</el-form-item>
				</div>
				<div v-show="activeStep===3">
					<el-form-item label="开启秒杀">
						<el-switch
							v-model="isSecondKill"
							active-color="#13ce66"
							inactive-color="#ff4949"
						>
						</el-switch>
					</el-form-item>
					<template v-if="isSecondKill">
						<el-form-item label="开始时间">
							<el-date-picker
								v-model="course.activityCourseDTO.beginTime"
								type="date"
								placeholder="选择日期"
								value-format="yyyy-MM-dd"
								format="yyyy-MM-dd"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="结束时间">
							<el-date-picker
								v-model="course.activityCourseDTO.endTime"
								type="date"
								placeholder="请选择日期时间"
								value-format="yyyy-MM-dd"
								format="yyyy-MM-dd"
							>
							</el-date-picker>
						</el-form-item>
						<el-form-item label="秒杀价">
							<el-input v-model="course.activityCourseDTO.amount">
								<template slot="append">元</template>
							</el-input>
						</el-form-item>
						<el-form-item label="秒杀库存">
							<el-input v-model="course.activityCourseDTO.stock">
								<template slot="append">个</template>
							</el-input>
						</el-form-item>
					</template>
				</div>
				<div v-show="activeStep===4">
					<el-form-item label="课程详情">
						<el-input
							type="textarea"
							v-model="course.courseDescriptionMarkDown"
						>
						</el-input>
					</el-form-item>
					<el-form-item label="是否发布">
						<el-switch
							:active-value="1"
							:inactive-value="0"
							v-model="course.status"
						>
						</el-switch>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="handleSave"
						>保存</el-button>
					</el-form-item>
				</div>
				<el-form-item v-if="activeStep<4">
					<el-button @click="activeStep++">下一步</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<style lang='scss' scoped>
</style>
<script lang='ts'>
import Vue from "vue";
import { saveCoutse } from "@/services/course";
import ImageUpload from "./components/imageUpload.vue";

export default Vue.extend({
	components: {
		ImageUpload
	},
	name: "CourseCreate",
	data() {
		return {
			activeStep: 0,
			steps: [
				{ title: "基本信息", icon: "edit" },
				{ title: "课程封面", icon: "picture" },
				{ title: "销售信息", icon: "upload" },
				{ title: "秒杀活动", icon: "edit" },
				{ title: "课程详情", icon: "edit" }
			],
			// imageUrl: "", // 图片预览
			isSecondKill: false, // 是否开启秒杀
			course: {
				courseName: "",
				brief: "",
				teacherDTO: {
					// id: 0,
					// courseId: 0,
					teacherName: "",
					teacherHeadPicUrl: "",
					position: "",
					description: ""
				},
				courseDescriptionMarkDown: "",
				price: 0,
				discounts: 0,
				priceTag: "",
				discountsTag: "",
				isNew: true,
				isNewDes: "",
				courseListImg: "",
				courseImgUrl: "",
				sortNum: 0,
				previewFirstField: "",
				previewSecondField: "",
				status: 1, // 上架状态， 1默认发布
				sales: 0,
				activityCourse: true,
				activityCourseDTO: {
					// id: 0,
					// courseId: 0,
					beginTime: "",
					endTime: "",
					amount: 0,
					stock: 0
				},
				autoOnlineTime: ""
			}
		};
	},
	methods: {
		// 上传成功后转换文件为base64用于展示
		// handleAvatarSuccess(res: any, file: any) {
		// 	this.imageUrl = URL.createObjectURL(file.raw);
		// },

		async handleSave() {
			const { data } = await saveCoutse(this.course);
			this.$router.back();
		}
	}
});
</script>
