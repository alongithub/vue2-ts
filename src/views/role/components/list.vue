<!--
 * @Description:角色列表
 * @Author: sunwenlong
 * @Date: 2020-11-03 16:39:27
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-05 14:49:49
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
					label="输入搜索"
				>
					<el-input
						v-model="form.name"
						placeholder="角色名称"
					></el-input>
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
		<el-button @click="dialogFormVisible = true">添加角色</el-button>
		<el-table
			v-loading="isLoading"
			:data="roles"
			style="width: 100%"
		>
			<el-table-column
				label="编号"
				type="index"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="name"
				label="角色名称"
				width="180"
			>
			</el-table-column>
			<el-table-column
				prop="description"
				label="描述"
			>
			</el-table-column>
			<el-table-column label="添加时间">
				<template slot-scope="scope">
					{{scope.row.createdTime | timeFormat}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="$router.push({
						name: 'alloc-menu',
						params: {
							roleId: scope.row.id
						}
					})">分配菜单</el-button>
					<el-button type="text" @click="$router.push({
						name: 'alloc-resource',
						params: {
							roleId: scope.row.id
						}
					})">分配资源</el-button>
					<el-button
						type="text"
						@click="editRole(scope.row)"
					>编辑</el-button>
					<el-button
						type="text"
						@click="onDeleteRole(scope.row.id)"
					>删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			:disabled="isLoading"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page.sync="form.current"
			:page-sizes="[10, 20, 50, 100]"
			:page-size="form.size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total"
		>
		</el-pagination>
		<el-dialog
			:title="editId === null ? '添加角色' : '编辑角色'"
			:visible.sync="dialogFormVisible"
			width="30%"
		>
			<create-or-edit
				:edit-id="editId"
				v-if="dialogFormVisible"
				@cancel-create-edit="dialogFormVisible=false;editId = null;"
				@reload-list="loadRoles"
			/>
		</el-dialog>
	</el-card>

</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import CreateOrEdit from "./createOrEdit.vue";

import { getRolePages, deleteRole } from "@/services/role";
import { Form } from "element-ui";

export default Vue.extend({
	components: {
		CreateOrEdit
	},
	name: "RoleList",
	data() {
		return {
			roles: [],
			form: {
				name: "",
				current: 1,
				size: 10
			},
			isLoading: true,
			total: 0,
			dialogFormVisible: false,
			editId: null // 保存编辑时的id
		};
	},
	created() {
		this.loadRoles();
	},
	methods: {
		async loadRoles() {
			this.isLoading = true;
			const { data } = await getRolePages(this.form);
			this.roles = data.data.records;
			this.total = data.data.total;
			this.isLoading = false;
		},
		onReset() {
			(this.$refs.form as Form).resetFields();
			this.form.current = 1;
			this.loadRoles();
		},
		onSubmit() {
			this.form.current = 1;
			this.loadRoles();
		},
		editRole(row: any) {
			this.editId = row.id;
			this.dialogFormVisible = true;
		},
		async onDeleteRole(id: number) {
			this.$confirm("确认删除吗，是否继续?", "删除提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(async () => {
					const { data } = await deleteRole(id);
					if (data.code === "000000") {
						this.$message.success("删除成功");
						this.loadRoles();
					}
				})
				.catch(() => {
					this.$message.info("取消删除");
				});
		},
		handleSizeChange(val: number) {
			this.form.size = val;
			this.form.current = 1;
			this.loadRoles();
		},
		handleCurrentChange(val: number) {
			this.form.current = val;
			this.loadRoles();
		}
	}
});
</script>
