import NgButton from './components/button.vue';
import NgModal from './components/modal.vue';
import NgInput from './components/input.vue';
import NgTable from './components/table.vue';
import NgSteps from './components/steps.vue';
import NgMenu from './components/menu.vue';
import NgDropdown from './components/dropdown.vue';
import NgForm from './components/form.vue';
import NgFormItem from './components/form-item.vue';
import NgTabs from './components/tabs.vue';
import NgBreadcrumb from './components/breadcrumb.vue';
import NgPagination from './components/pagination.vue';
import NgCheckbox from './components/checkbox.vue';
import NgRadio from './components/radio.vue';
import NgSwitch from './components/switch.vue';
import NgSelect from './components/select.vue';
import { attachModalStaticMethods } from './utils/modal';

// 所有组件列表
const components = [
  NgButton,
  NgModal,
  NgInput,
  NgTable,
  NgSteps,
  NgMenu,
  NgDropdown,
  NgForm,
  NgFormItem,
  NgTabs,
  NgBreadcrumb,
  NgPagination,
  NgCheckbox,
  NgRadio,
  NgSwitch,
  NgSelect,
];

// 给组件挂静态方法：NgModal.alert(...)
attachModalStaticMethods(NgModal);

// Vue 插件的 install 方法（Vue.use / app.use 时会调用）
const install = (app) => {
  components.forEach((comp) => {
    app.component(comp.name, comp);
  });
};

// 支持按需引入
export {
  NgButton,
  NgModal,
  NgInput,
  NgTable,
  NgSteps,
  NgMenu,
  NgDropdown,
  NgForm,
  NgFormItem,
  NgTabs,
  NgBreadcrumb,
  NgPagination,
  NgCheckbox,
  NgRadio,
  NgSwitch,
  NgSelect,
};

// 支持 app.use(组件库)
export default {
  install,
};