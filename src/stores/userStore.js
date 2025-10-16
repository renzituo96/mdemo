import { defineStore } from 'pinia'
import apiService from '../services/apiService.js'

// 简单的加密函数（保留用于敏感字段的额外保护）
function encrypt(text, key = 'admin_secret_key') {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}

// 简单的解密函数
function decrypt(encryptedText, key = 'admin_secret_key') {
  try {
    const text = atob(encryptedText);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch (e) {
    return encryptedText; // 解密失败时返回原文本
  }
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    currentUser: null,
    admin: {
      username: 'admin',
      password: 'admin123' // 明文存储密码
    }
  }),

  actions: {
    // 从API服务获取所有用户数据
    async initUsers() {
      try {
        const data = await apiService.admin.getUsers();
        this.users = data || [];
      } catch (error) {
        console.error('获取用户数据失败:', error);
      }
    },
    
    // 用户登录
    async login(credentials) {
      try {
        const data = await apiService.user.login(credentials);
        this.currentUser = data.user;
        return { success: true, user: data.user };
      } catch (error) {
        console.error('登录失败:', error);
        return { success: false, error: error.message };
      }
    },
    
    // 用户注册
    async register(userData) {
      try {
        const data = await apiService.user.register(userData);
        return { success: true, user: data.user };
      } catch (error) {
        console.error('注册失败:', error);
        return { success: false, error: error.message };
      }
    },
    
    // 获取当前用户
    async getCurrentUser() {
      try {
        const user = await apiService.user.getCurrentUser();
        this.currentUser = user;
        return user;
      } catch (error) {
        console.error('获取当前用户失败:', error);
        this.currentUser = null;
        return null;
      }
    },
    
    // 用户登出
    async logout() {
      try {
        await apiService.user.logout();
        this.currentUser = null;
        return { success: true };
      } catch (error) {
        console.error('登出失败:', error);
        return { success: false, error: error.message };
      }
    },
    
    // 删除用户
    async deleteUser(userId) {
      try {
        await apiService.admin.deleteUser(userId);
        // 从本地状态中移除用户
        this.users = this.users.filter(user => user.id !== userId);
        return { success: true };
      } catch (error) {
        console.error('删除用户失败:', error);
        return { success: false, error: error.message };
      }
    },

    // 保存用户到Supabase数据库
    async saveUserToDB(userData) {
      try {
        const { data, error } = await supabase.from('users').insert([userData])
        if (error) {
          console.error('保存用户失败:', error)
          return false
        }
        return true
      } catch (error) {
        console.error('数据库操作错误:', error)
        return false
      }
    },

    // 从Supabase删除用户
    async deleteUserFromDB(userId) {
      try {
        const { error } = await supabase.from('users').delete().eq('id', userId)
        if (error) {
          console.error('删除用户失败:', error)
          return false
        }
        return true
      } catch (error) {
        console.error('数据库操作错误:', error)
        return false
      }
    },

    // 注册新用户
    async registerUser(userData) {
      try {
        console.log('开始注册流程，用户数据:', { username: userData.username, email: userData.email })
        
        // 从Supabase检查用户名是否已存在
        console.log('检查用户名是否已存在...')
        const { data: existingUserByUsername, error: usernameError } = await supabase
          .from('users')
          .select('*')
          .eq('username', userData.username)
          .single()
        
        if (usernameError) {
          console.log('用户名检查完成，未找到重复用户名')
        } else if (existingUserByUsername) {
          console.log('用户名已存在:', userData.username)
          return { success: false, message: '用户名已存在' }
        }

        // 从Supabase检查邮箱是否已存在
        console.log('检查邮箱是否已存在...')
        const { data: existingUserByEmail, error: emailError } = await supabase
          .from('users')
          .select('*')
          .eq('email', userData.email)
          .single()
        
        if (emailError) {
          console.log('邮箱检查完成，未找到重复邮箱')
        } else if (existingUserByEmail) {
          console.log('邮箱已存在:', userData.email)
          return { success: false, message: '邮箱已被注册' }
        }

        console.log('准备新用户数据')

        const newUser = {
          id: Date.now().toString(),
          username: userData.username,
          email: userData.email,
          password: userData.password, // 明文存储密码
          created_at: new Date().toISOString() // 使用下划线命名法以匹配数据库常见实践
        }
        console.log('新用户数据准备完成，准备保存到数据库')

        // 保存到Supabase数据库
        const { data, error } = await supabase.from('users').insert([newUser])
        if (error) {
          console.error('保存用户失败:', error)
          // 根据错误类型返回更具体的错误信息
          if (error.code === '42703') {
            return { success: false, message: '数据库表结构不匹配，请检查表字段是否正确' }
          } else if (error.code === '42501') {
            return { success: false, message: '数据库权限不足，请检查Supabase表权限设置' }
          } else {
            return { success: false, message: `注册失败: ${error.message}` }
          }
        }
        
        console.log('用户保存成功，用户ID:', newUser.id)
        
        // 更新本地用户列表
        await this.initUsers()
        console.log('注册流程完成')
        
        return { success: true, message: '注册成功' }
      } catch (error) {
        console.error('注册过程中发生未捕获的错误:', error)
        return { success: false, message: `注册失败，请检查网络连接或联系管理员。错误: ${error.message || '未知错误'}` }
      }
    },

    // 用户登录
    async loginUser(username, password) {
      // 首先确保本地用户列表是最新的
      await this.initUsers()
      
      const user = this.users.find(u => u.username === username)
      
      if (!user || user.password !== password) {
          return { success: false, message: '用户名或密码错误' }
        }

      // 不再需要解密，数据库中已存储明文
      const decryptedUser = {
        ...user
      }
      
      this.currentUser = decryptedUser
      return { success: true, message: '登录成功' }
    },

    // 管理员登录
    loginAdmin(username, password) {
      // 为了演示方便，直接使用明文比较
      if (username !== 'admin' || password !== 'admin123') {
        return { success: false, message: '管理员账号或密码错误' }
      }
      return { success: true, message: '管理员登录成功' }
    },

    // 获取所有用户信息（管理员用）
    async getAllUsers() {
      // 确保获取最新数据
      await this.initUsers()
      
      return this.users.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.created_at || user.createdAt // 兼容两种命名方式
      }))
    },

    // 删除用户
    async deleteUser(userId) {
      // 从数据库删除
      const deleted = await this.deleteUserFromDB(userId)
      if (!deleted) {
        return { success: false, message: '删除用户失败' }
      }
      
      // 更新本地用户列表
      await this.initUsers()
      
      return { success: true, message: '用户已删除' }
    },

    // 退出登录
    logout() {
      this.currentUser = null
    }
  }
})