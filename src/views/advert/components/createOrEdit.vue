<!--
 * @Description: 添加或者编辑广告
 * @Author: sunwenlong
 * @Date: 2020-11-10 15:53:18
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 17:15:20
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">
				{{id ? '编辑广告' : '添加广告'}}
			</div>
			<el-form
				label-width="80px"
				ref="form"
				:model="form"
				:rules="formRole"
			>
				<el-form-item
					label="广告名称"
					prop="name"
				>
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item
					label="广告位置"
					prop="spaceId"
				>
					<el-select v-model="form.spaceId">
						<el-option
							v-for="item in spacelist"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					label="开始时间"
					prop="startTime"
				>
					<el-date-picker
						v-model="form.startTime"
						type="datetime"
						format="yyyy-MM-dd hh:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item
					label="到期时间"
					prop="endTime"
				>
					<el-date-picker
						v-model="form.endTime"
						type="datetime"
						format="yyyy-MM-dd hh:mm:ss"
					></el-date-picker>
				</el-form-item>
				<el-form-item
					label="上下线"
					prop="status"
				>
					<el-switch
						v-model="form.status"
						:active-value="1"
						:inactive-value="0"
						active-color="#13ce66"
						inactive-color="#ff4949"
					></el-switch>
				</el-form-item>
				<el-form-item
					label="广告图片"
					prop="img"
				>
					<image-upload v-model="form.img" />
				</el-form-item>
				<el-form-item
					label="广告链接"
					prop="link"
				>
					<el-input
						v-model="form.link"
						placeholder="请输入广告链接"
					></el-input>
				</el-form-item>
				<el-form-item
					label="广告备注"
					prop="text"
				>
					<el-input
						type="textarea"
						v-model="form.text"
						placeholder="请输入广告备注"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button
						type="primary"
						@click="onSubmit"
					>确定</el-button>
					<el-button @click="$router.push({name: 'advert'})">取消</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import { getAllSpace, saveOrUpdateAd, getAdbyId } from "@/services/ad";
import ImageUpload from "@/components/imageUpload.vue";
import { Form } from 'element-ui';

export default Vue.extend({
	components: {
		ImageUpload
	},
	props: {
		id: {
			type: [String, Number],
			default: ""
		}
	},
	name: "CreateOrEditAd",
	created() {
		this.loadSpaceList();
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
				],
				startTime: [
					{
						required: true,
						message: "选择开始时间",
						trigger: "blur"
					}
				],
				endTime: [
					{
						required: true,
						message: "选择结束时间",
						trigger: "blur"
					}
				],
				link: [
					{
						required: true
					}
				]
			},
			form: {
				name: "",
				spaceId: "",
				text: "",
				img: "",
				sort: 0,
				link: "",
				status: 0,
				startTime: "",
				endTime: ""
			}
		};
	},
	methods: {
		async loadSpaceList() {
			const { data } = await getAllSpace();
			if (data.success) {
				this.spacelist = data.content;
			}
		},
		async onSubmit() {
			try {
				this.loading = true;
				await (this.$refs.form as Form).validate();
				const { data } = await saveOrUpdateAd(this.form);
				if (data.success) {
					this.$message.success('操作成功');
					this.$router.push({ name: 'advert' });
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
			const { data } = await getAdbyId(this.id);
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
