<!--
 * @Description: header
 * @Author: sunwenlong
 * @Date: 2020-10-30 14:31:31
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-02 16:39:37
-->
<template>
	<div class='header'>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>活动管理</el-breadcrumb-item>
			<el-breadcrumb-item>活动列表</el-breadcrumb-item>
			<el-breadcrumb-item>活动详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-dropdown>
			<span class="el-dropdown-link">
				<el-avatar
					shape="square"
					:size="40"
					:src="userInfo.portrait || require('@/assets/no-avator.png')"
				></el-avatar>
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>{{userInfo.userName}}</el-dropdown-item>
				<!-- el-dropdown-item组件直接绑定click事件不会生效，因为组件没有这个事件，并且没有对这个事件进行转化。可以通过@click.native将事件绑定到组件内部的根元素上 -->
				<!-- 当然，dropdown-item也有自己的触发点击的事件 -->
				<el-dropdown-item
					divided
					@click.native="handleLogout"
				>
					退出
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>
<style lang='scss' scoped>
.header {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: space-between;
	.el-dropdown-link {
		display: flex;
		align-items: center;
	}
}
</style>

<script lang='ts'>
import { getUserInfo } from "@/services/user";
export default {
	name: "HeadIndex",
	data() {
		return {
			userInfo: {}
		};
	},
	created() {
		this.loadUserInfo();
	},
	methods: {
		async loadUserInfo() {
			const { data } = await getUserInfo();
			this.userInfo = data.content;
		},
		handleLogout() {
			this.$confirm("确认退出吗?", "退出提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(() => {
				this.$store.commit("setUser", null);
				this.$router.push({
					name: "login"
				});
				this.$message({
					type: "success",
					message: "退出成功!"
				});
			}).catch(() => {
				this.$message({
					type: "info",
					message: "已取消退出"
				});
			});
		}
	}
};
</script>
