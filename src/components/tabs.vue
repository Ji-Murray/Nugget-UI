<template>
  <div class="ng-tabs" :class="[`ng-tabs--${type}`]">
    <div class="ng-tabs__nav">
      <div
        v-for="tab in items"
        :key="tab.key"
        class="ng-tabs__tab"
        :class="{
          'ng-tabs__tab--active': currentKey === tab.key,
          'ng-tabs__tab--disabled': tab.disabled,
        }"
        @click="onTabClick(tab)"
      >
        <slot name="tab" :tab="tab">
          {{ tab.label }}
        </slot>
      </div>
    </div>
    <div class="ng-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'NgTabs' });

const emit = defineEmits(['update:activeKey', 'change']);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  activeKey: {
    type: [String, Number],
    default: '',
  },
  type: {
    type: String,
    default: 'line', // line | card
  },
});

const currentKey = computed(() => {
  if (props.activeKey !== '' && props.activeKey !== undefined) return props.activeKey;
  return props.items[0]?.key;
});

const onTabClick = (tab) => {
  if (tab.disabled) return;
  if (tab.key === currentKey.value) return;
  emit('update:activeKey', tab.key);
  emit('change', tab.key);
};
</script>

<style scoped>
.ng-tabs {
  display: flex;
  flex-direction: column;
}

.ng-tabs__nav {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px;
  border-radius: 999px;
  background: radial-gradient(circle at top left, rgba(255, 215, 0, 0.12), rgba(0, 0, 0, 0.9));
  border: 1px solid rgba(255, 215, 0, 0.32);
  margin-bottom: 12px;
}

.ng-tabs__tab {
  position: relative;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  color: #d9d9d9;
  cursor: pointer;
  transition: all 0.18s ease;
}

.ng-tabs__tab:hover {
  color: #ffe58f;
}

.ng-tabs__tab--active {
  background: radial-gradient(circle at 30% 0, #ffd666, #ad6800);
  color: #050509;
  box-shadow: 0 0 18px rgba(255, 215, 0, 0.8);
  font-weight: 600;
}

.ng-tabs__tab--disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.ng-tabs__tab--disabled:hover {
  color: #d9d9d9;
}

.ng-tabs__content {
  padding-top: 4px;
}
</style>

