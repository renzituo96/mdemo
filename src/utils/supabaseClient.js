import { createClient } from '@supabase/supabase-js'
import envConfig from './envConfig.js'

// 从环境配置中获取Supabase连接信息
const { supabase: { url, key } } = envConfig

// 确保必要的配置存在
if (!url || !key) {
  console.error('缺少Supabase配置，请检查环境变量或配置文件')
}

// 创建Supabase客户端
const supabase = createClient(url, key)

export default supabase