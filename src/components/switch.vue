<template>
  <button
    class="ng-switch"
    :class="{
      'ng-switch--checked': isChecked,
      'ng-switch--disabled': disabled,
      [`ng-switch--${size}`]: true,
    }"
    type="button"
    @click="onToggle"
  >
    <span class="ng-switch__inner">
      <span class="ng-switch__handle" />
    </span>
    <span v-if="showText" class="ng-switch__text">
      {{ isChecked ? checkedText : uncheckedText }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'NgSwitch' });

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'medium', // small | medium
  },
  checkedText: {
    type: String,
    default: 'ON',
  },
  uncheckedText: {
    type: String,
    default: 'OFF',
  },
  showText: {
    type: Boolean,
    default: false,
  },
});

const isChecked = computed(() => props.modelValue);

const onToggle = () => {
  if (props.disabled) return;
  const next = !props.modelValue;
  emit('update:modelValue', next);
  emit('change', next);
};
</script>

<style scoped>
.ng-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 12px;
  color: #d9d9d9;
}

.ng-switch__inner {
  position: relative;
  width: 34px;
  height: 18px;
  border-radius: 999px;
  background: #1f1f1f;
  border: 1px solid #434343;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  transition: all 0.18s ease;
}

.ng-switch__handle {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #f7f7f7;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  transition: all 0.18s ease;
}

.ng-switch--checked .ng-switch__inner {
  background: radial-gradient(circle at 30% 0, #ffd666, #ad6800);
  border-color: #ffd666;
}

.ng-switch--checked .ng-switch__handle {
  transform: translateX(16px);
  background: #050509;
}

.ng-switch__text {
  font-size: 12px;
}

.ng-switch--small .ng-switch__inner {
  width: 30px;
  height: 16px;
}

.ng-switch--small .ng-switch__handle {
  width: 12px;
  height: 12px;
}

.ng-switch--small.ng-switch--checked .ng-switch__handle {
  transform: translateX(14px);
}

.ng-switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

