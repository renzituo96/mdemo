# 环境变量配置完全指南

## 已完成的配置

✅ 已创建 `.env` 文件，包含正确格式的Supabase配置
✅ 已更新 `supabaseClient.js` 以直接从环境变量读取配置
✅ 已添加错误处理和默认值机制

## Vite环境变量说明

### 命名规则

在Vite项目中，环境变量必须以 `VITE_` 开头才能在客户端代码中访问。这是一个重要的安全特性，可以防止敏感的环境变量意外泄露到客户端。

### 环境变量文件优先级

Vite会按照以下优先级加载环境变量文件：

1. `.env` - 所有环境通用
2. `.env.local` - 所有环境通用，但不会被git提交（应该添加到.gitignore）
3. `.env.[mode]` - 特定模式（如development、production）
4. `.env.[mode].local` - 特定模式，但不会被git提交

### 如何在代码中访问环境变量

在JavaScript/TypeScript文件中：

```javascript
// 正确的访问方式
const value = import.meta.env.VITE_YOUR_VARIABLE_NAME;
```

## 当前项目的环境变量配置

### .env 文件内容

```
# Supabase配置
VITE_SUPABASE_URL=https://bomcaovuvfnoystxrrqf.supabase.co
VITE_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWNhb3Z1dmZub3lzdHhycnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY2MDksImV4cCI6MjA3NjAwMjYwOX0.-L13h5RR9fFZV4H9Bj3bGf9e3S5N_isWa8kuzqjlhHs

# API基础路径
VITE_API_BASE_URL=https://bomcaovuvfnoystxrrqf.supabase.co

# 应用环境
VITE_APP_ENV=development
VITE_DEBUG=true
```

## 部署时的环境变量设置

### 在Vercel上设置环境变量

1. 登录Vercel控制台
2. 选择你的项目
3. 进入 "Settings" > "Environment Variables"
4. 添加以下变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_KEY`
   - `VITE_API_BASE_URL` (生产环境建议设为 `/api`)
   - `VITE_APP_ENV` (生产环境设为 `production`)
   - `VITE_DEBUG` (生产环境设为 `false`)

### 在Netlify上设置环境变量

1. 登录Netlify控制台
2. 选择你的项目
3. 进入 "Site settings" > "Build & deploy" > "Environment"
4. 添加与上述相同的环境变量

## 开发环境测试

要验证环境变量配置是否正确：

1. 重启开发服务器
2. 打开浏览器控制台
3. 检查是否有Supabase初始化日志
4. 尝试登录或访问Supabase相关功能

## 常见问题排查

### 问题：环境变量未生效

**解决方案**：
- 确保变量名以 `VITE_` 开头
- 确保使用 `import.meta.env.VITE_VARIABLE_NAME` 格式访问
- 重启开发服务器
- 检查环境变量文件是否在正确的位置

### 问题：Supabase连接失败

**解决方案**：
- 检查控制台是否有错误信息
- 确认Supabase URL格式正确（不含反引号）
- 确认Supabase Key完整且未被截断
- 检查网络连接是否正常

### 问题：环境变量在生产环境中不可用

**解决方案**：
- 确保在部署平台的设置中正确配置了环境变量
- 确认部署平台支持构建时环境变量注入
- 重新部署项目以应用新的环境变量