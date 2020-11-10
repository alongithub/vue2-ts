<!--
 * @Description: 课程视频上传
 * @Author: sunwenlong
 * @Date: 2020-11-09 20:03:47
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 10:44:02
-->
<template>
	<div class=''>
		<el-card>
			<div slot="header">
				课程视频上传
			</div>
			<p>
				<span>课程</span>
			</p>
			<p>
				<span>阶段</span>
			</p>
			<p>
				<span>课时</span>
			</p>
			<el-form label-width="70px">
				<el-form-item label="视频上传">
					<input ref="vedioFile" type="file" />
				</el-form-item>
				<el-form-item label="封面上传">
					<input ref="imgFile" type="file" />
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleUpload">开始上传</el-button>
					<el-button @click="$router.back()">返回</el-button>
				</el-form-item>
				<el-form-item>
					<p>视频上传中: {{ uploadPercent }}%</p>
					<p v-if="isUploadsuccess">视频转码中: {{ isTranscodeSuccess ? '完成' : '转码中请稍等'}}</p>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import {
	getAliyunImagUploadAddressAndAuth,
	getAliyunVideoUploadAddressAndAuth,
	aliyunTransCode,
	aliyunTransCodePercent
} from '@/services/aliyun';

export default Vue.extend({
	name: "CourseVideo",
	data() {
		return {
			uploader: null,
			imageUrl: '',
			videoId: null,
			uploadPercent: 0,
			isUploadsuccess: false,
			isTranscodeSuccess: false
		};
	},
	created() {
		this.initUploader();
	},
	computed: {
		video() {
			return this.$refs.vedioFile;
		},
		image() {
			return this.$refs.imgFile;
		}
	},
	methods: {
		initUploader() {
			this.uploader = new window.AliyunUpload.Vod({
			// 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
				userId: "1618139964448548",
				// 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
				region: "",
				// 分片大小默认1M，不能小于100K
				partSize: 1048576,
				// 并行上传分片个数，默认5
				parallel: 5,
				// 网络原因失败时，重新上传次数，默认为3
				retryCount: 3,
				// 网络原因失败时，重新上传间隔时间，默认为2秒
				retryDuration: 2,
				// 开始上传
				onUploadstarted: async (uploadInfo: any) => {
					let uploadAddressAndAuth;

					// TODO 通过后端获取文件上传凭证
					if (uploadInfo.isImage) {
						// 获取图片上传凭证
						const { data } = await getAliyunImagUploadAddressAndAuth();
						uploadAddressAndAuth = data.data;
						this.imageUrl = data.data.imageUrl;
					} else {
						// 获取视频上传凭证
						// imageUrl 需要先获取图片上传凭证获取到这个字段，因此要先上传图片，再上传视频，这里是后台接口的设定
						const { data } = await getAliyunVideoUploadAddressAndAuth({
							fileName: uploadInfo.file.name,
							imageUrl: this.imageUrl // 确保 一定先上传图片
						});
						uploadAddressAndAuth = data.data;
						this.videoId = uploadAddressAndAuth.videoId;
					}
					// TODO 调用 uploader.setUploadAuthAndAddress 方法来设置上传凭证，设置好凭证后确认没有问题，上传进度才会开始
					// uploader.setUploadAuthAndAddress(uploadInfo,uploadAuth, uploadAddress, videoId);
					(this.uploader as any).setUploadAuthAndAddress(
						uploadInfo,
						uploadAddressAndAuth.uploadAuth,
						uploadAddressAndAuth.uploadAddress,
						uploadAddressAndAuth.videoId || uploadAddressAndAuth.iamgeId
					);
				},
				// 文件上传成功
				onUploadSucceed: function(uploadInfo: any) {
					console.log('文件上传成功');
				},
				// 文件上传失败
				onUploadFailed: function(uploadInfo: any, code: any, message: any) {
					console.log('文件上传失败');
				},
				// 文件上传进度，单位：字节
				onUploadProgress: (uploadInfo: any, totalSize: any, loadedPercent: any) => {
					if (!uploadInfo.isImage) {
						this.uploadPercent = Math.floor(loadedPercent * 100);
					}
				},
				// 上传凭证超时
				onUploadTokenExpired: function(uploadInfo: any) {
					console.log('上传凭证超时');
				},
				// 全部文件上传结束
				onUploadEnd: async (uploadInfo: any) => {
					this.isUploadsuccess = true;
					// TODO 发送转码请求
					const { data } = await aliyunTransCode({
						lessonId: this.$route.query.lessonId,
						coverImageUrl: this.imageUrl,
						fileName: (this.video as any).files[0].name,
						fileId: this.videoId
					});

					// 轮询获取转码进度
					const timer = setInterval(async () => {
						const { data } = await aliyunTransCodePercent(this.$route.query.lessonId as string);
						console.log(data.data);
						if (data.data === 100) {
							this.isTranscodeSuccess = true;
							window.clearInterval(timer);
							this.$message.success('课程视频上传成功');
						}
					}, 3000);
				}
			});
		},
		handleUpload() {
			this.isUploadsuccess = false;
			this.isTranscodeSuccess = false;
			this.uploadPercent = 0;

			const vedioFile = (this.video as any).files[0];
			const imgFile = (this.image as any).files[0];

			const uploader = this.uploader as any;
			// 添加到上传列表
			// 开始双穿会按照列表添加的顺序上传
			// 因为后天接口的原因，一定要先添加图片，再添加视频
			uploader.addFile(imgFile, null, null, null, '{"Vod":{}}');

			uploader.addFile(vedioFile, null, null, null, '{"Vod":{}}');

			// 开始上传， 触发onUploadstarted
			uploader.startUpload();
		}
	}
});
</script>
