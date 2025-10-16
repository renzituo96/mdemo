import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

// 创建Vue应用实例
const app = createApp(App)

// 使用Pinia进行状态管理
const pinia = createPinia()
app.use(pinia)

// 使用Vue Router
app.use(router)

// 挂载应用
app.mount('#app')
