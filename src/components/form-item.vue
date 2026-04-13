<template>
  <div class="ng-form-item" :class="[`ng-form-item--${formLayout}`, statusClass]">
    <label
      v-if="label"
      class="ng-form-item__label"
      :style="labelStyle"
    >
      {{ label }}
    </label>
    <div class="ng-form-item__control">
      <slot />
      <div v-if="validateStatus === 'error'" class="ng-form-item__message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';

defineOptions({ name: 'NgFormItem' });

const props = defineProps({
  prop: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: undefined,
  },
});

const form = inject('NgFormContext', null);

const validateStatus = ref('');
const validateMessage = ref('');
const initialValue = ref();

const formLayout = computed(() => form?.layout || 'horizontal');

const labelStyle = computed(() => {
  if (formLayout.value === 'vertical') return {};
  const width =
    typeof form?.labelWidth === 'number' ? `${form.labelWidth}px` : form?.labelWidth || '90px';
  return { width };
});

const statusClass = computed(() => {
  if (validateStatus.value === 'error') return 'ng-form-item--error';
  if (validateStatus.value === 'success') return 'ng-form-item--success';
  return '';
});

const getRules = () => {
  if (!form || !props.prop) return [];
  const allRules = form.rules?.[props.prop] || [];
  return Array.isArray(allRules) ? allRules : [allRules];
};

const getValue = () => {
  if (!form || !props.prop) return undefined;
  return form.model?.[props.prop];
};

const doValidate = () => {
  const rules = getRules();
  if (!rules.length && props.required === undefined) {
    validateStatus.value = '';
    validateMessage.value = '';
    return true;
  }

  const value = getValue();
  let mergedRequired = props.required;

  for (const rule of rules) {
    if (typeof rule.required === 'boolean') mergedRequired = rule.required;
    if (mergedRequired && (value === '' || value === undefined || value === null)) {
      validateStatus.value = 'error';
      validateMessage.value = rule.message || `${props.label || props.prop} 为必填项`;
      return false;
    }
    if (rule.min != null && typeof value === 'string' && value.length < rule.min) {
      validateStatus.value = 'error';
      validateMessage.value =
        rule.message || `${props.label || props.prop} 长度不能小于 ${rule.min}`;
      return false;
    }
    if (rule.max != null && typeof value === 'string' && value.length > rule.max) {
      validateStatus.value = 'error';
      validateMessage.value =
        rule.message || `${props.label || props.prop} 长度不能大于 ${rule.max}`;
      return false;
    }
    if (typeof rule.validator === 'function') {
      const res = rule.validator(value, form?.model || {});
      if (res === false) {
        validateStatus.value = 'error';
        validateMessage.value = rule.message || `${props.label || props.prop} 校验失败`;
        return false;
      }
    }
  }

  validateStatus.value = value === '' || value == null ? '' : 'success';
  validateMessage.value = '';
  return true;
};

const validate = () => {
  if (!props.prop) return true;
  return doValidate();
};

const reset = () => {
  if (!props.prop || !form) return;
  form.model[props.prop] = initialValue.value;
  validateStatus.value = '';
  validateMessage.value = '';
};

if (form && props.prop) {
  initialValue.value = getValue();
}

onMounted(() => {
  if (form && props.prop) {
    form.addField?.({ prop: props.prop, validate, reset });
  }
});

onBeforeUnmount(() => {
  if (form && props.prop) {
    form.removeField?.({ prop: props.prop, validate, reset });
  }
});

watch(
  () => getValue(),
  () => {
    // 简单策略：值变化时清空错误，提交时统一验证
    if (validateStatus.value === 'error') {
      validateStatus.value = '';
      validateMessage.value = '';
    }
  },
);

defineExpose({
  validate,
  reset,
});
</script>

<style scoped>
.ng-form-item {
  display: flex;
  margin-bottom: 16px;
  font-size: 13px;
  color: #f7f7f7;
}

.ng-form-item--vertical {
  flex-direction: column;
}

.ng-form-item__label {
  padding: 4px 8px 4px 0;
  box-sizing: border-box;
  text-align: right;
  color: #d9d9d9;
  line-height: 1.6;
}

.ng-form-item--vertical .ng-form-item__label {
  text-align: left;
  width: auto !important;
  padding-bottom: 4px;
}

.ng-form-item__control {
  flex: 1;
  min-width: 0;
}

.ng-form-item__message {
  margin-top: 4px;
  font-size: 12px;
  color: #ff7875;
}

.ng-form-item--error .ng-form-item__control :deep(.ng-input-wrapper),
.ng-form-item--error .ng-form-item__control :deep(.ng-select-wrapper) {
  border-color: #ff4d4f;
  box-shadow: 0 0 0 1px rgba(255, 77, 79, 0.55);
}

.ng-form-item--success .ng-form-item__control :deep(.ng-input-wrapper),
.ng-form-item--success .ng-form-item__control :deep(.ng-select-wrapper) {
  border-color: #52c41a;
}
</style>

