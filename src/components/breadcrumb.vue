<template>
  <nav class="ng-breadcrumb">
    <ol class="ng-breadcrumb__list">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="ng-breadcrumb__item"
      >
        <span
          class="ng-breadcrumb__link"
          :class="{ 'ng-breadcrumb__link--last': index === items.length - 1 }"
          @click="onItemClick(item, index)"
        >
          <slot name="item" :item="item" :index="index">
            {{ item.label }}
          </slot>
        </span>
        <span v-if="index !== items.length - 1" class="ng-breadcrumb__separator">
          <slot name="separator">/</slot>
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
defineOptions({ name: 'NgBreadcrumb' });

const emit = defineEmits(['item-click']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const onItemClick = (item, index) => {
  if (index === props.items.length - 1) return;
  emit('item-click', item, index);
};
</script>

<style scoped>
.ng-breadcrumb {
  font-size: 12px;
  color: #bfbfbf;
}

.ng-breadcrumb__list {
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  gap: 4px;
}

.ng-breadcrumb__item {
  display: inline-flex;
  align-items: center;
}

.ng-breadcrumb__link {
  cursor: pointer;
  transition: color 0.18s ease;
}

.ng-breadcrumb__link:hover {
  color: #ffd666;
}

.ng-breadcrumb__link--last {
  cursor: default;
  color: #f7f7f7;
}

.ng-breadcrumb__link--last:hover {
  color: #f7f7f7;
}

.ng-breadcrumb__separator {
  color: #595959;
  padding: 0 2px;
}
</style>

