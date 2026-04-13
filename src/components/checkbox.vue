<template>
  <label
    class="ng-checkbox"
    :class="{
      'ng-checkbox--checked': isChecked,
      'ng-checkbox--disabled': disabled,
    }"
  >
    <span class="ng-checkbox__input">
      <span class="ng-checkbox__inner" />
    </span>
    <span class="ng-checkbox__label">
      <slot />
    </span>
    <input
      class="ng-checkbox__native"
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'NgCheckbox' });

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
});

const isChecked = computed(() => props.modelValue);

const onChange = (event) => {
  if (props.disabled) return;
  const next = event.target.checked;
  emit('update:modelValue', next);
  emit('change', next);
};
</script>

<style scoped>
.ng-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: #d9d9d9;
  user-select: none;
  gap: 6px;
}

.ng-checkbox__input {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 215, 0, 0.6);
  background: rgba(5, 5, 9, 0.9);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
}

.ng-checkbox__inner {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  background: transparent;
  transition: background 0.18s ease;
}

.ng-checkbox__label {
  line-height: 1.4;
}

.ng-checkbox__native {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ng-checkbox--checked .ng-checkbox__input {
  border-color: #ffd666;
  background: radial-gradient(circle at 30% 0, #ffd666, #ad6800);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
}

.ng-checkbox--checked .ng-checkbox__inner {
  background: #050509;
}

.ng-checkbox--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

