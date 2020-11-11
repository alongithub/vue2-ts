<!--
 * @Description: 广告位列表
 * @Author: sunwenlong
 * @Date: 2020-11-10 15:52:46
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 17:21:17
-->
<template>
	<div class=''>
		<template>
			<el-table
				:data="tableData"
				style="width: 100%"
			>
				<el-table-column
					prop="spaceKey"
					label="spaceKey"
				>
				</el-table-column>
				<el-table-column
					prop="name"
					label="广告位名称"
				>
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope="scope">
						{{scope.row.createTime|timeFormat}} <br />
					</template>
				</el-table-column>
				<el-table-column label="更新时间">
					<template slot-scope="scope">
						{{scope.row.updateTime|timeFormat}} <br />
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="$router.push({name: 'advert-space-edit', params: {id: scope.row.id}})">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	</div>
</template>
<style lang='scss' scoped></style>
<script lang='ts'>
import Vue from "vue";
import {
	getAllSpace
} from "@/services/ad";

export default Vue.extend({
	name: "AdList",
	data() {
		return {
			isLoading: true,
			tableData: []
		};
	},
	created() {
		this.loadSpaceList();
	},
	methods: {
		async loadSpaceList() {
			this.isLoading = true;
			const { data } = await getAllSpace();
			if (data.success) {
				this.tableData = data.content;
			}
			this.isLoading = false;
		}
	}
});
</script>
