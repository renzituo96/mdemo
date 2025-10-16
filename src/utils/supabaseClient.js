import { createClient } from '@supabase/supabase-js'

// 直接从环境变量读取Supabase配置
let SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
let SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY

// 确保必要的配置存在
if (!SUPABASE_URL) {
  console.error('缺少Supabase URL配置，请检查环境变量VITE_SUPABASE_URL')
  // 提供默认值以防环境变量未设置
  SUPABASE_URL = 'https://bomcaovuvfnoystxrrqf.supabase.co'
}

if (!SUPABASE_KEY) {
  console.error('缺少Supabase Key配置，请检查环境变量VITE_SUPABASE_KEY')
  // 提供默认值以防环境变量未设置
  SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWNhb3Z1dmZub3lzdHhycnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY2MDksImV4cCI6MjA3NjAwMjYwOX0.-L13h5RR9fFZV4H9Bj3bGf9e3S5N_isWa8kuzqjlhHs'
}

// 创建Supabase客户端
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// 添加调试信息（仅在开发环境）
if (import.meta.env.DEV) {
  console.log('Supabase客户端已初始化')
  console.log('Supabase URL:', SUPABASE_URL)
}

export default supabase