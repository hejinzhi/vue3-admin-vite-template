<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="名称"
        style="width: 200px; margin-right: 5px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />

      <el-input
        v-model="listQuery.tel"
        placeholder="手机号码"
        style="width: 200px; margin-right: 5px"
        class="filter-item"
        @keyup.enter="handleFilter"
      />

      <el-select
        v-model="listQuery.deptId"
        placeholder="请选择部门"
        clearable
        style="width: 200px; margin-right: 5px"
      >
        <el-option
          v-for="item in deptList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>

      <el-select v-model="listQuery.role" placeholder="请选择角色" clearable>
        <el-option label="业务经理" value="业务经理" />
        <el-option label="业务员" value="业务员" />
        <el-option label="操作员" value="操作员" />
        <el-option label="出纳" value="出纳" />
        <el-option label="会计" value="会计" />
        <el-option label="管理员" value="管理员" />
      </el-select>

      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        添加
      </el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
        >搜索</el-button
      >
    </div>

    <div style="margin-top: 20px">
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
        size="mini"
      >
        <el-table-column label="名称" align="center">
          <template #default="{ row }">
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template #default="{ row }">
            <span>{{ row.tel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="部门" align="center">
          <template #default="{ row }">
            <span>{{ row.dept.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="角色" align="center">
          <template #default="{ row }">
            <span>{{ row.role }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="230"
          class-name="small-padding fixed-width"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination
      v-show="total > 0"
      :total="total"
      @pagination="getPersonList"
      v-model:currentPage="listQuery.page"
      v-model:page-siz="listQuery.limit"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import Pagination from "@/components/Pagination/index.vue";

import { deletePerson, getPerson } from "@/api/user";
import { PersonListProps, QueryPersonProps } from "@/interface/user";
import { getDepts } from "@/api/dept";
import { DeptProps } from "@/interface/dept";
import { ElMessageBox, ElNotification } from "element-plus";

export default defineComponent({
  name: "Person",
  components: {
    Pagination,
  },
  setup() {
    let listLoading = ref(false);
    let total = ref(0);
    let personList = ref<Array<PersonListProps>>([]);
    let deptList = ref<Array<DeptProps>>([]);
    const listQuery = reactive<QueryPersonProps>({
      page: 1,
      limit: 10,
      name: "",
      tel: "",
      deptId: "",
      role: "",
    });
    onMounted(async () => {
      const pro1 = getDepts();
      const pro2 = getPerson(listQuery);
      const res = await Promise.all([pro1, pro2]);
      deptList.value = res[0].rows;
      personList.value = res[1].rows;
      total.value = res[1].total;
    });

    const handleFilter = async () => {
      getPersonList();
    };

    const getPersonList = async () => {
      listLoading.value = true;
      const res = await getPerson(listQuery);
      listLoading.value = false;
      personList.value = res.rows;
      total.value = res.total;
    };
    const handleCreate = () => {};

    const handleDelete = async (row: PersonListProps) => {
      try {
        const confirmRes = await ElMessageBox.confirm(
          "确定要删除这笔记录吗?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }
        );
        if (confirmRes) {
          const res = await deletePerson(row.id);
          if (res.affected) {
            ElNotification({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            getPersonList();
          }
        }
      } catch (error) {}
    };
    return {
      listLoading,
      total,
      deptList,
      list: personList,
      getPersonList,
      handleFilter,
      handleCreate,
      handleDelete,
      listQuery,
    };
  },
});
</script>

<style scoped>
.my-form {
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
}
.power-desc {
  line-height: 30px;
}
.one-power-container {
  width: 350px;
  margin-right: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin-bottom: 10px;
}
.power-container {
  display: flex;
  flex-wrap: wrap;
}
.my-input {
  width: 150px;
}
</style>
