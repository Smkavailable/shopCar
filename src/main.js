import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 引入pinia数据持久化工具
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入passive-event使得页面更加丝滑
import 'default-passive-events'


import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
VueMarkdownEditor.use(vuepressTheme);
// 引入公共样式
import './assets/main.css'

/**挂载状态管理 pinia */
const pinia = createPinia()
pinia.use(piniaPluginPersist)
const app = createApp(App)

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.use(VueMarkdownEditor)

app.mount('#app')