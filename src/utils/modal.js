import { createApp, h, nextTick, ref } from 'vue';
import NgModal from '../components/modal.vue';
import NgButton from '../components/button.vue';

// 全局管理器，确保同时只有一个 alert 弹窗
let isCreatingAlert = false;

// NgModal.alert({ title, content, okText, onOk })
export function attachModalStaticMethods(modalComponent) {
  if (modalComponent.alert) return modalComponent;
  modalComponent.alert = (options = {}) => {
    // 防止重复调用
    if (isCreatingAlert) {
      return;
    }
    isCreatingAlert = true;

    const {
      title = '提示',
      content = '',
      okText = '确定',
      onOk,
      maskClosable,
      hideFooter,
      closable,
      hideHeader,
    } = options;

    const container = document.createElement('div');
    document.body.appendChild(container);

    let appInstance = null;

    const handleClose = () => {
      if (appInstance) {
        appInstance.unmount();
      }
      container.remove();
      isCreatingAlert = false;
    };

    // 使用 createApp 创建独立的 Vue 应用实例
    appInstance = createApp({
      setup() {
        const modelValue = ref(false);

        // 在下一个 tick 设置为 true，触发过渡动画
        nextTick(() => {
          modelValue.value = true;
        });
        return () => h(
          NgModal,
          {
            modelValue: modelValue.value,
            'onUpdate:modelValue': (val) => {
              modelValue.value = val;
              if (!val) {
                handleClose();
              }
            },
            title,
            maskClosable: maskClosable,
            hideFooter: hideFooter,
            closable: closable,
            hideHeader: hideHeader,
          },
          {
            default: () => (typeof content === 'function' ? content() : content),
            footer: () =>
              h(
                'div',
                { style: 'text-align: right;' },
                h(
                  NgButton,
                  {
                    type: 'primary',
                    size: 'small',
                    onClick: () => {
                      onOk?.();
                      handleClose();
                    },
                  },
                  () => okText,
                ),
              ),
          },
        );
      },
    });

    appInstance.mount(container);
  };

  return modalComponent;
}
