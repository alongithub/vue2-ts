<template>
	<div class=''>
		<el-card>
			<div slot="header" class="header">
				<span>广告列表</span>
				<el-button @click="$router.push({name: 'advert-create'})">添加广告</el-button>
			</div>
			<ad-list/>
		</el-card>
	</div>
</template>
<style lang='scss' scoped>
.header{
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}</style>
<script lang='ts'>
import Vue from 'vue';
import AdList from './components/list.vue';

export default Vue.extend({
	name: 'AdIndex',
	components: {
		AdList
	}
});
</script>
