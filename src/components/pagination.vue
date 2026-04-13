<template>
  <div class="ng-pagination">
    <button
      class="ng-pagination__btn"
      :disabled="currentPage <= 1"
      @click="changePage(currentPage - 1)"
    >
      上一页
    </button>

    <span class="ng-pagination__pages">
      第 {{ currentPage }} / {{ totalPages }} 页
    </span>

    <button
      class="ng-pagination__btn"
      :disabled="currentPage >= totalPages"
      @click="changePage(currentPage + 1)"
    >
      下一页
    </button>

    <span v-if="showTotal" class="ng-pagination__total">
      共 {{ total }} 条
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'NgPagination' });

const emit = defineEmits(['update:current', 'change']);

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  current: {
    type: Number,
    default: 1,
  },
  showTotal: {
    type: Boolean,
    default: true,
  },
});

const totalPages = computed(() => {
  if (!props.total || !props.pageSize) return 1;
  return Math.max(1, Math.ceil(props.total / props.pageSize));
});

const currentPage = computed(() => {
  return Math.min(Math.max(1, props.current || 1), totalPages.value);
});

const changePage = (page) => {
  const next = Math.min(Math.max(1, page), totalPages.value);
  if (next === currentPage.value) return;
  emit('update:current', next);
  emit('change', next);
};
</script>

<style scoped>
.ng-pagination {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #d9d9d9;
}

.ng-pagination__btn {
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255, 215, 0, 0.5);
  background: rgba(5, 5, 9, 0.9);
  color: #ffd666;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.18s ease;
}

.ng-pagination__btn:hover:not(:disabled) {
  background: radial-gradient(circle at 20% 0, #ffd666, #ad6800);
  color: #050509;
  box-shadow: 0 0 12px rgba(255, 215, 0, 0.7);
}

.ng-pagination__btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.ng-pagination__pages {
  color: #bfbfbf;
}

.ng-pagination__total {
  color: #8c8c8c;
}
</style>

