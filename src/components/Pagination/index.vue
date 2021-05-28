<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="page"
      v-model:page-size="limit"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { scrollTo } from "@/utils/scroll-to";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 50],
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const handleSizeChange = (val: number) => {
      context.emit("pagination", { page: props, limit: val });
      if (props.autoScroll) {
        scrollTo(0, 800, null);
      }
    };

    const handleCurrentChange = (val: number) => {
      context.emit("pagination", { page: val, limit: props.limit });
      if (props.autoScroll) {
        scrollTo(0, 800, null);
      }
    };

    return {
      handleCurrentChange,
      handleSizeChange,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
