<!--
 * @Description: 广告列表
 * @Author: sunwenlong
 * @Date: 2020-11-10 15:52:46
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 16:34:02
-->
<template>
	<div class=''>
		<template>
			<el-table
				:data="tableData"
				style="width: 100%"
			>
				<el-table-column
					prop="id"
					label="ID"
				>
				</el-table-column>
				<el-table-column
					prop="name"
					label="广告名称"
				>
				</el-table-column>
				<el-table-column label="广告位置">
					<template slot-scope="scope">
						{{getSpaceName(scope.row.spaceId)}}
					</template>
				</el-table-column>
				<el-table-column label="广告图片">
					<template slot-scope="scope">
						<img
							:src="scope.row.img"
							style="max-height: 90px;max-width: 100%"
							alt=""
						>
					</template>
				</el-table-column>
				<el-table-column label="时间">
					<template slot-scope="scope">
						开始时间：{{scope.row.startTimeFormatString}} <br />
						到期时间：{{scope.row.endTimeFormatString}}
					</template>
				</el-table-column>
				<el-table-column label="上线/下线">
					<template slot-scope="scope">
						<el-switch
							v-model="scope.row.status"
							:active-value="1"
							:inactive-value="0"
							active-color="#13ce66"
							inactive-color="#ff4949"
							@change="(v) => {onStatusChange(scope.row.id, v)}"
						></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="$router.push({name: 'advert-edit', params: {id: scope.row.id}})">编辑</el-button>
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
	getAdList,
	getAllSpace,
	changeAdStatus
} from "@/services/ad";

export default Vue.extend({
	name: "AdList",
	data() {
		return {
			isLoading: true,
			tableData: [],
			spacelist: []
		};
	},
	created() {
		this.loadAdlist();
		this.loadSpaceList();
	},
	methods: {
		async loadAdlist() {
			this.isLoading = true;
			const { data } = await getAdList();
			if (data.success) {
				this.tableData = data.content;
			}
			this.isLoading = false;
		},
		async loadSpaceList() {
			const { data } = await getAllSpace();
			if (data.success) {
				this.spacelist = data.content;
			}
		},
		getSpaceName(id: number | string) {
			const row: any = this.spacelist.find((l: any) => {
				return l.id === id;
			});
			if (row) {
				return row.name;
			}
			return "";
		},
		async onStatusChange(id: string|number, status: number) {
			this.isLoading = true;
			const { data } = await changeAdStatus(id, status);
			if (data.success) {
				this.$message.success('状态修改成功');
			} else {
				this.$message.error('状态修改失败');
			}
			this.isLoading = false;
		}
	}
});
</script>
