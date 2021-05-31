<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="名称"
        style="width: 200px; margin-right: 5px"
        class="filter-item"
        @keyup.enter="getList"
      />
      <el-select v-model="listQuery.type" placeholder="请选择类型" clearable>
        <el-option label="整柜" value="整柜" />
        <el-option label="散货" value="散货" />
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
        @click="getList"
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
        <el-table-column label="类型" align="center">
          <template #default="{ row }">
            <span>{{ row.type }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center">
          <template #default="{ row }">
            <span>{{ row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          width="230"
          class-name="small-padding fixed-width"
        >
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="handleUpdate(row)"
              >修改</el-button
            >
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
      v-model:currentPage="listQuery.page"
      v-model:page-siz="listQuery.limit"
    />

    <el-dialog
      :title="!dept.id ? '新增记录' : '修改记录'"
      v-model="dialogFormVisible"
    >
      <el-form
        ref="addDeptForm"
        :rules="rules"
        :model="dept"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 20px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="dept.name" />
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="dept.type" placeholder="请选择类型">
            <el-option label="整柜" value="整柜" />
            <el-option label="散货" value="散货" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="dept.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="hideDialog"> 取消 </el-button>
          <el-button
            type="primary"
            @click="
              !dept.id ? createOrUpdate('create') : createOrUpdate('update')
            "
          >
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination/index.vue";
import { getDepts, addDept, deleteDept, updateDept } from "@/api/dept";
import { defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { DeptProps, QueryDeptProps } from "@/interface/dept";
import { ElFormContext } from "@/interface/common";
import { ElMessageBox, ElNotification } from "element-plus";

export default defineComponent({
  name: "Dept",
  components: { Pagination },
  setup() {
    const rules = {
      name: [{ required: true, message: "请填写部门名称", trigger: "change" }],
      type: [{ required: true, message: "请选择类型", trigger: "change" }],
    };
    const addDeptForm = ref<ElFormContext>();
    let dialogFormVisible = ref(false);
    let total = ref(0);
    let listLoading = ref(false);
    let list = ref<Array<DeptProps>>([]);
    const listQuery = reactive<QueryDeptProps>({
      page: 1,
      limit: 10,
      name: "",
      type: "",
    });
    const defaultValue:DeptProps = {
      id: 0,
      name: "",
      type: "",
      remark: "",
    };
    let dept = reactive<DeptProps>({ ...defaultValue });
    onMounted(() => {
      getList();
    });

    const getList = async () => {
      listLoading.value = true;
      const res = await getDepts(listQuery);
      list.value = res.rows;
      total.value = res.total;
      listLoading.value = false;
    };

    const handleUpdate = (row: DeptProps) => {
      Object.keys(row).map(
        (v: string) => (dept[v] = row[v])
      );
      dialogFormVisible.value = true;
    };

    const handleDelete = async (row: DeptProps) => {
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
          const res = await deleteDept(row.id);
          if (res.affected) {
            ElNotification({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            getList();
          }
        }
      } catch (error) {}
    };

    const resetForm = () => {
      nextTick().then(() => {
        Object.keys(defaultValue).map((v)=> dept[v]= defaultValue[v])
      });
      if (addDeptForm.value) {
        addDeptForm.value.resetFields();
      }
    };

    const handleCreate = () => {
      resetForm();
      dialogFormVisible.value = true;
    };
    const hideDialog = () => {
      resetForm();
      dialogFormVisible.value = false;
    };
    type createOrUpdate = "create" | "update";
    const createOrUpdate = async (type: createOrUpdate) => {
      if (addDeptForm.value) {
        addDeptForm.value.validate(async (valid) => {
          if (valid) {
            if (type === "create") {
              const res = await addDept(dept);
              if (res) {
                refreshAfterCreateOrUpdate(type);
              }
            } else {
              const res = await updateDept(dept);
              if (res) {
                refreshAfterCreateOrUpdate(type);
              }
            }
          }
        });
      }
    };

    const refreshAfterCreateOrUpdate = (type: createOrUpdate) => {
      const msg = type === "create" ? "新增成功" : "修改成功";
      getList();
      dialogFormVisible.value = false;
      ElNotification({
        title: "成功",
        message: msg,
        type: "success",
        duration: 2000,
      });
    };

    return {
      hideDialog,
      addDeptForm,
      rules,
      dialogFormVisible,
      dept,
      listQuery,
      total,
      list,
      listLoading,
      handleUpdate,
      handleDelete,
      handleCreate,
      getList,
      createOrUpdate,
    };
  },
});
</script>

<style></style>
