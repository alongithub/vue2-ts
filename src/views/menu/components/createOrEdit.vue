<!--
 * @Description: 添加或编辑菜单
 * @Author: sunwenlong
 * @Date: 2020-11-02 16:53:37
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 13:17:36
-->
<template>
	<div class='menu-create'>
		<el-card class="box-card">
			<div
				slot="header"
				class="clearfix"
			>
				{{isEdit ? '编辑菜单' : '添加菜单'}}
			</div>
			<div>
				<el-form
					ref="form"
					:model="form"
					:rules="rules"
					label-width="80px"
				>
					<el-form-item
						label="菜单名称"
						prop="name"
					>
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item
						label="菜单路径"
						prop="href"
					>
						<el-input v-model="form.href"></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" prop="parentId">
						<el-select
							v-model="form.parentId"
							placeholder="请选择上级菜单"
						>
							<el-option label="无上级菜单" :value="-1"></el-option>
							<el-option
								:label="item.name"
								:value="item.id"
								v-for="item in parentMenuList"
								:key="item.id"
							></el-option>
						</el-select>
					</el-form-item>
					<el-form-item
						label="描述"
						prop="description"
					>
						<el-input v-model="form.description"></el-input>
					</el-form-item>
					<el-form-item
						label="前端图标"
						prop="icon"
					>
						<el-input v-model="form.icon"></el-input>
					</el-form-item>

					<el-form-item
						label="是否显示"
						prop="shown"
					>
						<el-radio-group v-model="form.shown">
							<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item
						label="排序"
						prop="orderNum"
					>
						<el-input-number
							v-model="form.orderNum"
							:min="1"
						></el-input-number>
					</el-form-item>
					<el-form-item>
						<el-button
							type="primary"
							@click="onSubmit"
						>提交</el-button>
						<el-button v-if="!isEdit">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>

	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import { createOrUpdateMenu, getEditMenuInfo } from '@/services/menu';
import { Form } from "element-ui";

export default Vue.extend({
	name: "menu-create",
	props: {
		isEdit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			rules: {
				parentId: [
					{
						required: true, message: '请选择上级菜单', trigger: 'blur'
					}
				],
				name: [
					{
						required: true, message: '请输入菜单名称', trigger: 'blur'
					}
				],
				href: [
					{
						required: true, message: '请输入菜单路径', trigger: 'blur'
					}
				],
				icon: [
					{
						required: true, message: '请输入前端图标', trigger: 'blur'
					}
				],
				orderNum: [
					{
						required: true, message: '请输入序号', trigger: 'blur'
					}
				],
				shown: [
					{
						required: true, trigger: 'blur'
					}
				]
			},
			form: {
				// id: 0,
				parentId: -1, // -1 标识没有上级菜单
				name: "",
				href: "",
				icon: "",
				orderNum: 0,
				description: "",
				shown: true
			},
			parentMenuList: [] // 父级菜单列表
		};
	},
	created() {
		this.loadMenuInfo();
	},
	methods: {
		async onSubmit() {
			try {
				await (this.$refs.form as Form).validate();

				const { data } = await createOrUpdateMenu(this.form);
				if (data.code === '000000') {
					this.$message.success('提交成功');
					this.$router.push({
						name: 'menu'
					});
				}
			} catch(e) {
				console.log(e);
			}
		},
		async loadMenuInfo() {
			const { data } = await getEditMenuInfo(this.$route.params.id || -1);
			if (data.data.menuInfo) {
				this.form = data.data.menuInfo;
			}
			if (data.code === '000000') {
				this.parentMenuList = data.data.parentMenuList;
			}
		}
	}
});
</script>
