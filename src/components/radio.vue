<template>
  <label
    class="ng-radio"
    :class="{
      'ng-radio--checked': isChecked,
      'ng-radio--disabled': disabled,
    }"
  >
    <span class="ng-radio__input">
      <span class="ng-radio__inner" />
    </span>
    <span class="ng-radio__label">
      <slot />
    </span>
    <input
      class="ng-radio__native"
      type="radio"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
    />
  </label>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({ name: 'NgRadio' });

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: null,
  },
  label: {
    type: [String, Number, Boolean],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const isChecked = computed(() => props.modelValue === props.label);

const onChange = () => {
  if (props.disabled) return;
  emit('update:modelValue', props.label);
  emit('change', props.label);
};
</script>

<style scoped>
.ng-radio {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 13px;
  color: #d9d9d9;
  user-select: none;
  gap: 6px;
}

.ng-radio__input {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255, 215, 0, 0.6);
  background: rgba(5, 5, 9, 0.9);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
}

.ng-radio__inner {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.18s ease;
}

.ng-radio__label {
  line-height: 1.4;
}

.ng-radio__native {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.ng-radio--checked .ng-radio__input {
  border-color: #ffd666;
  background: radial-gradient(circle at 30% 0, #ffd666, #ad6800);
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
}

.ng-radio--checked .ng-radio__inner {
  background: #050509;
}

.ng-radio--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

