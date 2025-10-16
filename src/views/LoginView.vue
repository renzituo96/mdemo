<template>
  <div class="login-container">
    <h2>用户登录</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username"
          required 
          placeholder="请输入用户名"
        />
      </div>
      
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password"
          required 
          placeholder="请输入密码"
        />
      </div>
      
      <button type="submit" class="btn-submit" :disabled="isSubmitting">
        {{ isSubmitting ? '登录中...' : '登录' }}
      </button>
    </form>
    
    <p v-if="message" class="message" :class="messageType">
      {{ message }}
    </p>
    
    <div class="links">
      <div class="register-link">
        还没有账号？<router-link to="/register">立即注册</router-link>
      </div>
      <div class="admin-link">
        <router-link to="/admin">管理员登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')

const form = ref({
  username: '',
  password: ''
})

// 初始化用户数据
userStore.initUsers()

const handleLogin = async () => {
  isSubmitting.value = true
  
  try {
      const result = await userStore.loginUser(form.value.username, form.value.password)
      
      if (result.success) {
        showMessage(result.message, 'success')
        // 登录成功后跳转到首页
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        showMessage(result.message, 'error')
      }
    } catch (error) {
      showMessage('登录失败，请稍后重试', 'error')
      console.error('登录错误:', error)
    } finally {
      isSubmitting.value = false
    }
}

const showMessage = (msg, type) => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.login-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 30px 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #2196F3;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #0b7dda;
}

.btn-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.message {
  padding: 10px;
  margin-top: 20px;
  border-radius: 6px;
  text-align: center;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.links {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.links a {
  color: #2196F3;
  text-decoration: none;
}

.links a:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .links {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style>