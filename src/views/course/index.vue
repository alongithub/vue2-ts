<template>
	<div class=''>
		<el-card>
			<template slot="header">课程管理</template>
			<course-list/>
		</el-card>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import CourseList from './components/list.vue';

export default Vue.extend({
	name: 'CourseIndex',
	components: {
		CourseList
	}
});
</script>
