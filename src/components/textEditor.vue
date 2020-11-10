<!--
 * @Description: 富文本编辑器组件
 * @Author: sunwenlong
 * @Date: 2020-11-09 09:43:59
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 11:00:57
-->
<template>
	<div
		ref="editor"
		class='text-editor'
	></div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import E from "wangeditor";
import { uploadImg } from '@/services/course';

export default Vue.extend({
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	name: "TextEditor",
	mounted() {
		this.initEditor();
	},
	methods: {
		initEditor() {
			const editor = new E(this.$refs.editor as any);
			// onchange事件需要在create之前
			editor.config.onchange = (value: string) => {
				this.$emit("input", value);
			};

			editor.create();
			// 初始化内容需要在create之后
			editor.txt.html(this.value);

			editor.config.customUploadImg = async function(resultFiles: any, insertImgFn: any) {
				const fd = new FormData();
				fd.append('file', resultFiles[0]);
				const { data } = await uploadImg(fd);
				if (data.code === '000000') {
					insertImgFn(data.data.name);
				}
			};
		}
	}
});
</script>
