<script setup>
import { ref, computed } from 'vue';
import {
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
  NgSelect,
  NgSwitch,
} from './index';

const currentMenu = ref('guide');

const currentTitle = computed(() => {
  if (currentMenu.value === 'guide') return '使用说明';
  if (currentMenu.value === 'button') return 'Button 按钮';
  if (currentMenu.value === 'input') return 'Input 输入框';
  if (currentMenu.value === 'table') return 'Table 表格';
  if (currentMenu.value === 'steps') return 'Steps 步骤条';
  if (currentMenu.value === 'menu') return 'Menu 菜单';
  if (currentMenu.value === 'dropdown') return 'Dropdown 下拉';
  if (currentMenu.value === 'form') return 'Form 表单';
  if (currentMenu.value === 'tabs') return 'Tabs 选项卡';
  if (currentMenu.value === 'breadcrumb') return 'Breadcrumb 面包屑';
  if (currentMenu.value === 'pagination') return 'Pagination 分页';
  if (currentMenu.value === 'modal') return 'Modal 弹窗';
  return '即将开放';
});

const showBaseCode = ref(false);
const showSizeCode = ref(false);
const showModalCode = ref(false);
const showModal = ref(false);
const showAlertCode = ref(false);

// Input 示例相关
const inputValue = ref('');
const inputSize = ref('medium');
const inputLog = ref('');

const handleInputChange = (value) => {
  inputLog.value = `当前值：${value}`;
};
// Form 示例
const loginFormRef = ref();
const loginModel = ref({
  username: '',
  password: '',
  remember: true,
  gender: 'male',
  level: 'normal',
  enableEmail: false,
});

const loginRules = {
  username: [{ required: true, message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少 6 位' },
  ],
};

const loginStatus = ref('');

const handleLogin = async () => {
  const ok = await loginFormRef.value?.validate();
  if (ok) {
    loginStatus.value = `提交成功：${loginModel.value.username}`;
  } else {
    loginStatus.value = '表单校验未通过';
  }
};

// Table 示例数据
const tableColumns = ref([
  { key: 'name', title: '姓名' },
  { key: 'age', title: '年龄', align: 'center' },
  { key: 'address', title: '地址' },
]);

const tableData = ref([
  { id: 1, name: '张三', age: 26, address: '上海 · 浦东新区' },
  { id: 2, name: '李四', age: 32, address: '北京 · 朝阳区' },
  { id: 3, name: '王五', age: 21, address: '杭州 · 西湖区' },
]);

const lastClickedRow = ref('');

const handleRowClick = (row) => {
  lastClickedRow.value = `你点击了：${row.name}，年龄 ${row.age}`;
};

// Steps 示例
const stepsItems = ref([
  { title: '填写基础信息', description: '昵称、邮箱等' },
  { title: '完善资料', description: '个人简介与标签' },
  { title: '完成', description: '开始使用 Nugget UI' },
]);

const currentStep = ref(1);

// Menu 示例
const menuItems = ref([
  { key: 'overview', label: '总览' },
  { key: 'analysis', label: '分析' },
  { key: 'setting', label: '设置', disabled: true },
]);

const activeMenuKey = ref('overview');
const menuInfo = ref('当前选中：总览');

const handleMenuSelect = (item) => {
  menuInfo.value = `当前选中：${item.label}`;
};

// Dropdown 示例
const dropdownInfo = ref('未选择');

const handleDropdownSelect = (item) => {
  dropdownInfo.value = `选择了：${item.label}`;
};

// Tabs 示例
const activeTabKey = ref('tab1');

// Breadcrumb 示例
const breadcrumbItems = ref([
  { label: '首页' },
  { label: '组件' },
  { label: '表单与导航' },
]);

// Pagination 示例
const paginationCurrent = ref(1);
const paginationTotal = ref(42);

const handleAlert = () => {
  NgModal.alert({
    title: '警告',
    content: '这是一个 NgModal.alert 示例',
    okText: '知道了',
    maskClosable: false,
    hideFooter: false,
    closable: true,
    hideHeader: false,
  });
};

const handleButtonClick = (e) => {
  console.log(e);
};
</script>

<template>
  <div class="docs-layout">
    <aside class="docs-sider">
      <div class="docs-logo">
        <span class="logo-mark">N</span>
        <span class="logo-text">Nugget UI</span>
      </div>
      <div class="docs-sider-section-title">文档</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'guide' }]"
          @click="currentMenu = 'guide'"
        >
          使用说明
        </li>
      </ul>

      <div class="docs-sider-section-title" style="margin-top: 16px;">基础组件</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'button' }]"
          @click="currentMenu = 'button'"
        >
          Button 按钮
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'input' }]"
          @click="currentMenu = 'input'"
        >
          Input 输入框
        </li>
      </ul>

      <div class="docs-sider-section-title" style="margin-top: 16px;">数据展示</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'table' }]"
          @click="currentMenu = 'table'"
        >
          Table 表格
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'steps' }]"
          @click="currentMenu = 'steps'"
        >
          Steps 步骤条
        </li>
      </ul>

      <div class="docs-sider-section-title" style="margin-top: 16px;">表单</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'form' }]"
          @click="currentMenu = 'form'"
        >
          Form 表单
        </li>
      </ul>

      <div class="docs-sider-section-title" style="margin-top: 16px;">导航</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'menu' }]"
          @click="currentMenu = 'menu'"
        >
          Menu 菜单
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'dropdown' }]"
          @click="currentMenu = 'dropdown'"
        >
          Dropdown 下拉
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'tabs' }]"
          @click="currentMenu = 'tabs'"
        >
          Tabs 选项卡
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'breadcrumb' }]"
          @click="currentMenu = 'breadcrumb'"
        >
          Breadcrumb 面包屑
        </li>
        <li
          :class="['docs-menu-item', { active: currentMenu === 'pagination' }]"
          @click="currentMenu = 'pagination'"
        >
          Pagination 分页
        </li>
      </ul>

      <div class="docs-sider-section-title" style="margin-top: 16px;">反馈</div>
      <ul class="docs-menu">
        <li
          :class="['docs-menu-item', { active: currentMenu === 'modal' }]"
          @click="currentMenu = 'modal'"
        >
          Modal 弹窗
        </li>
      </ul>
    </aside>

    <main class="docs-content">
      <header class="docs-header">
        <h1>{{ currentTitle }}</h1>
        <p class="docs-subtitle">
          一个使用 Vue 3 + JavaScript 编写的轻量级黑金风格组件库示例文档。
        </p>
      </header>

      <!-- 使用说明 -->
      <section class="docs-section" v-if="currentMenu === 'guide'">
        <h2 class="docs-section-title">安装</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-desc">
            <p>使用 npm 安装组件库：</p>
            <pre class="docs-code-block"><code>npm install nugget-ui</code></pre>
          </div>
        </div>

        <h2 class="docs-section-title">全局引入</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-desc">
            <p>在项目入口文件（例如 <code>main.js</code>）中注册组件库：</p>
            <pre class="docs-code-block"><code>import { createApp } from 'vue'
import App from './App.vue'
import NuggetUI from 'nugget-ui'

const app = createApp(App)
app.use(NuggetUI)
app.mount('#app')</code></pre>
          </div>
        </div>

        <h2 class="docs-section-title">按需引入</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-desc">
            <p>在需要的组件内按需引入并注册：</p>
            <pre class="docs-code-block"><code>import { NgButton, NgForm, NgInput } from 'nugget-ui'

export default {
  components: { NgButton, NgForm, NgInput },
}</code></pre>
          </div>
        </div>

        <h2 class="docs-section-title">基础用法示例</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-desc">
            <p>示例：在表单中使用按钮和输入框：</p>
            <pre class="docs-code-block"><code>&lt;NgForm :model="form"&gt;
  &lt;NgFormItem label="用户名"&gt;
    &lt;NgInput v-model="form.username" placeholder="请输入用户名" /&gt;
  &lt;/NgFormItem&gt;
  &lt;NgFormItem&gt;
    &lt;NgButton type="primary"&gt;提交&lt;/NgButton&gt;
  &lt;/NgFormItem&gt;
&lt;/NgForm&gt;</code></pre>
          </div>
        </div>
      </section>

      <section class="docs-section" v-else-if="currentMenu === 'button'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview">
            <NgButton @click="handleButtonClick">主要按钮</NgButton>
            <NgButton type="success">成功按钮</NgButton>
            <NgButton type="warning">警告按钮</NgButton>
            <NgButton type="danger">危险按钮</NgButton>
            <NgButton type="default">默认按钮</NgButton>
          </div>
          <div class="docs-demo-desc">
            <p>按钮支持 <code>type</code>（颜色风格）、<code>size</code>（尺寸），并提供点击事件。</p>
          </div>
        </div>
        <div class="docs-toggle" @click="showBaseCode = !showBaseCode">
          <span>{{ showBaseCode ? '收起代码' : '查看代码示例' }}</span>
          <span class="arrow" :class="{ open: showBaseCode }">↓</span>
        </div>
        <pre v-if="showBaseCode" class="docs-code-block"><code>import { NgButton } from 'nugget-ui';

&lt;NgButton type="primary" @click="onClick"&gt;
  主要按钮
&lt;/NgButton&gt;

&lt;NgButton type="success"&gt;成功按钮&lt;/NgButton&gt;
&lt;NgButton type="warning"&gt;警告按钮&lt;/NgButton&gt;
&lt;NgButton type="danger"&gt;危险按钮&lt;/NgButton&gt;
&lt;NgButton type="default"&gt;默认按钮&lt;/NgButton&gt;</code></pre>
        <h2 class="docs-section-title">大小</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview">
            <NgButton size="small">小按钮</NgButton>
            <NgButton size="medium">中按钮</NgButton>
            <NgButton size="large">大按钮</NgButton>
          </div>
        </div>
        <div class="docs-toggle" @click="showSizeCode = !showSizeCode">
          <span>{{ showSizeCode ? '收起代码' : '查看代码示例' }}</span>
          <span class="arrow" :class="{ open: showSizeCode }">↓</span>
        </div>
        <pre v-if="showSizeCode" class="docs-code-block"><code>&lt;NgButton size="small"&gt;小按钮&lt;/NgButton&gt;
&lt;NgButton&gt;中按钮（默认 medium）&lt;/NgButton&gt;
&lt;NgButton size="large"&gt;大按钮&lt;/NgButton&gt;</code></pre>
        
        
        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>type</code> 属性</td>
              <td>按钮风格</td>
              <td><code>'primary' | 'success' | 'warning' | 'danger' | 'default'</code></td>
              <td><code>'primary'</code></td>
            </tr>
            <tr>
              <td><code>size</code> 属性</td>
              <td>按钮尺寸</td>
              <td><code>'small' | 'medium' | 'large'</code></td>
              <td><code>'medium'</code></td>
            </tr>
            <tr>
              <td><code>default</code> 插槽</td>
              <td>按钮内部文本内容</td>
              <td>VNode / string</td>
              <td><code>默认按钮</code></td>
            </tr>
            <tr>
              <td><code>@click</code> 事件</td>
              <td>点击按钮时触发</td>
              <td><code>(event: MouseEvent) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
        
      </section>

      <section class="docs-section" v-else-if="currentMenu === 'input'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 10px;">
            <NgInput
              v-model="inputValue"
              placeholder="请输入昵称"
              @change="handleInputChange"
            />
            <div style="font-size: 12px; color: #bfbfbf;">
              {{ inputLog || '在上方输入框中输入内容进行体验' }}
            </div>
          </div>
          <div class="docs-demo-desc">
            <p>输入框支持 <code>v-model</code> 双向绑定、占位符、禁用状态以及一键清空。</p>
          </div>
        </div>

        <h2 class="docs-section-title">尺寸</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 10px; min-width: 260px;">
            <NgInput v-model="inputValue" size="small" placeholder="small 尺寸" />
            <NgInput v-model="inputValue" size="medium" placeholder="medium 尺寸（默认）" />
            <NgInput v-model="inputValue" size="large" placeholder="large 尺寸" />
          </div>
        </div>

        <h2 class="docs-section-title">前后缀 / 禁用</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 10px; min-width: 260px;">
            <NgInput v-model="inputValue" placeholder="带前缀">
              <template #prefix>🔍</template>
            </NgInput>
            <NgInput v-model="inputValue" placeholder="带后缀">
              <template #suffix>.com</template>
            </NgInput>
            <NgInput v-model="inputValue" disabled placeholder="禁用状态" />
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>v-model</code> / <code>modelValue</code></td>
              <td>输入框的值</td>
              <td><code>string | number</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>placeholder</code></td>
              <td>占位提示文案</td>
              <td><code>string</code></td>
              <td><code>'请输入内容'</code></td>
            </tr>
            <tr>
              <td><code>type</code></td>
              <td>原生 input 类型</td>
              <td><code>string</code></td>
              <td><code>'text'</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>尺寸大小</td>
              <td><code>'small' | 'medium' | 'large'</code></td>
              <td><code>'medium'</code></td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td>是否禁用</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>clearable</code></td>
              <td>是否展示一键清空按钮</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>prefix</code> 插槽</td>
              <td>输入框前缀内容</td>
              <td>VNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>suffix</code> 插槽</td>
              <td>输入框后缀内容</td>
              <td>VNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@input</code> 事件</td>
              <td>输入时触发，参数为当前值</td>
              <td><code>(value: string | number) =&gt; void</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@change</code> 事件</td>
              <td>失焦时触发，参数为当前值</td>
              <td><code>(value: string | number) =&gt; void</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@focus</code> / <code>@blur</code></td>
              <td>获取 / 失去焦点时触发</td>
              <td><code>(event: FocusEvent) =&gt; void</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@clear</code> 事件</td>
              <td>点击清空按钮时触发</td>
              <td><code>() =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Table 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'table'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 12px; min-width: 360px;">
            <NgTable
              :columns="tableColumns"
              :data-source="tableData"
              size="medium"
              striped
              bordered
              @row-click="handleRowClick"
            />
            <p style="font-size: 12px; color: #bfbfbf; margin: 0;">
              {{ lastClickedRow || '点击某一行查看交互信息' }}
            </p>
          </div>
          <div class="docs-demo-desc">
            <p>传入 <code>columns</code> 与 <code>dataSource</code> 即可快速渲染表格。</p>
          </div>
        </div>

        <h2 class="docs-section-title">尺寸</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 12px; min-width: 360px;">
            <NgTable
              :columns="tableColumns"
              :data-source="tableData"
              size="small"
            />
            <NgTable
              :columns="tableColumns"
              :data-source="tableData"
              size="large"
            />
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>columns</code></td>
              <td>列配置</td>
              <td><code>{ key: string; title: string; width?: string; align?: 'left' | 'center' | 'right' }[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>dataSource</code></td>
              <td>数据源</td>
              <td><code>Record&lt;string, any&gt;[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>rowKey</code></td>
              <td>行唯一标识字段名</td>
              <td><code>string</code></td>
              <td><code>'id'</code></td>
            </tr>
            <tr>
              <td><code>striped</code></td>
              <td>是否开启斑马纹</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td>是否显示边框</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td>尺寸大小</td>
              <td><code>'small' | 'medium' | 'large'</code></td>
              <td><code>'medium'</code></td>
            </tr>
            <tr>
              <td><code>@row-click</code> 事件</td>
              <td>点击行时触发，参数为 <code>(row, index)</code></td>
              <td><code>(row: any, index: number) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Form 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'form'">
        <h2 class="docs-section-title">登录表单示例</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 10px; min-width: 320px;">
            <NgForm ref="loginFormRef" :model="loginModel" :rules="loginRules" :label-width="80">
              <NgFormItem label="用户名" prop="username">
                <NgInput v-model="loginModel.username" placeholder="请输入用户名" />
              </NgFormItem>
              <NgFormItem label="密码" prop="password">
                <NgInput v-model="loginModel.password" placeholder="请输入密码" type="password" />
              </NgFormItem>
              <NgFormItem label="性别">
                <NgRadio v-model="loginModel.gender" label="male">男</NgRadio>
                <span style="width: 12px; display: inline-block;" />
                <NgRadio v-model="loginModel.gender" label="female">女</NgRadio>
              </NgFormItem>
              <NgFormItem label="等级">
                <NgSelect
                  v-model="loginModel.level"
                  :options="[
                    { label: '普通用户', value: 'normal' },
                    { label: '高级用户', value: 'pro' },
                    { label: '管理员', value: 'admin' },
                  ]"
                  placeholder="请选择等级"
                />
              </NgFormItem>
              <NgFormItem>
                <NgCheckbox v-model="loginModel.remember">记住我</NgCheckbox>
                <span style="width: 16px; display: inline-block;" />
                <NgSwitch v-model="loginModel.enableEmail" :show-text="true" checked-text="邮件通知" unchecked-text="关闭通知" />
              </NgFormItem>
              <NgFormItem>
                <NgButton type="primary" @click="handleLogin">登录</NgButton>
              </NgFormItem>
            </NgForm>
            <p style="font-size: 12px; color: #bfbfbf; margin: 0;">
              {{ loginStatus || '点击登录按钮查看校验效果' }}
            </p>
          </div>
          <div class="docs-demo-desc">
            <p>表单通过 <code>NgForm</code> 管理数据和校验，<code>NgFormItem</code> 负责 label 和错误展示。</p>
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>组件</th>
              <th>属性 / 事件 / 方法</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="4"><code>NgForm</code></td>
              <td><code>model</code></td>
              <td>表单数据对象（必填）</td>
              <td><code>Record&lt;string, any&gt;</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>rules</code></td>
              <td>校验规则</td>
              <td><code>Record&lt;string, Rule[]&gt;</code></td>
              <td><code>{}</code></td>
            </tr>
            <tr>
              <td><code>labelWidth</code></td>
              <td>label 宽度</td>
              <td><code>string | number</code></td>
              <td><code>'90px'</code></td>
            </tr>
            <tr>
              <td><code>validate()</code> 方法</td>
              <td>对整个表单进行校验，返回 <code>Promise&lt;boolean&gt;</code></td>
              <td>函数</td>
              <td>-</td>
            </tr>

            <tr>
              <td rowspan="3"><code>NgFormItem</code></td>
              <td><code>prop</code></td>
              <td>对应表单字段名</td>
              <td><code>string</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>label</code></td>
              <td>左侧文案</td>
              <td><code>string</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>required</code></td>
              <td>是否必填（优先于规则中的 required）</td>
              <td><code>boolean</code></td>
              <td><code>undefined</code></td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Steps 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'steps'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 16px;">
            <NgSteps
              v-model:current="currentStep"
              :items="stepsItems"
            />
            <p style="font-size: 12px; color: #bfbfbf; margin: 0;">
              当前步骤：第 {{ currentStep + 1 }} 步
            </p>
          </div>
          <div class="docs-demo-desc">
            <p>点击步骤节点切换当前步骤，适用于多步骤表单或流程引导。</p>
          </div>
        </div>

        <h2 class="docs-section-title">垂直方向</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <NgSteps
              :items="stepsItems"
              :current="currentStep"
              direction="vertical"
            />
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td>步骤数据</td>
              <td><code>{ title: string; description?: string }[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>current</code> / <code>v-model:current</code></td>
              <td>当前步骤索引（从 0 开始）</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>direction</code></td>
              <td>展示方向</td>
              <td><code>'horizontal' | 'vertical'</code></td>
              <td><code>'horizontal'</code></td>
            </tr>
            <tr>
              <td><code>clickable</code></td>
              <td>步骤是否可点击</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>@change</code> 事件</td>
              <td>步骤变化时触发，参数为当前索引</td>
              <td><code>(current: number) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Menu 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'menu'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <NgMenu
              v-model="activeMenuKey"
              :items="menuItems"
              @select="handleMenuSelect"
            />
            <p style="font-size: 12px; color: #bfbfbf; margin: 0;">
              {{ menuInfo }}
            </p>
          </div>
          <div class="docs-demo-desc">
            <p>用于侧边栏或功能切换菜单，支持禁用项与横向模式。</p>
          </div>
        </div>

        <h2 class="docs-section-title">横向菜单</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <NgMenu
              v-model="activeMenuKey"
              :items="menuItems"
              mode="horizontal"
            />
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td>菜单项数据</td>
              <td><code>{ key: string | number; label: string; disabled?: boolean }[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>v-model</code> / <code>modelValue</code></td>
              <td>当前选中的 key</td>
              <td><code>string | number</code></td>
              <td><code>''</code></td>
            </tr>
            <tr>
              <td><code>mode</code></td>
              <td>展示模式</td>
              <td><code>'vertical' | 'horizontal'</code></td>
              <td><code>'vertical'</code></td>
            </tr>
            <tr>
              <td><code>item</code> 插槽</td>
              <td>自定义菜单项渲染</td>
              <td><code>{ item }</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@select</code> 事件</td>
              <td>点击菜单项时触发，参数为对应 item</td>
              <td><code>(item: any) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Dropdown 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'dropdown'">
        <h2 class="docs-section-title">点击触发</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <NgDropdown trigger="click">
              <template #default>
                <NgButton type="primary">操作</NgButton>
              </template>
              <template #overlay>
                <NgMenu
                  :items="menuItems"
                  @select="handleDropdownSelect"
                />
              </template>
            </NgDropdown>
            <p style="font-size: 12px; color: #bfbfbf; margin: 0;">
              {{ dropdownInfo }}
            </p>
          </div>
          <div class="docs-demo-desc">
            <p>最常见的下拉操作菜单场景，支持自定义触发区域和下拉内容。</p>
          </div>
        </div>

        <h2 class="docs-section-title">悬停触发</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 12px;">
            <NgDropdown trigger="hover">
              <template #default>
                <NgButton type="default">Hover 我</NgButton>
              </template>
              <template #overlay>
                <div style="padding: 8px 10px; font-size: 13px; color: #f7f7f7;">
                  这是一个自定义内容的下拉卡片。
                </div>
              </template>
            </NgDropdown>
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>visible</code> / <code>v-model:visible</code></td>
              <td>下拉显隐（受控）</td>
              <td><code>boolean</code></td>
              <td><code>undefined（内部控制）</code></td>
            </tr>
            <tr>
              <td><code>trigger</code></td>
              <td>触发方式</td>
              <td><code>'click' | 'hover'</code></td>
              <td><code>'hover'</code></td>
            </tr>
            <tr>
              <td><code>default</code> 插槽</td>
              <td>触发区域内容</td>
              <td>VNode</td>
              <td>一个默认按钮</td>
            </tr>
            <tr>
              <td><code>overlay</code> 插槽</td>
              <td>下拉层内容</td>
              <td>VNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@visible-change</code> 事件</td>
              <td>显隐变化时触发</td>
              <td><code>(visible: boolean) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Tabs 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'tabs'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: stretch; gap: 12px; min-width: 260px;">
            <NgTabs
              v-model:activeKey="activeTabKey"
              :items="[
                { key: 'tab1', label: '概览' },
                { key: 'tab2', label: '明细' },
                { key: 'tab3', label: '高级', disabled: true },
              ]"
            />
            <div style="font-size: 13px; color: #d9d9d9;">
              当前 Tab：{{ activeTabKey }}
            </div>
          </div>
          <div class="docs-demo-desc">
            <p>使用 <code>items</code> 配置页签，配合 <code>v-model:activeKey</code> 控制当前选中。</p>
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td>页签数据</td>
              <td><code>{ key: string | number; label: string; disabled?: boolean }[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>v-model:activeKey</code> / <code>activeKey</code></td>
              <td>当前激活的 key</td>
              <td><code>string | number</code></td>
              <td><code>items[0]?.key</code></td>
            </tr>
            <tr>
              <td><code>tab</code> 插槽</td>
              <td>自定义页签渲染</td>
              <td><code>{ tab }</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>@change</code> 事件</td>
              <td>切换页签时触发，参数为 key</td>
              <td><code>(key: string | number) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Breadcrumb 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'breadcrumb'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <NgBreadcrumb :items="breadcrumbItems" />
          </div>
          <div class="docs-demo-desc">
            <p>用于展示当前页面在系统层级结构中的位置，常配合路由使用。</p>
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 插槽 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>items</code></td>
              <td>面包屑数据</td>
              <td><code>{ label: string }[]</code></td>
              <td><code>[]</code></td>
            </tr>
            <tr>
              <td><code>item</code> 插槽</td>
              <td>自定义每一项</td>
              <td><code>{ item, index }</code></td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>separator</code> 插槽</td>
              <td>自定义分隔符</td>
              <td>VNode</td>
              <td><code>'/'</code></td>
            </tr>
            <tr>
              <td><code>@item-click</code> 事件</td>
              <td>点击非最后一项时触发</td>
              <td><code>(item, index) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Pagination 文档 -->
      <section class="docs-section" v-else-if="currentMenu === 'pagination'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview" style="flex-direction: column; align-items: flex-start; gap: 8px;">
            <NgPagination
              v-model:current="paginationCurrent"
              :total="paginationTotal"
              :page-size="10"
            />
          </div>
          <div class="docs-demo-desc">
            <p>与表格等数据展示组件搭配使用，用于切换数据页面。</p>
          </div>
        </div>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 事件</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>total</code></td>
              <td>数据总条数</td>
              <td><code>number</code></td>
              <td><code>0</code></td>
            </tr>
            <tr>
              <td><code>pageSize</code></td>
              <td>每页条数</td>
              <td><code>number</code></td>
              <td><code>10</code></td>
            </tr>
            <tr>
              <td><code>v-model:current</code> / <code>current</code></td>
              <td>当前页码</td>
              <td><code>number</code></td>
              <td><code>1</code></td>
            </tr>
            <tr>
              <td><code>showTotal</code></td>
              <td>是否显示总数</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>@change</code> 事件</td>
              <td>页码变化时触发</td>
              <td><code>(page: number) =&gt; void</code></td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="docs-section" v-else-if="currentMenu === 'modal'">
        <h2 class="docs-section-title">基础用法</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview">
            <NgButton type="primary" @click="showModal = true">打开弹窗</NgButton>
            <NgModal
              v-model="showModal"
              title="示例弹窗"
            >
              <p>这里是弹窗内容，可以放任意插槽。</p>
            </NgModal>
          </div>
          <div class="docs-demo-desc">
            <p>通过 <code>v-model</code> 控制显隐，支持自定义标题、内容、页脚（默认提供确定/取消）。</p>
          </div>
        </div>
        <div class="docs-toggle" @click="showModalCode = !showModalCode">
          <span>{{ showModalCode ? '收起代码' : '查看代码示例' }}</span>
          <span class="arrow" :class="{ open: showModalCode }">↓</span>
        </div>
        <pre v-if="showModalCode" class="docs-code-block"><code>import { NgModal, NgButton } from 'nugget-ui';

const showModal = ref(false);

&lt;NgButton type="primary" @click="showModal = true"&gt;打开弹窗&lt;/NgButton&gt;
&lt;NgModal
  v-model="showModal"
  title="示例弹窗"
  @confirm="showModal = false"
  @cancel="showModal = false"
&gt;
  &lt;p&gt;这里是弹窗内容，可以放任意插槽。&lt;/p&gt;
&lt;/NgModal&gt;</code></pre>

        <h2 class="docs-section-title">NgModal.alert 调用方式</h2>
        <div class="docs-demo-card">
          <div class="docs-demo-preview">
            <NgButton type="warning" @click="handleAlert">点我弹出</NgButton>
          </div>
          <div class="docs-demo-desc">
            <p>以 <code>NgModal.alert</code> 形式快速唤起提示弹窗，无需在模板写组件。</p>
          </div>
        </div>
        <div class="docs-toggle" @click="showAlertCode = !showAlertCode">
          <span>{{ showAlertCode ? '收起代码' : '查看代码示例' }}</span>
          <span class="arrow" :class="{ open: showAlertCode }">↓</span>
        </div>
        <pre v-if="showAlertCode" class="docs-code-block"><code>
          import { NgModal } from 'nugget-ui';
NgModal.alert({
  title: '警告',
  content: '这是一个 NgModal.alert 示例',
  okText: '知道了',
});</code></pre>

        <h2 class="docs-section-title">API</h2>
        <table class="docs-table">
          <thead>
            <tr>
              <th>属性 / 事件 / 插槽</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>v-model</code> / <code>modelValue</code></td>
              <td>弹窗显隐</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>title</code></td>
              <td>标题文本</td>
              <td><code>string</code></td>
              <td><code>'提示'</code></td>
            </tr>
            <tr>
              <td><code>width</code></td>
              <td>弹窗宽度</td>
              <td><code>string</code></td>
              <td><code>'520px'</code></td>
            </tr>
            <tr>
              <td><code>closable</code></td>
              <td>是否显示右上角关闭</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>maskClosable</code></td>
              <td>点击遮罩是否关闭</td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
            </tr>
            <tr>
              <td><code>hideHeader</code></td>
              <td>是否隐藏头部</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>hideFooter</code></td>
              <td>是否隐藏底部</td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
            </tr>
            <tr>
              <td><code>default</code> 插槽</td>
              <td>内容区域</td>
              <td>VNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>header</code> 插槽</td>
              <td>自定义头部</td>
              <td>VNode</td>
              <td>-</td>
            </tr>
            <tr>
              <td><code>footer</code> 插槽</td>
              <td>自定义底部</td>
              <td>VNode</td>
              <td>默认“取消/确定”按钮</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="docs-section" v-else>
        <p>更多组件文档正在开发中，敬请期待。</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.docs-layout {
  display: flex;
  min-height: 100vh;
  background: radial-gradient(circle at top left, #333 0, #050509 45%, #000 100%);
  color: #f7f7f7;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.docs-sider {
  width: 240px;
  padding: 24px 20px;
  border-right: 1px solid rgba(255, 215, 0, 0.16);
  background: linear-gradient(180deg, #050509 0%, #050509 60%, #000 100%);
  box-shadow: 0 0 32px rgba(0, 0, 0, 0.6);
}

.docs-logo {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: radial-gradient(circle at 20% 20%, #ffd666 0, #d4a017 40%, #5c3b00 100%);
  color: #050509;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-right: 10px;
  box-shadow: 0 0 16px rgba(255, 215, 0, 0.55);
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.docs-sider-section-title {
  font-size: 13px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 215, 0, 0.7);
  margin-bottom: 10px;
}

.docs-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.docs-menu-item {
  padding: 8px 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #c7c7c7;
  cursor: pointer;
  transition: all 0.2s ease;
}

.docs-menu-item:hover {
  background: rgba(255, 215, 0, 0.08);
  color: #ffe58f;
}

.docs-menu-item.active {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.25), transparent);
  color: #fff7e6;
  border-left: 2px solid #ffd666;
}

.docs-menu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.docs-content {
  flex: 1;
  padding: 30px 40px;
}

.docs-header h1 {
  font-size: 26px;
  margin: 0 0 8px;
}

.docs-subtitle {
  margin: 0 0 24px;
  font-size: 14px;
  color: #bfbfbf;
}

.docs-section {
  margin-bottom: 32px;
}

.docs-section-title {
  font-size: 18px;
  margin-bottom: 12px;
  position: relative;
  padding-left: 10px;
}

.docs-section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(180deg, #ffd666, #ad6800);
}

.docs-demo-card {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 10px;
  background: radial-gradient(circle at top left, rgba(255, 215, 0, 0.09), rgba(0, 0, 0, 0.9));
  border: 1px solid rgba(255, 215, 0, 0.25);
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
}

.docs-demo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 160px;
  gap: 1vw;
}

.docs-demo-desc {
  flex: 1;
  font-size: 14px;
  color: #d9d9d9;
}

.docs-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 8px 0 10px;
  font-size: 12px;
  color: #ffd666;
  cursor: pointer;
  user-select: none;
}

.docs-toggle .arrow {
  display: inline-block;
  transition: transform 0.2s ease;
}

.docs-toggle .arrow.open {
  transform: rotate(180deg);
}

.docs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-bottom: 20px;
  background: rgba(5, 5, 9, 0.8);
  border-radius: 8px;
  overflow: hidden;
}

.docs-table thead {
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.22), rgba(0, 0, 0, 0.9));
}

.docs-table th,
.docs-table td {
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255, 215, 0, 0.12);
  text-align: left;
}

.docs-table th {
  font-weight: 500;
  color: #fff9e6;
}

.docs-table tbody tr:last-child td {
  border-bottom: none;
}

.docs-code-block {
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: #0d0d0f;
  border: 1px solid rgba(255, 215, 0, 0.24);
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  color: #fefefe;
}

.docs-code-block code {
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    'Liberation Mono', 'Courier New', monospace;
}

code {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1px 4px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .docs-layout {
    flex-direction: column;
  }

  .docs-sider {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(255, 215, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .docs-menu {
    display: flex;
    gap: 8px;
  }

  .docs-content {
    padding: 20px 16px 32px;
  }
}
</style>
