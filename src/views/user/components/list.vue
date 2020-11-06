<!--
 * @Description: 用户管理列表
 * @Author: sunwenlong
 * @Date: 2020-11-05 17:09:09
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-06 14:20:48
-->
<template>
	<div class=''>
		<el-form
			:inline="true"
			:model="form"
			ref="form"
			class="demo-form-inline"
		>
			<el-form-item
				prop="phone"
				label="输入搜索"
			>
				<el-input
					v-model="form.phone"
					placeholder="手机号"
				></el-input>
			</el-form-item>
			<el-form-item
				prop="value2"
				label="注册时间"
			>
				<el-date-picker
					v-model="form.value2"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					align="right"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item style="float: right;">
				<el-button
					:disabled="loading"
					type="primary"
					@click="onSubmit"
				>查询</el-button>
			</el-form-item>
		</el-form>
		<el-table
			v-loading="loading"
			:data="userList"
			style="width: 100%"
		>
			<el-table-column
				label="用户id"
				prop="id"
			>
			</el-table-column>
			<el-table-column label="头像">
				<template slot-scope="scope">
					<el-avatar
						size="medium"
						:src="scope.row.portrait"
					>
						<img :src="require('@/assets/no-avator.png')" />
					</el-avatar>
				</template>
			</el-table-column>
			<el-table-column
				prop="name"
				label="用户名"
			>
			</el-table-column>
			<el-table-column
				label="手机号"
				prop="phone"
			>
			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope">
					<span
						v-if="scope.row.isDel"
						style="background: red;display: inline-block; width: 10px;height: 10px;border-radius:50%;"
					></span>
					<span
						v-else
						style="background: yellowgreen;display: inline-block; width: 10px;height: 10px;border-radius:50%;"
					></span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间">
				<template slot-scope="scope">
					{{scope.row.createTime | timeFormat}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						type="text"
						@click="showAllocRole(scope.row.id)"
					>分配角色</el-button>

					<el-button
						v-if="!scope.row.isDel"
						type="text"
						@click="onDisableUser(scope.row.id)"
					>禁用</el-button>
					<el-button
						v-else
						type="text"
						@click="onEnableUser(scope.row.id)"
					>
						启用
					</el-button>
				</template>
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
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%"
			@close="selectedRoles=[]"
		>
			<el-select
				v-model="selectedRoles"
				multiple
				style="width: 100%;"
				placeholder="请选择"
			>
				<el-option
					v-for="item in allRoles"
					:key="item.id"
					:label="item.name"
					:value="item.id"
				>
				</el-option>
			</el-select>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="dialogVisible = false;">取 消</el-button>
				<el-button
					type="primary"
					@click="allocRole"
				>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { getAllUser, changeUserStatus, allocUserRole, getUserRole } from "@/services/user";
import { getAllRoles } from '@/services/role';
import { Form } from "element-ui";

export default Vue.extend({
	name: "UserList",
	data() {
		return {
			loading: true,
			selectedRoles: [],
			userList: [],
			form: {
				current: 1,
				size: 10,
				phone: "",
				value2: ""
			},
			total: 0,
			dialogVisible: false,
			allRoles: [],
			editUserId: 0
		};
	},
	created() {
		this.loadUserList();
	},
	methods: {
		async loadUserList() {
			this.loading = true;
			const { current, size, phone, value2 } = this.form;
			const startCreateTime = value2 as any instanceof Array ? value2[0] : "";
			const endCreateTime = value2 as any instanceof Array ? value2[1] : "";
			const { data } = await getAllUser({
				currentPage: current,
				pageSize: size,
				phone,
				startCreateTime,
				endCreateTime
			});
			if (data.code === "000000") {
				this.userList = data.data.records;
				this.total = data.data.total;
			}
			this.loading = false;
		},
		onSubmit() {
			this.form.current = 1;
			this.loadUserList();
		},
		onReset() {
			(this.$refs.form as Form).resetFields();
			this.form.current = 1;
			this.loadUserList();
		},
		async onDisableUser(userId: number | string) {
			this.loading = true;
			const { data } = await changeUserStatus(userId, 0);
			if (data.code === "000000") {
				this.$message.success("禁用成功");
				this.loadUserList();
			} else {
				this.$message.error("禁用失败");
			}
			this.loading = false;
		},
		async onEnableUser(userId: number | string) {
			this.loading = true;
			const { data } = await changeUserStatus(userId, 1);
			if (data.code === "000000") {
				this.$message.success("启用成功");
				this.loadUserList();
			}
			this.loading = false;
		},
		handleSizeChange(val: number) {
			this.form.size = val;
			this.form.current = 1;
			this.loadUserList();
		},
		handleCurrentChange(val: number) {
			this.form.current = val;
			this.loadUserList();
		},
		async showAllocRole(userId: string|number) {
			this.editUserId = userId as number;
			this.dialogVisible = true;
			const { data } = await getAllRoles();
			const { data: { data: userRoles } } = await getUserRole(userId);
			if (data.code === '000000') {
				this.allRoles = data.data;
			}
			if (userRoles instanceof Array) {
				this.selectedRoles = userRoles.map((l: {id: never}) => l.id);
			}
		},
		async allocRole() {
			const { data } = await allocUserRole({
				roleIdList: this.selectedRoles,
				userId: this.editUserId
			});
			if (data.code === '000000') {
				this.$message.success('分配成功');
				this.dialogVisible = false;
			} else {
				this.$message.error('分配失败');
			}
		}
	}
});
</script>
