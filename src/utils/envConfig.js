// 环境配置文件
// 支持开发环境和生产环境的不同配置

const isProduction = import.meta.env.PROD;

// 基础配置对象
const config = {
  // API 端点配置
  api: {
    // 使用相对路径或环境变量的基础URL
    // 生产环境可以使用不同的配置
    baseUrl: isProduction ? "/api" : "https://bomcaovuvfnoystxrrqf.supabase.co",
  },
  
  // Supabase 配置
  supabase: {
    // 在生产环境中，这些值应该通过环境变量传入
    url: isProduction ? import.meta.env.VITE_SUPABASE_URL : "https://bomcaovuvfnoystxrrqf.supabase.co",
    key: isProduction ? import.meta.env.VITE_SUPABASE_KEY : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWNhb3Z1dmZub3lzdHhycnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY2MDksImV4cCI6MjA3NjAwMjYwOX0.-L13h5RR9fFZV4H9Bj3bGf9e3S5N_isWa8kuzqjlhHs",
  },
  
  // 应用配置
  app: {
    name: "AI助手应用",
    version: "1.0.0",
  },
};

export default config;