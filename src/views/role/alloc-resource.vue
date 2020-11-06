<!--
 * @Description:分配菜单
 * @Author: sunwenlong
 * @Date: 2020-11-05 10:21:53
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-05 15:26:41
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">分配资源</div>
			<el-tree
				node-key="id"
				ref="resource-tree"
				v-loading="loading"
				:props="defaultProps"
				:default-checked-keys="roleResources"
				:data="resource"
				show-checkbox
				default-expand-all
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
import { getRoleResource, allocRoleResource } from "@/services/resource";
import { getAllResourceCategory } from '@/services/resource-category';
import { Tree } from 'element-ui';

export default Vue.extend({
	name: "AllocResource",
	props: {
		roleId: {
			type: [Number, String],
			required: true
		}
	},
	created() {
		this.loadRoleResources();
	},
	data() {
		return {
			loading: true,
			resource: [],
			roleResources: [],
			defaultProps: {
				children: "resourceList",
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
				if (l.resourceList) {
					this.reduceCheckedKeys(l.resourceList, arr);
				}
			});
		},
		async loadRoleResources() {
			this.loading = true;
			const { data } = await getRoleResource(this.roleId);
			if (data.code === '000000') {
				console.log(data);
				const arr: any = [];
				this.reduceCheckedKeys(data.data, arr);
				this.roleResources = arr;
				console.log(arr);
				this.resource = data.data;
			}
			this.loading = false;
		},
		async onAlloc() {
			this.loading = true;
			const resourceIdList = (this.$refs['resource-tree'] as Tree).getCheckedKeys();
			const { data } = await allocRoleResource({
				roleId: this.roleId,
				resourceIdList
			});
			if (data.code === '000000') {
				this.$message.success('分配成功');
				this.$router.back();
			}
			this.loading = false;
		},
		resetTree() {
			(this.$refs['resource-tree'] as Tree).setCheckedKeys([]);
		}
	}
});
</script>
