<!--
 * @Description: 课程章节
 * @Author: sunwenlong
 * @Date: 2020-11-09 13:59:21
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 10:25:43
-->
<template>
	<div class=''>
		<el-card>
			<div
				slot="header"
				class="header"
			>
				<span>
					标题
				</span>
				<el-button
					type="primary"
					@click="dialogVisible=true;"
				>
					添加阶段
				</el-button>
			</div>
			<el-tree
				:data="sections"
				:props="defaultProps"
				draggable
				:allow-drop="handleAllowDrop"
				@node-drop="handleSort"
			>
				<div
					slot-scope="{node, data}"
					class="inner"
				>
					<span>{{node.label}}</span>
					<span
						v-if="data.sectionName"
						class="actions"
					>
						<el-button @click="dialogVisible=true;isEdit=true;editSectionId=node.id">编辑</el-button>
						<el-button style="background: #328eeb;color: #fff;">添加阶段</el-button>
						<el-select
							style="margin-left: 10px; width: 100px"
							v-model="data.status"
							placeholder="请选择"
							@change="(v) => {changeStatus(data.id, v)}"
						>
							<el-option
								:key="0"
								label="隐藏"
								:value="0"
							>
							</el-option>
							<el-option
								:key="1"
								label="待更新"
								:value="1"
							>
							</el-option>
							<el-option
								:key="2"
								label="已发布"
								:value="2"
							>
							</el-option>
						</el-select>
					</span>
					<span
						v-else
						calss="actions"
						class="actions"
					>
						<el-button @click="dialogVisible=true;isEdit=true;editSectionId=node.id">编辑</el-button>
						<el-button
							style="background: green;color: #fff;"
							@click="$router.push({
								name: 'course-video',
								params: {courseId},
								query: {
									sectionId: node.parent.id,
									lessonId: data.id
								}
							})"
						>上传视频</el-button>
						<el-select
							style="margin-left: 10px; width: 100px"
							v-model="data.status"
							placeholder="请选择"
							@change="(v) => {changeStatus(data.id, v)}"
						>
							<el-option
								:key="0"
								label="隐藏"
								:value="0"
							>
							</el-option>
							<el-option
								:key="1"
								label="待更新"
								:value="1"
							>
							</el-option>
							<el-option
								:key="2"
								label="已发布"
								:value="2"
							>
							</el-option>
						</el-select>
					</span>
				</div>
			</el-tree>

		</el-card>
		<el-dialog
			:title="isEdit ? '编辑课程阶段' : '添加课程阶段'"
			:visible.sync="dialogVisible"
			width="30%"
			:before-close="closeDialog"
		>
			<section-add-or-update
				v-if="dialogVisible"
				:isEdit="isEdit"
				:sectionId="editSectionId"
			/>
		</el-dialog>
	</div>
</template>
<style lang='scss' scoped>
.header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}
.inner {
	flex: 1;
	display: flex;
	padding: 10px;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #ebeef5;
}
::v-deep .el-tree-node__content {
	height: auto;
}
</style>
<script lang='ts'>
import Vue from "vue";
import {
	getCourseSection,
	saveCourseSection,
	saveCourseLession
} from "@/services/course-section";
import SectionAddOrUpdate from "./components/sectionAddOrUpdate.vue";

export default Vue.extend({
	components: {
		SectionAddOrUpdate
	},
	name: "CourseSection",
	props: {
		courseId: {
			type: [String, Number],
			required: true
		}
	},
	created() {
		this.loadSection();
	},
	data() {
		return {
			dialogVisible: false,
			sections: [],
			isEdit: false,
			editSectionId: "",
			defaultProps: {
				children: "lessonDTOS",
				label: (data: any) => {
					return data.sectionName || data.theme;
				}
			}
		};
	},
	methods: {
		async loadSection() {
			const { data } = await getCourseSection(this.courseId);
			this.sections = data.data;
		},
		closeDialog() {
			this.dialogVisible = false;
			this.isEdit = false;
			this.editSectionId = "";
		},
		async changeStatus(
			sectionId: number | string,
			status: string | number
		) {
			const { data } = await saveCourseSection({
				id: sectionId,
				status
			});
			if (data.code === "000000") {
				this.$message.success("修改成功");
			} else {
				this.$message.error("修改失败");
			}
		},
		handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
			// draggingNode 拖动的节点
			// dropNode 要放置的目标节点
			// type prev inner next 分别表示目标节点前 目标节点中，目标节点后
			return (
				draggingNode.data.sectionId === dropNode.data.sectionId &&
				type !== "inner"
			);
		},
		async handleSort(dragNode: any, dropNode: any, type: any, event: any) {
			try {
				// 拖拽是改变排序
				// dropNode.parent.childNodes 拿到需要排序的集合
				await Promise.all(
					dropNode.parent.childNodes.map(
						(item: any, index: number) => {
							if (dragNode.data.lessonDTOS) {
								// 阶段 排序
								return saveCourseSection({
									id: item.data.id,
									orderNum: index + 1
								});
							} else {
								// 课时 排序
								return saveCourseLession({
									id: item.data.id,
									orderNum: index + 1
								});
							}
						}
					)
				);
				this.$message.success("操作成功");
			} catch (err) {
				this.$message.error("操作失败");
			}
		}
	}
});
</script>
