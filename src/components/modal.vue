<template>
  <Teleport to="body">
    <transition name="ng-modal-fade">
      <div v-if="visible" class="ng-modal-mask" @click="onMaskClick">
        <div
          class="ng-modal"
          :style="{ width }"
          @click.stop
        >
          <header class="ng-modal__header" v-if="hasHeader">
            <slot name="header">
              <span class="ng-modal__title">{{ title }}</span>
            </slot>
            <button v-if="closable" class="ng-modal__close" @click="close">
              ×
            </button>
          </header>

          <section class="ng-modal__body">
            <slot>这里是内容区域</slot>
          </section>

          <footer class="ng-modal__footer" v-if="hasFooter">
            <slot name="footer">
              <NgButton size="small" type="default" @click="onCancel">取消</NgButton>
              <NgButton size="small" type="primary" @click="onConfirm">确定</NgButton>
            </slot>
          </footer>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, watch } from 'vue';
import NgButton from './button.vue';

defineOptions({ name: 'NgModal' });

const emits = defineEmits(['update:modelValue', 'open', 'close', 'confirm', 'cancel']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '提示',
  },
  width: {
    type: String,
    default: '520px',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  maskClosable: {
    type: Boolean,
    default: true,
  },
  hideHeader: {
    type: Boolean,
    default: false,
  },
  hideFooter: {
    type: Boolean,
    default: false,
  },
});

const visible = computed(() => props.modelValue);
const hasHeader = computed(() => !props.hideHeader);
const hasFooter = computed(() => !props.hideFooter);

// 监听 modelValue 变化，触发 open/close 事件
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      emits('open');
    }
  }
);

const close = () => {
  emits('update:modelValue', false);
  emits('close');
};

const onMaskClick = () => {
  if (props.maskClosable) {
    close();
  }
};

const onConfirm = () => {
  emits('confirm');
  close();
};

const onCancel = () => {
  emits('cancel');
  close();
};
</script>

<style scoped>
.ng-modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.ng-modal {
  background: #0d0d0f;
  border: 1px solid rgba(255, 215, 0, 0.25);
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
  overflow: hidden;
  color: #f7f7f7;
  transform-origin: center;
}

.ng-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.16), rgba(0, 0, 0, 0.75));
  border-bottom: 1px solid rgba(255, 215, 0, 0.18);
}

.ng-modal__title {
  font-size: 16px;
  font-weight: 600;
}

.ng-modal__close {
  background: transparent;
  border: none;
  color: #ffd666;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  line-height: 1;
}

.ng-modal__close:hover {
  color: #fff1b8;
}

.ng-modal__body {
  padding: 18px;
  font-size: 14px;
  line-height: 1.6;
  color: #d9d9d9;
}

.ng-modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 18px 16px;
  border-top: 1px solid rgba(255, 215, 0, 0.18);
}

.ng-modal-fade-enter-active,
.ng-modal-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.ng-modal-fade-enter-from,
.ng-modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
