<template>
	<el-card>
			<div slot="header" class="header">
				<span>广告位列表</span>
				<el-button @click="$router.push({name: 'advert-space-create'})">添加广告</el-button>
			</div>
			<ad-space-list/>
		</el-card>
</template>
<script>
import Vue from 'vue';
import AdSpaceList from './components/list.vue';
export default Vue.extend({
	components: {
		AdSpaceList
	},
	name: "AdvertSpaceIndex"
});
</script>
<style lang="scss" scoped></style>
