<template>
	<div class='advert'>
		<resource-list />
	</div>
</template>
<script lang="ts">
import Vue from 'vue';
import ResourceList from './components/list.vue';

export default Vue.extend({
	components: {
		ResourceList
	},
	name: "AdvertIndex"
});
</script>
<style lang="scss" scoped></style>
