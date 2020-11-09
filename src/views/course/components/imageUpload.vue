<!--
 * @Description:上传图片
 * @Author: sunwenlong
 * @Date: 2020-11-08 22:26:31
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-08 23:15:41
-->
<template>
	<div class=''>
		<el-progress
			type="circle"
			:percentage="percentage"
			v-if="isUploading"
			:status="percentage === 100 ? 'success' : undefined"
			:width="178"
		></el-progress>
		<el-upload
			v-else
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:before-upload="beforeAvatarUpload"
			:http-request="handleUpload"
		>
			<img
				v-if="value"
				:src="value"
				class="avatar"
			>
			<i
				v-else
				class="el-icon-plus avatar-uploader-icon"
			></i>
		</el-upload>
	</div>
</template>
<style lang='scss' scoped>
::v-deep .avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
	border-color: #409eff;
}
.avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 178px;
	height: 178px;
	line-height: 178px;
	text-align: center;
}
.avatar {
	width: 178px;
	height: 178px;
	display: block;
}
</style>
<script lang='ts'>
import { uploadImg } from "@/services/course";
import Vue from "vue";
export default Vue.extend({
	name: "ImageUpload",
	props: {
		value: {
			type: String
		}
	},
	data() {
		return {
			isUploading: false,
			percentage: 0
		};
	},
	methods: {
		beforeAvatarUpload(file: any) {
			// 上传之前文件验证
			const isJPG = file.type === "image/jpeg";
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error("上传头像图片只能是 JPG 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 2MB!");
			}
			return isJPG && isLt2M;
		},
		async handleUpload(options: any) {
			this.isUploading = true;
			const fd = new FormData();
			fd.append("file", options.file);
			const { data } = await uploadImg(fd, e => {
				this.percentage = Math.floor((e.loaded / e.total) * 100);
			});
			this.isUploading = false;
			this.percentage = 0;
			// 修改父组件调用时，v-model绑定的值
			this.$emit("input", data.data.name);
		}
	}
});
</script>
