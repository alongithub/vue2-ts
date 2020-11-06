<!--
 * @Description:添加或者编辑角色
 * @Author: sunwenlong
 * @Date: 2020-11-03 17:18:55
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-05 10:11:16
-->
<template>
	<div class='createoredit'>
		<el-form>
			<el-form-item label="角色名称">
				<el-input v-model="role.name"></el-input>
			</el-form-item>
			<el-form-item label="角色编码">
				<el-input v-model="role.code"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="role.description" type="textarea"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="$emit('cancel-create-edit')">取消</el-button>
				<el-button type="primary" @click="onSubmit" :loading="submitLoading">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import { createOrUpdateRole, getRoleInfo } from '@/services/role';

export default Vue.extend({
	props: {
		editId: [String, Number, Object]
	},
	name: 'CreateOrEdit',
	data() {
		return {
			submitLoading: false,
			role: {
				code: "",
				name: "",
				description: ""
			}
		};
	},
	async created() {
		if(this.editId !== null) {
			this.loadInfo();
		}
	},

	methods: {
		async loadInfo() {
			const { data } = await getRoleInfo(this.editId);
			if (data.code === '000000') {
				this.role = data.data;
			}
		},
		async onSubmit() {
			this.submitLoading = true;
			const { data } = await createOrUpdateRole(this.role);
			if (data.code === '000000') {
				this.$message.success('添加成功');
				this.$emit('cancel-create-edit');
				this.$emit('reload-list');
			}
			this.submitLoading = false;
		}
	}

});
</script>
