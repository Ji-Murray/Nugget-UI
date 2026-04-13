<template>
  <div class="ng-select-wrapper" @click="toggleOpen">
    <div
      class="ng-select"
      :class="{
        'ng-select--open': open,
        'ng-select--disabled': disabled,
      }"
    >
      <span class="ng-select__value">
        {{ selectedLabel || placeholder }}
      </span>
      <span class="ng-select__arrow">▼</span>
    </div>

    <transition name="ng-select-fade">
      <ul
        v-if="open"
        class="ng-select__dropdown"
      >
        <li
          v-for="opt in options"
          :key="opt.value"
          class="ng-select__option"
          :class="{ 'ng-select__option--active': opt.value === modelValue }"
          @click.stop="onSelect(opt.value)"
        >
          {{ opt.label }}
        </li>
        <li v-if="!options.length" class="ng-select__empty">暂无选项</li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

defineOptions({ name: 'NgSelect' });

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: undefined,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '请选择',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const open = ref(false);

const selectedLabel = computed(() => {
  const found = props.options.find((opt) => opt.value === props.modelValue);
  return found?.label ?? '';
});

const toggleOpen = () => {
  if (props.disabled) return;
  open.value = !open.value;
};

const onSelect = (value) => {
  if (value === props.modelValue) {
    open.value = false;
    return;
  }
  emit('update:modelValue', value);
  emit('change', value);
  open.value = false;
};
</script>

<style scoped>
.ng-select-wrapper {
  position: relative;
  display: inline-block;
  min-width: 160px;
}

.ng-select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(5, 5, 9, 0.95);
  border: 1px solid rgba(255, 215, 0, 0.25);
  color: #f7f7f7;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.18s ease;
}

.ng-select:hover {
  border-color: rgba(255, 215, 0, 0.6);
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.25);
}

.ng-select--open {
  border-color: #ffd666;
  box-shadow: 0 0 0 1px rgba(255, 215, 0, 0.4), 0 0 12px rgba(255, 215, 0, 0.4);
}

.ng-select__value {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ng-select__arrow {
  font-size: 10px;
  color: #ffd666;
}

.ng-select__dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 220px;
  overflow: auto;
  background: rgba(5, 5, 9, 0.98);
  border-radius: 8px;
  border: 1px solid rgba(255, 215, 0, 0.3);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.85);
  padding: 4px 0;
  list-style: none;
  z-index: 1000;
}

.ng-select__option {
  padding: 6px 12px;
  font-size: 13px;
  color: #d9d9d9;
  cursor: pointer;
  transition: all 0.18s ease;
}

.ng-select__option:hover {
  background: rgba(255, 215, 0, 0.12);
  color: #ffe58f;
}

.ng-select__option--active {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.36), rgba(0, 0, 0, 0.9));
  color: #050509;
}

.ng-select__empty {
  padding: 6px 12px;
  font-size: 12px;
  color: #8c8c8c;
}

.ng-select-fade-enter-active,
.ng-select-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ng-select-fade-enter-from,
.ng-select-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.ng-select--disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}
</style>

