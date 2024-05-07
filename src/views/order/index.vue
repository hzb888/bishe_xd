<script setup lang="ts">
import { getUserList } from "@/api/bishe";
import { ref, onMounted, nextTick } from "vue";
import Delete from "@iconify-icons/ep/delete";
import Menu from "@iconify-icons/ep/menu";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRole } from "./utils/hook";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen"
import { useRenderIcon } from "@/components/ReIcon/src/hooks";;

import {
  delay,
  subBefore,
  deviceDetection,
  useResizeObserver
} from "@pureadmin/utils";

defineOptions({
  name: "Welcome"
});
const treeRef = ref();
const {
  form,
  isShow,
  curRow,
  loading,
  columns,
  rowStyle,
  dataList,
  treeData,
  treeProps,
  isLinkage,
  pagination,
  isExpandAll,
  isSelectAll,
  treeSearchValue,
  // buttonClass,
  onSearch,
  resetForm,
  openDialog,
  handleMenu,
  handleSave,
  handleDelete,
  filterMethod,
  transformI18n,
  onQueryChanged,
  // handleDatabase,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange
} = useRole(treeRef);


</script>

<template>
  <div>
    <PureTableBar :class="[isShow && !deviceDetection() ? '!w-[60vw]' : 'w-full']"
      style="transition: width 220ms cubic-bezier(0.4, 0, 0.2, 1)" title="全部运动数据" :columns="columns"
      @refresh="onSearch">
      <template #buttons>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table ref="tableRef" align-whole="center" showOverflowTooltip table-layout="auto" :loading="loading"
          :size="size" adaptive :row-style="rowStyle" :adaptiveConfig="{ offsetBottom: 108 }" :data="dataList"
          :columns="dynamicColumns" :header-cell-style="{
      background: 'var(--el-fill-color-light)',
      color: 'var(--el-text-color-primary)'
    }" @selection-change="handleSelectionChange" @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange">
          <template #operation="{ row }">
            <el-popconfirm :title="`是否确认删除运动名称为${row.name}的这条数据`" @confirm="handleDelete(row)">
              <template #reference>
                <el-button class="reset-margin" link type="primary" :size="size" :icon="useRenderIcon(Delete)">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>
