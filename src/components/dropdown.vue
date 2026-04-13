<template>
  <div
    class="ng-dropdown"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div
      class="ng-dropdown__trigger"
      @click="onTriggerClick"
    >
      <slot>
        <NgButton type="default" size="small">
          下拉菜单
        </NgButton>
      </slot>
    </div>

    <transition name="ng-dropdown-fade">
      <div
        v-if="open"
        class="ng-dropdown__overlay"
      >
        <slot name="overlay" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import NgButton from './button.vue';

defineOptions({ name: 'NgDropdown' });

const emit = defineEmits(['update:visible', 'visible-change']);

const props = defineProps({
  visible: {
    type: Boolean,
    default: undefined,
  },
  trigger: {
    type: String,
    default: 'hover',
    validator: (val) => ['hover', 'click'].includes(val),
  },
});

const innerVisible = ref(false);

const open = computed(() => {
  return props.visible !== undefined ? props.visible : innerVisible.value;
});

watch(
  () => props.visible,
  (val) => {
    if (val === undefined) return;
    innerVisible.value = !!val;
  },
);

const setOpen = (value) => {
  if (props.visible === undefined) {
    innerVisible.value = value;
  }
  emit('update:visible', value);
  emit('visible-change', value);
};

const onMouseEnter = () => {
  if (props.trigger !== 'hover') return;
  setOpen(true);
};

const onMouseLeave = () => {
  if (props.trigger !== 'hover') return;
  setOpen(false);
};

const onTriggerClick = () => {
  if (props.trigger !== 'click') return;
  setOpen(!open.value);
};
</script>

<style scoped>
.ng-dropdown {
  position: relative;
  display: inline-block;
}

.ng-dropdown__trigger {
  display: inline-block;
}

.ng-dropdown__overlay {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  z-index: 1000;
}

.ng-dropdown-fade-enter-active,
.ng-dropdown-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.ng-dropdown-fade-enter-from,
.ng-dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

