<!--
 * @Description:列表组件
 * @Author: sunwenlong
 * @Date: 2020-11-03 13:19:49
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 15:41:35
-->
<template>
	<el-card class="box-card">
		<div
			slot="header"
			class="clearfix"
		>
			<el-form
				:inline="true"
				:model="form"
				ref="form"
				class="demo-form-inline"
			>
				<el-form-item
					prop="name"
					label="资源名称"
				>
					<el-input
						v-model="form.name"
						placeholder="资源名称"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="url"
					label="资源路径"
				>
					<el-input
						v-model="form.url"
						placeholder="资源路径"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="categoryId"
					label="资源分类"
				>
					<el-select
						v-model="form.categoryId"
						placeholder="资源分类"
						:clearable="true"
					>
						<el-option
							:label="item.name"
							:value="item.id"
							v-for="item in resourceCategories"
							:key="item.id"
						></el-option>
					</el-select>
				</el-form-item>

				<el-form-item style="float: right;">
					<el-button
						:disabled="isLoading"
						type="primary"
						@click="onSubmit"
					>查询搜索</el-button>
					<el-button
						@click="onReset"
						:disabled="isLoading"
					>重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-table
			v-loading="isLoading"
			:data="resources"
			style="width: 100%; margin-bottom: 20px"
		>
			<el-table-column
				type="index"
				label="编号"
			>
			</el-table-column>
			<el-table-column
				prop="name"
				label="资源名称"
			>
			</el-table-column>
			<el-table-column
				prop="url"
				label="资源路径"
			>
			</el-table-column>
			<el-table-column
				prop="description"
				label="资源描述"
			>
			</el-table-column>
			<el-table-column
				prop="createdTime"
				label="添加时间"
			>
				<template slot-scope="scope">
					{{reduceTimer(scope.row.createdTime)}}
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				label="操作"
				width="100"
			>
				<template slot-scope="scope">
					<el-button
						type="text"
						size="small"
					>编辑</el-button>
					<el-button
						@click="handleClick(scope.row)"
						type="text"
						size="small"
					>删除</el-button>
				</template>
			</el-table-column>

		</el-table>
		<el-pagination
			:disabled="isLoading"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page.sync="form.currentPage"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="form.pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
	</el-card>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { getResourcePages } from "@/services/resource";
import { getAllResourceCategory } from "@/services/resource-category";
import { Form } from "element-ui";

export default Vue.extend({
	name: "ResourceList",
	data() {
		return {
			resources: [], // 资源列表
			resourceCategories: [], // 资源分类列表
			form: {
				name: "",
				url: "",
				categoryId: undefined, // undefined 数据 axios 请求是不会发送的
				current: 1,
				size: 10
			},
			total: 0,
			isLoading: true
		};
	},
	created() {
		this.loadResources();
		this.loadResourceCategories();
	},
	methods: {
		onReset() {
			(this.$refs.form as Form).resetFields();
			this.form.current = 1;
			this.loadResources();
		},
		onSubmit() {
			this.form.current = 1;
			this.loadResources();
		},
		async loadResourceCategories() {
			const { data } = await getAllResourceCategory();
			this.resourceCategories = data.data;
		},
		async loadResources() {
			this.isLoading = true;
			const { data } = await getResourcePages(this.form);

			this.resources = data.data.records;
			this.total = data.data.total;
			this.isLoading = false;
		},
		reduceTimer(time: string) {
			const date = new Date(time);
			return `${date.getFullYear()}-${date.getMonth() +
				1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
		},
		handleSizeChange(val: number) {
			this.form.size = val;
			this.form.current = 1;
			this.loadResources();
		},
		handleCurrentChange(val: number) {
			this.form.current = val;
			this.loadResources();
		}
	}
});
</script>
