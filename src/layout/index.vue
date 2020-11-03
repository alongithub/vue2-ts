<!--
 * @Description: 界面布局
 * @Author: sunwenlong
 * @Date: 2020-10-30 11:36:38
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-10-30 14:36:57
-->
<template>
	<el-container>
		<el-aside width="200px">
			<app-aside />
		</el-aside>
		<el-container>
			<el-header>
				<app-header />
			</el-header>
			<el-main>
				<router-view />
			</el-main>
		</el-container>
	</el-container>
</template>
<style lang="scss" scoped>
.el-header {
	background-color: #fff;
	color: #333;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
}

.el-container {
	min-height: 100vh;
	min-width: 1000px;
}
</style>

<script>
import AppAside from "./components/app-aside";
import AppHeader from "./components/app-header";

export default {
	components: {
		AppAside,
		AppHeader
	},
	name: "LayoutIndex"
};
</script>
