<!--
 * @Description:分配菜单
 * @Author: sunwenlong
 * @Date: 2020-11-05 10:21:53
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-05 11:54:51
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">分配菜单</div>
			<el-tree
				node-key="id"
				ref="menu-tree"
				v-loading="loading"
				:props="defaultProps"
				:default-checked-keys="roleMenus"
				:data="menu"
				show-checkbox
				default-expand-all
				check-strictly
			>
			</el-tree>
			<el-divider></el-divider>
			<el-button @click="resetTree">清空</el-button>
			<el-button
				type="primary"
				@click="onAlloc"
			>保存</el-button>
		</el-card>

	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { getMenuTree, allocMenus, getRoleMenus } from "@/services/menu";
import { Tree } from 'element-ui';

export default Vue.extend({
	name: "AllocMenu",
	props: {
		roleId: {
			type: [Number],
			required: true
		}
	},
	created() {
		this.loadMenuTree();
		this.loadRoleMenus();
	},
	data() {
		return {
			loading: true,
			menu: [],
			roleMenus: [],
			defaultProps: {
				children: "subMenuList",
				label: "name"
			}
		};
	},
	methods: {
		reduceCheckedKeys(data: any, arr: any) {
			data.forEach((l: any) => {
				if (l.selected) {
					arr.push(l.id as never);
				}
				if (l.subMenuList) {
					this.reduceCheckedKeys(l.subMenuList, arr);
				}
			});
		},
		async loadRoleMenus() {
			const { data } = await getRoleMenus(this.roleId);
			if (data.code === '000000') {
				const arr: any = [];
				this.reduceCheckedKeys(data.data, arr);
				this.roleMenus = arr;
			}
		},
		async loadMenuTree() {
			this.loading = true;
			const { data } = await getMenuTree();
			if (data.code === "000000") {
				this.menu = data.data;
			}
			this.loading = false;
		},
		async onAlloc() {
			this.loading = true;
			const menuIdList = (this.$refs['menu-tree'] as Tree).getCheckedKeys();
			const { data } = await allocMenus({
				roleId: this.roleId,
				menuIdList
			});
			if (data.code === '000000') {
				this.$message.success('分配成功');
				this.$router.back();
			}
			this.loading = false;
		},
		resetTree() {
			(this.$refs['menu-tree'] as Tree).setCheckedKeys([]);
		}
	}
});
</script>
