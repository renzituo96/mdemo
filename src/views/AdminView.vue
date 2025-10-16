<template>
  <div class="admin-container">
    <!-- 管理员登录界面 -->
    <div v-if="!isAdminLoggedIn" class="login-container">
      <h2>管理员登录</h2>
      
      <form @submit.prevent="handleAdminLogin">
        <div class="form-group">
          <label for="adminUsername">用户名</label>
          <input 
            type="text" 
            id="adminUsername" 
            v-model="adminForm.username"
            required 
            placeholder="请输入管理员账号"
          />
        </div>
        
        <div class="form-group">
          <label for="adminPassword">密码</label>
          <input 
            type="password" 
            id="adminPassword" 
            v-model="adminForm.password"
            required 
            placeholder="请输入管理员密码"
          />
        </div>
        
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? '登录中...' : '登录' }}
        </button>
      </form>
      
      <p v-if="message" class="message" :class="messageType">
        {{ message }}
      </p>
      
      <div class="back-link">
        <router-link to="/">返回首页</router-link>
      </div>
    </div>

    <!-- 管理员控制面板 -->
    <div v-else class="dashboard-container">
      <div class="dashboard-header">
        <h2>管理员控制面板</h2>
        <button class="btn-logout" @click="handleLogout">退出登录</button>
      </div>
      
      <div class="users-section">
        <div class="section-header">
          <h3>用户管理</h3>
          <button class="btn-refresh" @click="refreshUsers" :disabled="isLoading">
            {{ isLoading ? '刷新中...' : '刷新列表' }}
          </button>
        </div>
        
        <p class="total-users">总用户数: {{ users.length }}</p>
        
        <div class="users-table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>邮箱</th>
                <th>注册时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.email }}</td>
                <td>{{ formatDate(user.created_at || user.createdAt) }}</td>
                <td>
                  <button class="btn-delete" @click="handleDeleteUser(user.id)">
                    删除
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="isLoading" class="loading-indicator">
          正在加载用户数据...
        </div>
        
        <div v-else-if="users.length === 0" class="no-users">
          暂无注册用户
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const isSubmitting = ref(false)
const message = ref('')
const messageType = ref('')
const isAdminLoggedIn = ref(false)
const isLoading = ref(false)

const adminForm = ref({
  username: '',
  password: ''
})

// 初始化用户数据
onMounted(() => {
  if (isAdminLoggedIn.value) {
    loadUsers()
  }
})

// 用户数据
const users = ref([])

// 加载用户数据
const loadUsers = async () => {
  if (isAdminLoggedIn.value) {
    isLoading.value = true
    try {
      const userData = await userStore.getAllUsers()
      users.value = userData
    } catch (error) {
      console.error('加载用户数据失败:', error)
      showMessage('加载用户数据失败', 'error')
    } finally {
      isLoading.value = false
    }
  }
}

// 刷新用户列表
const refreshUsers = async () => {
  await loadUsers()
  showMessage('用户列表已刷新', 'success')
}

// 管理员登录
const handleAdminLogin = async () => {
  isSubmitting.value = true
  
  try {
    const result = userStore.loginAdmin(adminForm.value.username, adminForm.value.password)
    
    if (result.success) {
      showMessage(result.message, 'success')
      isAdminLoggedIn.value = true
      // 清空表单
      adminForm.value = {
        username: '',
        password: ''
      }
      // 登录成功后加载用户数据
      await loadUsers()
    } else {
      showMessage(result.message, 'error')
    }
  } catch (error) {
    showMessage('登录失败，请稍后重试', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// 删除用户
const handleDeleteUser = async (userId) => {
  if (confirm('确定要删除该用户吗？')) {
    try {
      const result = await userStore.deleteUser(userId)
      showMessage(result.message, result.success ? 'success' : 'error')
      // 删除后刷新用户列表
      if (result.success) {
        await loadUsers()
      }
    } catch (error) {
      console.error('删除用户时出错:', error)
      showMessage('删除用户失败', 'error')
    }
  }
}

// 退出登录
const handleLogout = () => {
  isAdminLoggedIn.value = false
  users.value = []
  showMessage('已退出登录', 'success')
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleString('zh-CN')
}

// 显示消息
const showMessage = (msg, type) => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 3000)
}
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
}

/* 登录界面样式 */
.login-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.login-container h2 {
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
  border-color: #ff9800;
}

.btn-submit {
  width: 100%;
  padding: 12px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #e68900;
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

.back-link {
  text-align: center;
  margin-top: 20px;
}

.back-link a {
  color: #ff9800;
  text-decoration: none;
}

.back-link a:hover {
  text-decoration: underline;
}

/* 管理员控制面板样式 */
.dashboard-container {
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.dashboard-header h2 {
  color: #333;
  margin: 0;
}

.btn-logout {
  padding: 8px 16px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: #da190b;
}

.users-section h3 {
  color: #333;
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.total-users {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.btn-refresh {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-refresh:hover {
  background-color: #357abd;
}

.btn-refresh:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading-indicator {
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
}

.users-table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th,
.users-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.users-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

.users-table tr:hover {
  background-color: #f9f9f9;
}

.btn-delete {
  padding: 6px 12px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-delete:hover {
  background-color: #c0392b;
}

.no-users {
  text-align: center;
  padding: 40px;
  color: #999;
  font-style: italic;
}

@media (max-width: 600px) {
  .dashboard-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .users-table th,
  .users-table td {
    padding: 8px;
    font-size: 14px;
  }
}
</style>