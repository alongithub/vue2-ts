<!--
 * @Description: 添加菜单
 * @Author: sunwenlong
 * @Date: 2020-11-02 16:53:37
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-03 09:53:08
-->
<template>
	<div class='menu-create'>
		<create-or-edit/>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
import CreateOrEdit from './components/createOrEdit.vue';

export default Vue.extend({
	components: {
		CreateOrEdit
	},
	name: "menu-create",
	data() {
		return {
		};
	}
});
</script>
