<template>
  <div
    class="ng-input-wrapper"
    :class="[
      `ng-input--${size}`,
      {
        'ng-input--disabled': disabled,
        'ng-input--focused': isFocused,
      },
    ]"
  >
    <span v-if="$slots.prefix" class="ng-input__prefix">
      <slot name="prefix" />
    </span>

    <input
      class="ng-input"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
    />

    <button
      v-if="clearable && !!modelValue && !disabled"
      class="ng-input__clear"
      type="button"
      @click="onClear"
    >
      ×
    </button>

    <span v-if="$slots.suffix" class="ng-input__suffix">
      <slot name="suffix" />
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineOptions({ name: 'NgInput' });

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'change', 'clear', 'input']);

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入内容',
  },
  // input 类型
  type: {
    type: String,
    default: 'text',
  },
  // 尺寸：small / medium / large
  size: {
    type: String,
    default: 'medium',
    validator: (val) => ['small', 'medium', 'large'].includes(val),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否可一键清空
  clearable: {
    type: Boolean,
    default: true,
  },
});

const isFocused = ref(false);

const onInput = (event) => {
  const value = event.target.value;
  emit('update:modelValue', value);
  emit('input', value);
};

const onFocus = (event) => {
  isFocused.value = true;
  emit('focus', event);
};

const onBlur = (event) => {
  isFocused.value = false;
  emit('blur', event);
  emit('change', event.target.value);
};

const onClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style scoped>
.ng-input-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  background: rgba(5, 5, 9, 0.95);
  border-radius: 6px;
  border: 1px solid rgba(255, 215, 0, 0.25);
  padding: 0 8px;
  color: #f7f7f7;
  transition: all 0.2s ease;
  min-width: 180px;
}

.ng-input-wrapper:hover {
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.2);
}

.ng-input--focused {
  border-color: #ffd666;
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.35), 0 0 16px rgba(255, 215, 0, 0.3);
}

.ng-input--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.ng-input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-size: 14px;
  padding: 6px 4px;
}

.ng-input::placeholder {
  color: rgba(255, 255, 255, 0.35);
}

.ng-input__prefix,
.ng-input__suffix {
  display: inline-flex;
  align-items: center;
  color: rgba(255, 215, 0, 0.85);
  font-size: 13px;
}

.ng-input__prefix {
  margin-right: 4px;
}

.ng-input__suffix {
  margin-left: 4px;
}

.ng-input__clear {
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 14px;
  padding: 0 2px;
}

.ng-input__clear:hover {
  color: #fff1b8;
}

.ng-input--small .ng-input {
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 12px;
}

.ng-input--medium .ng-input {
  padding-top: 6px;
  padding-bottom: 6px;
}

.ng-input--large .ng-input {
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 15px;
}
</style>

