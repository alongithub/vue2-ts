<!--
 * @Description: 添加或者编辑广告
 * @Author: sunwenlong
 * @Date: 2020-11-10 15:53:18
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 17:26:00
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">
				{{id ? '编辑广告位' : '添加广告位'}}
			</div>
			<el-form
				label-width="80px"
				ref="form"
				:model="form"
				:rules="formRole"
			>
				<el-form-item
					label="广告位名称"
					prop="name"
				>
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="onSubmit"
					>确定</el-button>
					<el-button @click="$router.push({name: 'advert-space'})">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { saveOrUpdateSpave, getSpaceById } from "@/services/ad";
import { Form } from 'element-ui';

export default Vue.extend({
	props: {
		id: {
			type: [String, Number],
			default: ""
		}
	},
	name: "CreateOrEditAd",
	created() {
		if (this.id) {
			this.loadInfo();
		}
	},
	data() {
		return {
			loading: false,
			spacelist: [],
			formRole: {
				name: [
					{
						required: true,
						message: "请输入广告名称",
						trigger: "blur"
					}
				]
			},
			form: {
				name: ""
			}
		};
	},
	methods: {
		async onSubmit() {
			try {
				this.loading = true;
				await (this.$refs.form as Form).validate();
				const { data } = await saveOrUpdateSpave(this.form);
				if (data.success) {
					this.$message.success('操作成功');
					this.$router.push({ name: 'advert-space' });
				} else {
					this.$message.error('操作失败');
				}
			} catch (err) {
				console.log(err);
			}
			this.loading = false;
		},
		async loadInfo() {
			this.loading = true;
			const { data } = await getSpaceById(this.id);
			if (data.success) {
				this.$message.success('获取信息成功');
				this.form = data.content;
			} else {
				this.$message.error('获取信息失败');
			}
			this.loading = false;
		}
	}
});
</script>
