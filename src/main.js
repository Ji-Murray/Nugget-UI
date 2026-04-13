import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import NuggetUI from './index'

const app = createApp(App)
app.use(NuggetUI)
app.use(createPinia())

app.mount('#app')
