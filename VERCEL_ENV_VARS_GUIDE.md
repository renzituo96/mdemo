# Vercel 环境变量配置指南

## 环境变量配置步骤

1. 在Vercel项目创建页面中，找到并点击 **"Environment Variables"** 选项展开配置区域

2. 点击 **"+ Add"** 按钮添加环境变量

3. 根据以下表格配置所需的环境变量：

   | 环境变量名称 | 对应值 | 备注 |
   |------------|-------|------|
   | `VITE_SUPABASE_URL` | `https://bomcaovuvfnoystxrrqf.supabase.co` | 项目中使用的Supabase URL |
   | `VITE_SUPABASE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWNhb3Z1dmZub3lzdHhycnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY2MDksImV4cCI6MjA3NjAwMjYwOX0.-L13h5RR9fFZV4H9Bj3bGf9e3S5N_isWa8kuzqjlhHs` | Supabase匿名密钥 |
   | `VITE_API_BASE_URL` | `/api` | 生产环境API基础路径 |
   | `VITE_APP_ENV` | `production` | 应用环境标识 |
   | `VITE_DEBUG` | `false` | 生产环境关闭调试模式 |

4. 对于每个环境变量，在 **"Value"** 字段中输入对应的配置值

5. 确保 **"Environment"** 选项设置为 **"Production"**（对于生产环境部署）

6. 可以选择在预览和开发环境中也复制这些变量（如果需要）

7. 完成所有环境变量配置后，点击 **"Deploy"** 按钮开始部署

## 环境变量说明

### 1. Supabase 配置

- **VITE_SUPABASE_URL**：
  - 这是您的Supabase项目URL
  - 示例值：`https://bomcaovuvfnoystxrrqf.supabase.co`
  - 您可以从Supabase项目的设置页面获取

- **VITE_SUPABASE_KEY**：
  - 这是Supabase匿名访问密钥（anon key）
  - 示例值：`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvbWNhb3Z1dmZub3lzdHhycnFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0MjY2MDksImV4cCI6MjA3NjAwMjYwOX0.-L13h5RR9fFZV4H9Bj3bGf9e3S5N_isWa8kuzqjlhHs`
  - 这个密钥用于前端直接访问Supabase服务

### 2. API 配置

- **VITE_API_BASE_URL**：
  - 生产环境中应设置为相对路径 `/api`
  - 这样部署到Vercel后，请求会自动路由到您的API函数

### 3. 应用配置

- **VITE_APP_ENV**：
  - 生产环境设置为 `production`
  - 用于区分不同环境的功能行为

- **VITE_DEBUG**：
  - 生产环境建议设置为 `false`
  - 避免在生产环境中输出调试信息

## 从.env文件获取变量

如果您已经创建了 `.env.production` 文件，可以直接从该文件中复制环境变量的值：

1. 打开项目中的 `.env.production` 文件
2. 复制对应变量的值到Vercel的环境变量配置中
3. 确保变量名称完全匹配（区分大小写）

## 部署后验证

部署完成后，您可以通过以下方式验证环境变量是否正确配置：

1. 在浏览器中打开部署的网站
2. 打开浏览器开发者工具（F12）
3. 尝试登录或使用需要Supabase的功能
4. 检查控制台是否有配置相关的错误信息

如果发现配置错误，可以在Vercel项目设置中修改环境变量，然后重新部署项目。