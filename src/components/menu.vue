<template>
  <ul
    class="ng-menu"
    :class="[`ng-menu--${mode}`]"
  >
    <li
      v-for="item in items"
      :key="item.key"
      class="ng-menu__item"
      :class="{
        'ng-menu__item--active': modelValue === item.key,
        'ng-menu__item--disabled': item.disabled,
      }"
      @click="onItemClick(item)"
    >
      <span class="ng-menu__label">
        <slot
          name="item"
          :item="item"
        >
          {{ item.label }}
        </slot>
      </span>
    </li>
  </ul>
</template>

<script setup>
defineOptions({ name: 'NgMenu' });

const emit = defineEmits(['update:modelValue', 'select']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  mode: {
    type: String,
    default: 'vertical',
    validator: (val) => ['vertical', 'horizontal'].includes(val),
  },
});

const onItemClick = (item) => {
  if (item.disabled) return;
  emit('update:modelValue', item.key);
  emit('select', item);
};
</script>

<style scoped>
.ng-menu {
  list-style: none;
  padding: 4px;
  margin: 0;
  border-radius: 8px;
  background: radial-gradient(circle at top left, rgba(255, 215, 0, 0.12), rgba(0, 0, 0, 0.95));
  border: 1px solid rgba(255, 215, 0, 0.28);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.85);
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
}

.ng-menu--horizontal {
  flex-direction: row;
}

.ng-menu__item {
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: #d9d9d9;
  cursor: pointer;
  transition: all 0.18s ease;
  min-width: 80px;
  text-align: left;
}

.ng-menu--horizontal .ng-menu__item {
  text-align: center;
}

.ng-menu__item:hover {
  background: rgba(255, 215, 0, 0.12);
  color: #ffe58f;
}

.ng-menu__item--active {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.38), rgba(0, 0, 0, 0.9));
  color: #050509;
  font-weight: 600;
  box-shadow: 0 0 14px rgba(255, 215, 0, 0.6);
}

.ng-menu__item--disabled {
  opacity: 0.4;
  cursor: not-allowed;
  box-shadow: none;
}

.ng-menu__item--disabled:hover {
  background: transparent;
  color: #d9d9d9;
}
</style>

