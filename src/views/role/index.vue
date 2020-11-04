<template>
	<div class='advert'>
		<role-list />
	</div>
</template>
<script>
import Vue from 'vue';
import RoleList from './components/list.vue';

export default Vue.extend({
	components: {
		RoleList
	},
	name: "RoleIndex"
});
</script>
<style lang="scss" scoped></style>
