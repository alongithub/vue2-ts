<!--
 * @Description:新建课程
 * @Author: sunwenlong
 * @Date: 2020-11-06 15:31:07
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-09 12:37:55
-->
<template>
	<div class=''>
		<create-or-update />
	</div>
</template>
<style lang='scss' scoped>
</style>
<script lang='ts'>
import Vue from "vue";
import CreateOrUpdate from './components/createOrUpdate.vue';

export default Vue.extend({
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
