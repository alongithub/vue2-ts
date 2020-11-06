<template>
	<div class=''>
		<el-card>
			<div slot="header">
				用户管理
			</div>
			<user-list />
		</el-card>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import UserList from './components/list.vue';

export default Vue.extend({
	name: 'UserIndex',
	components: {
		UserList
	}
});
</script>
