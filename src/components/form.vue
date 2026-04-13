<template>
  <form class="ng-form" @submit.prevent>
    <slot />
  </form>
</template>

<script setup>
import { defineExpose, provide, reactive } from 'vue';

defineOptions({ name: 'NgForm' });

const props = defineProps({
  model: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  labelWidth: {
    type: [String, Number],
    default: '90px',
  },
  // 'vertical' | 'horizontal'
  layout: {
    type: String,
    default: 'horizontal',
  },
});

const fields = reactive(new Set());

const addField = (fieldCtx) => {
  fields.add(fieldCtx);
};

const removeField = (fieldCtx) => {
  fields.delete(fieldCtx);
};

const validateField = async (prop) => {
  const target = Array.from(fields).find((f) => f.prop === prop);
  if (!target) return true;
  return target.validate();
};

const validate = async () => {
  const tasks = Array.from(fields).map((f) => f.validate());
  const results = await Promise.all(tasks);
  return results.every((ok) => ok);
};

const resetFields = () => {
  Array.from(fields).forEach((f) => f.reset());
};

provide('NgFormContext', {
  model: props.model,
  rules: props.rules,
  labelWidth: props.labelWidth,
  layout: props.layout,
  addField,
  removeField,
});

defineExpose({
  validate,
  validateField,
  resetFields,
});
</script>

<style scoped>
.ng-form {
  display: block;
}
</style>

