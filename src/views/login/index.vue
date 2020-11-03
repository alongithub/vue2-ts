<template>
	<div class='login'>
		<!--
			表单验证
			1、:model="formdata" // 绑定数据
			2、:rules="rules" // 绑定校验规则
			3、ref="form" // 方便js获取校验状态来判断是否发送请求
			4、el-form-item 绑定prop属性（对应的字段）
		-->
		<el-form
			class="login_form"
			label-position="top"
			ref="form"
			:rules="rules"
			:model="formdata"
			label-width="80px"
		>
			<el-form-item
				label="手机号"
				prop="phone"
			>
				<el-input v-model="formdata.phone"></el-input>
			</el-form-item>
			<el-form-item
				label="密码"
				prop="password"
			>
				<el-input
					type="password"
					v-model="formdata.password"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button
					:loading="islogining"
					class="login_btn"
					type="primary"
					@click="onSubmit"
				>登陆</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { Form } from "element-ui";
import { login } from "@/services/user";

export default Vue.extend({
	name: "LoginIndex",
	data() {
		return {
			islogining: false,
			formdata: {
				phone: "15510792995",
				password: "111111"
			},
			rules: {
				phone: [
					{
						required: true,
						message: "请输入手机号",
						trigger: "blur"
					},
					{
						pattern: /^1\d{10}$/,
						message: "请输入正确的手机号",
						trigger: "blur"
					}
				],
				password: [
					{
						required: true,
						message: "请输入密码",
						trigger: "blur"
					},
					{
						min: 6,
						max: 18,
						message: "长度在6-18个字符",
						trigger: "blur"
					}
				]
			}
		};
	},
	methods: {
		async onSubmit() {
			try {
				// validate 不传回调会返回promise，如果验证失败意味着promise失败，不会向下执行,异常会被catch捕获
				// this.$refs.form.validate();
				await (this.$refs.form as Form).validate();

				this.islogining = true;

				const { data } = await login(this.formdata);
				if (data.state !== 1) {
					this.$message.error(data.message);
				} else {
					// TODO 保存登录状态到vuex中，在需要登录状态的页面使用路由拦截器
					this.$store.commit('setUser', data.content);

					this.$message.success('登陆成功');
					// 在router的beforeEach拦截了用户直接访问除登录之外的页面或者在某个页面时登录状态失效导致跳转到login时，将跳转到login之前的页面保存到了route.query中
					this.$router.push(this.$route.query.redirect as string || '/');
					// this.$router.push({
					// 	name: "home"
					// });
				}
			} catch (e) {
				console.log(e);
			}

			this.islogining = false;
		}
	}
});
</script>
<style lang="scss" scoped>
.login {
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	.login_form {
		background: #fff;
		padding: 20px;
		border-radius: 5px;
		width: 300px;
	}
	.login_btn {
		width: 100%;
	}
}
</style>
