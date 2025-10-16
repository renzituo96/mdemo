<template>
  <div class="register-container">
    <h2>用户注册</h2>
    
    <form @submit.prevent="handleRegister">
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
        <label for="email">邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email"
          required 
          placeholder="请输入邮箱"
        />
      </div>
      
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password"
          required 
          placeholder="请输入密码（至少6位）"
          minlength="6"
        />
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="form.confirmPassword"
          required 
          placeholder="请再次输入密码"
        />
      </div>
      
      <button type="submit" class="btn-submit" :disabled="isSubmitting">
        {{ isSubmitting ? '注册中...' : '注册' }}
      </button>
    </form>
    
    <p v-if="message" class="message" :class="messageType">
      {{ message }}
    </p>
    
    <div class="login-link">
      已有账号？<router-link to="/login">立即登录</router-link>
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
  email: '',
  password: '',
  confirmPassword: ''
})

// 初始化用户数据
userStore.initUsers()

const handleRegister = async () => {
  // 表单验证
  if (form.value.password !== form.value.confirmPassword) {
    showMessage('两次输入的密码不一致', 'error')
    return
  }
  
  if (form.value.password.length < 6) {
    showMessage('密码长度至少为6位', 'error')
    return
  }
  
  isSubmitting.value = true
  
  try {
    const result = await userStore.registerUser({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    })
    
    if (result.success) {
      showMessage(result.message, 'success')
      // 注册成功后跳转到登录页
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } else {
      showMessage(result.message, 'error')
    }
  } catch (error) {
    showMessage('注册失败，请稍后重试', 'error')
    console.error('注册错误:', error)
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
.register-container {
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
  border-color: #4CAF50;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #45a049;
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

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #666;
}

.login-link a {
  color: #4CAF50;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>