<template>
  <button
    class="ng-button"
    :class="[`ng-button--${type}`, `ng-button--${size}`]"
    @click="$emit('click', $event)"
  >
    <slot>默认按钮</slot>
  </button>
</template>

<script setup>
import { defineEmits } from 'vue';

defineOptions({ name: 'NgButton' });

const emits = defineEmits(['click']);

defineProps({
  // 按钮类型：primary / success / warning / danger / default
  type: {
    type: String,
    default: 'primary',
    validator: (val) =>
      ['primary', 'success', 'warning', 'danger', 'default'].includes(val),
  },
  // 按钮尺寸：small / medium / large
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val),
  },
});


</script>

<style scoped>
.ng-button {
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}
.ng-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.ng-button--primary {
  background: #409eff;
  border-color: #409eff;
}

.ng-button--success {
  background: #52c41a;
  border-color: #52c41a;
}

.ng-button--warning {
  background: #faad14;
  border-color: #faad14;
  color: #1f1f1f;
}

.ng-button--danger {
  background: #ff4d4f;
  border-color: #ff4d4f;
}

.ng-button--default {
  background: #1f1f1f;
  border-color: #434343;
  color: #f0f0f0;
}
.ng-button--small {
  padding: 4px 8px;
}
.ng-button--medium {
  padding: 6px 12px;
}
.ng-button--large {
  padding: 8px 16px;
}
</style>