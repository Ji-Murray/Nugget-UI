<template>
  <div
    class="ng-table-wrapper"
    :class="[`ng-table--${size}`, { 'ng-table--bordered': bordered }]"
  >
    <table class="ng-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ width: col.width || 'auto', textAlign: col.align || 'left' }"
          >
            {{ col.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in dataSource"
          :key="getRowKey(row, rowIndex)"
          :class="[{ 'ng-table__row--striped': striped && rowIndex % 2 === 1 }]"
          @click="onRowClick(row, rowIndex)"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign: col.align || 'left' }"
          >
            {{ row[col.key] }}
          </td>
        </tr>
        <tr v-if="!dataSource || dataSource.length === 0">
          <td :colspan="columns.length" class="ng-table__empty">
            暂无数据
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineOptions({ name: 'NgTable' });

const emit = defineEmits(['row-click']);

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  dataSource: {
    type: Array,
    default: () => [],
  },
  striped: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val),
  },
  rowKey: {
    type: String,
    default: 'id',
  },
});

const getRowKey = (row, index) => {
  return row[props.rowKey] ?? index;
};

const onRowClick = (row, index) => {
  emit('row-click', row, index);
};
</script>

<style scoped>
.ng-table-wrapper {
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
  background: rgba(5, 5, 9, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.25);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.75);
}

.ng-table--bordered .ng-table {
  border-collapse: collapse;
}

.ng-table {
  width: 100%;
  border-spacing: 0;
  font-size: 13px;
  color: #f7f7f7;
}

.ng-table thead {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.14), rgba(0, 0, 0, 0.9));
}

.ng-table th,
.ng-table td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.14);
}

.ng-table th {
  font-weight: 500;
  color: #fff9e6;
  white-space: nowrap;
}

.ng-table tbody tr:last-child td {
  border-bottom: none;
}

.ng-table tbody tr {
  transition: background 0.18s ease;
  cursor: pointer;
}

.ng-table tbody tr:hover {
  background: rgba(255, 215, 0, 0.08);
}

.ng-table__row--striped {
  background: rgba(255, 255, 255, 0.02);
}

.ng-table__empty {
  text-align: center;
  padding: 18px 0;
  color: #bfbfbf;
}

.ng-table--small .ng-table th,
.ng-table--small .ng-table td {
  padding: 6px 10px;
  font-size: 12px;
}

.ng-table--large .ng-table th,
.ng-table--large .ng-table td {
  padding: 12px 14px;
  font-size: 14px;
}
</style>

