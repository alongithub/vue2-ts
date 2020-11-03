<template>
	<div class='menu'>
		<el-card class="box-card">
			<div
				slot="header"
				class="clearfix"
			>
				<el-button @click="$router.push({name: 'menu-create'})">添加</el-button>
				<el-button
					style="float: right; padding: 3px 0"
					type="text"
				>操作按钮</el-button>
			</div>
			<el-table
				:data="menus"
				style="width: 100%"
			>
				<el-table-column
					type="index"
					label="编号"
				>
				</el-table-column>
				<el-table-column
					prop="name"
					label="菜单名称"
				></el-table-column>
				<el-table-column
					prop="level"
					label="菜单级数"
				>
				</el-table-column>
				<el-table-column
					prop="icon"
					label="前端图标"
				>
				</el-table-column>
				<el-table-column
					prop="orderNum"
					label="排序"
				>
				</el-table-column>
				<el-table-column
					label="操作"
					min-width="50"
				>
					<template slot-scope="scope">
						<el-button
							size="mini"
							@click="handleEdit(scope.$index, scope.row)"
						>编辑</el-button>
						<el-button
							size="mini"
							@click="handleDelete(scope.$index, scope.row)"
						>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

	</div>
</template>
<script lang="ts">
import Vue from "vue";
import { getAll, deleteMenu } from "@/services/menu";

export default Vue.extend({
	name: "MenuIndex",
	data() {
		return {
			menus: []
		};
	},
	created() {
		this.loadAllMenus();
	},
	methods: {
		async loadAllMenus() {
			const { data } = await getAll();
			if (data.code === "000000") {
				this.menus = data.data;
			}
		},
		handleDelete(index: number, item: any) {
			this.$confirm('确认删除吗，是否继续?', '删除提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(async () => {
				const { data } = await deleteMenu(item.id);
				if (data.code === '000000') {
					this.$message.success('删除成功');
					this.loadAllMenus();
				}
			}).catch(() => {
				this.$message.info('取消删除');
			});
		},
		handleEdit(index: number, item: any) {
			this.$router.push({
				name: 'menu-edit',
				params: {
					id: item.id
				}
			});
		}
	}
});
</script>
<style lang="scss" scoped>
</style>
