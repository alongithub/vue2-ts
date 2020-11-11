<!--
 * @Description: home
 * @Author: sunwenlong
 * @Date: 2020-10-30 14:01:25
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 19:10:35
-->
<template>
	<div class=''>Home</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from 'vue';
export default Vue.extend({
	name: "HomeIndex",
	created() {
		this.$router.push({ name: 'user' });
	}
});
</script>
