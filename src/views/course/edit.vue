<!--
 * @Description:编辑课程
 * @Author: sunwenlong
 * @Date: 2020-11-06 15:31:07
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 12:39:09
-->
<template>
	<div class=''>
		<create-or-update isEdit :course-id="courseId"/>
	</div>
</template>
<style lang='scss' scoped>
</style>
<script lang='ts'>
import Vue from "vue";
import CreateOrUpdate from './components/createOrUpdate.vue';

export default Vue.extend({
	props: {
		courseId: {
			type: [Number, String]
		}
	},
	components: {
		CreateOrUpdate
	},
	name: "CourseCreate",
	data() {
		return {
		};
	}
});
</script>
