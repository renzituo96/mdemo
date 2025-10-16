<template>
  <div class="home-container">
    <h1>欢迎使用用户注册系统</h1>
    <p class="subtitle">请选择您要进行的操作</p>
    
    <div class="action-buttons">
      <router-link to="/register" class="btn btn-primary">用户注册</router-link>
      <router-link to="/login" class="btn btn-secondary">用户登录</router-link>
      <router-link to="/admin" class="btn btn-admin">管理员入口</router-link>
    </div>
  </div>
</template>

<script setup>
// 首页组件
</script>

<style scoped>
.home-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4CAF50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #2196F3;
  color: white;
}

.btn-secondary:hover {
  background-color: #0b7dda;
  transform: translateY(-2px);
}

.btn-admin {
  background-color: #ff9800;
  color: white;
}

.btn-admin:hover {
  background-color: #e68900;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
}
</style>