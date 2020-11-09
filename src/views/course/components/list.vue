<!--
 * @Description: 课程管理列表
 * @Author: sunwenlong
 * @Date: 2020-11-05 17:09:09
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-06 15:35:30
-->
<template>
	<div class=''>
		<el-card>
			<el-form
				:inline="true"
				:model="form"
				ref="form"
				class="demo-form-inline"
			>

				<el-form-item
					prop="courseName"
					label="课程名称"
				>
					<el-input
						v-model="form.courseName"
						placeholder="课程名称"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="status"
					label="状态"
				>
					<el-select
						v-model="form.status"
						placeholder="请选择"
					>
						<el-option
							:key="undefined"
							label="全部"
							:value="undefined"
						>
						</el-option>
						<el-option
							key="1"
							label="上架"
							:value="1"
						>
						</el-option>
						<el-option
							key="0"
							label="下架"
							:value="0"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button
						:disabled="loading"
						type="primary"
						@click="onSubmit"
					>查询</el-button>
				</el-form-item>

				<el-button  style="float: right;" @click="$router.push({name: 'course-create'})">创建课程</el-button>
			</el-form>
		</el-card>

		<el-table
			v-loading="loading"
			:data="courseList"
			style="width: 100%"
		>
			<el-table-column
				label="id"
				prop="id"
			>
			</el-table-column>
			<el-table-column
				label="课程名称"
				prop="courseName"
			>
			</el-table-column>
			<el-table-column
				prop="price"
				label="价格"
			>
				<template slot-scope="scope">
					￥{{scope.row.price}}
				</template>
			</el-table-column>
			<el-table-column
				label="排序"
				prop="sortNum"
			>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<el-switch
						:disabled="scope.row.isloading"
						v-model="scope.row.status"
						active-color="#13ce66"
						:active-value="1"
						:inactive-value="0"
						@change="changeStatus(scope.row)"
						inactive-color="#ff4949"
					>
					</el-switch>

				</template>
			</el-table-column>
			<el-table-column label="操作">
				<!-- <template slot-scope="scope">

					<el-button type="text">编辑</el-button>
					<el-button type="text">
						内容管理
					</el-button>
				</template> -->
			</el-table-column>
		</el-table>
		<el-pagination
			:disabled="loading"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page.sync="form.current"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="form.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { getPageCourses, changeCourseStatus } from "@/services/course";
import { Form } from "element-ui";

export default Vue.extend({
	name: "UserList",
	data() {
		return {
			loading: true,
			courseList: [],
			form: {
				current: 1,
				size: 10,
				courseName: "",
				status: undefined
			},
			total: 0
		};
	},
	created() {
		this.loadCourseList();
	},
	methods: {
		async loadCourseList() {
			this.loading = true;
			const { current, size, courseName, status } = this.form;
			const { data } = await getPageCourses({
				currentPage: current,
				pageSize: size,
				courseName,
				status
			});
			if (data.code === "000000") {
				data.data.records.forEach((l: any) => {
					l.isloading = false;
				});
				this.courseList = data.data.records;
				this.total = data.data.total;
			}
			this.loading = false;
		},
		onSubmit() {
			this.form.current = 1;
			this.loadCourseList();
		},
		onReset() {
			(this.$refs.form as Form).resetFields();
			this.form.current = 1;
			this.loadCourseList();
		},
		handleSizeChange(val: number) {
			this.form.size = val;
			this.form.current = 1;
			this.loadCourseList();
		},
		handleCurrentChange(val: number) {
			this.form.current = val;
			this.loadCourseList();
		},
		async changeStatus(course: any) {
			course.isloading = true;
			const { data } = await changeCourseStatus(course.id, course.status);
			if (data.code === "000000") {
				this.loadCourseList();
				this.$message.success(
					course.status === 1 ? "上架成功" : "下架成功"
				);
			} else {
				this.$message.error(
					course.status === 1 ? "上架失败" : "下架失败"
				);
			}
			course.isloading = false;
		}
	}
});
</script>
