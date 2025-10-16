// API服务层
// 封装所有的API调用，实现前后端分离架构
import envConfig from '../utils/envConfig.js';
import axios from 'axios';
import supabase from '../utils/supabaseClient.js';

// 创建axios实例
const apiClient = axios.create({
  baseURL: envConfig.api.baseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 从本地存储获取token并添加到请求头
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // 统一错误处理
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// API服务对象
const apiService = {
  // 用户相关API
  user: {
    // 用户登录
    async login(credentials) {
      try {
        // 使用Supabase的认证服务
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email || credentials.username, // 支持邮箱或用户名登录
          password: credentials.password,
        });
        
        if (error) {
          throw error;
        }
        
        // 保存token到本地存储
        if (data.session) {
          localStorage.setItem('authToken', data.session.access_token);
        }
        
        return data;
      } catch (error) {
        console.error('登录失败:', error);
        throw error;
      }
    },
    
    // 用户注册
    async register(userData) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
        });
        
        if (error) {
          throw error;
        }
        
        // 如果需要在用户表中添加额外信息
        if (data.user) {
          await supabase.from('users').insert({
            id: data.user.id,
            username: userData.username,
            email: userData.email,
            created_at: new Date().toISOString(),
          });
        }
        
        return data;
      } catch (error) {
        console.error('注册失败:', error);
        throw error;
      }
    },
    
    // 获取当前用户信息
    async getCurrentUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
      } catch (error) {
        console.error('获取用户信息失败:', error);
        throw error;
      }
    },
    
    // 用户登出
    async logout() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
        
        // 清除本地存储的token
        localStorage.removeItem('authToken');
        return { success: true };
      } catch (error) {
        console.error('登出失败:', error);
        throw error;
      }
    },
  },
  
  // 管理员相关API
  admin: {
    // 获取所有用户列表
    async getUsers() {
      try {
        const { data, error } = await supabase.from('users').select('*');
        if (error) {
          throw error;
        }
        return data;
      } catch (error) {
        console.error('获取用户列表失败:', error);
        throw error;
      }
    },
    
    // 删除用户
    async deleteUser(userId) {
      try {
        // 先从认证系统中删除用户
        const { error: authError } = await supabase.auth.admin.deleteUser(userId);
        if (authError) {
          throw authError;
        }
        
        // 再从用户表中删除相关记录
        await supabase.from('users').delete().eq('id', userId);
        
        return { success: true };
      } catch (error) {
        console.error('删除用户失败:', error);
        throw error;
      }
    },
  },
  
  // 自定义API调用方法（用于将来扩展）
  async call(endpoint, method = 'GET', data = null, config = {}) {
    try {
      const response = await apiClient({
        url: endpoint,
        method,
        data,
        ...config,
      });
      return response;
    } catch (error) {
      console.error(`API调用失败 [${method} ${endpoint}]:`, error);
      throw error;
    }
  },
};

export default apiService;