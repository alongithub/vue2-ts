<!--
 * @Description:添加或者编辑角色
 * @Author: sunwenlong
 * @Date: 2020-11-03 17:18:55
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 17:31:34
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
				<el-button>取消</el-button>
				<el-button type="primary" @click="onSubmit">确定</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import { createOrUpdateRole } from '@/services/role';

export default Vue.extend({
	name: 'CreateOrEdit',
	data() {
		return {
			role: {
				code: "",
				name: "",
				description: ""
			}
		};
	},
	methods: {
		async onSubmit() {
			const { data } = await createOrUpdateRole(this.role);
			if (data.code === '000000') {
				this.$message.success('添加成功');
			}
		}
	}

});
</script>
