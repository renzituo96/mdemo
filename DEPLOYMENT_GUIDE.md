# 部署指南：零成本前后端分离应用部署

本文档详细介绍如何将本项目部署到零成本的云平台上。

## 项目架构

本项目采用前后端分离架构：
- **前端**：Vue 3 + Vite + Vue Router + Pinia
- **后端服务**：Supabase (零成本BaaS平台)
- **部署平台选项**：
  - Netlify
  - Vercel
  - GitHub Pages

## 部署步骤

### 1. 准备工作

#### 1.1 配置Supabase（后端）

1. 访问 [Supabase官网](https://supabase.io/) 注册账号
2. 创建新项目
3. 在项目设置中获取 **Project URL** 和 **Anon Key**
4. 创建必要的数据库表：
   - `users` 表，包含字段：
     - `id` (主键，与认证用户ID关联)
     - `username` (用户名)
     - `email` (邮箱)
     - `created_at` (创建时间)

#### 1.2 环境变量配置

在部署平台设置以下环境变量：
- `VITE_SUPABASE_URL`：你的Supabase项目URL
- `VITE_SUPABASE_KEY`：你的Supabase匿名密钥

### 2. 部署到Netlify

#### 2.1 自动部署

1. 将代码推送到GitHub/GitLab/Bitbucket仓库
2. 访问 [Netlify官网](https://www.netlify.com/) 注册/登录
3. 点击 "New site from Git"
4. 选择你的代码仓库
5. 配置构建设置：
   - Build Command: `npm run build`
   - Publish Directory: `dist`
6. 设置环境变量（在Advanced settings中）
7. 点击 "Deploy site"

#### 2.2 手动部署

```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 登录Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

### 3. 部署到Vercel

#### 3.1 自动部署

1. 将代码推送到GitHub仓库
2. 访问 [Vercel官网](https://vercel.com/) 注册/登录
3. 点击 "New Project"
4. 导入你的GitHub仓库
5. Vercel会自动检测Vue/Vite项目配置
6. 设置环境变量
7. 点击 "Deploy"

#### 3.2 手动部署

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 初始化项目
vercel

# 部署生产版本
vercel --prod
```

### 4. 部署到GitHub Pages

```bash
# 确保安装gh-pages包
npm install --save-dev gh-pages

# 在package.json中添加部署脚本
# "deploy": "vite build && gh-pages -d dist"

# 执行部署
npm run deploy
```

## 跨域处理

由于采用前后端分离架构，需要确保跨域配置正确：

1. **Supabase**：在Supabase控制台的"Settings" > "API" > "Allowed Origins"中添加你的部署域名
2. **本地开发**：可以使用Vite的代理配置（在vite.config.js中）

## 性能优化建议

1. 启用CDN加速（Netlify和Vercel默认提供）
2. 配置适当的缓存策略
3. 优化图片和静态资源
4. 启用gzip/brotli压缩（平台默认提供）

## 监控与维护

1. **访问日志**：Netlify和Vercel都提供访问日志查看
2. **错误监控**：建议集成Sentry等免费错误监控服务
3. **定期备份**：定期备份Supabase数据库

## 注意事项

1. **环境变量安全**：不要在代码中硬编码敏感信息
2. **认证安全**：确保使用HTTPS进行部署
3. **限流**：注意各平台的免费额度限制
4. **数据库备份**：定期导出Supabase数据

## 故障排查

### 常见问题

1. **部署失败**：检查构建日志，确保依赖安装正确
2. **API调用失败**：确认Supabase URL和密钥配置正确
3. **路由问题**：确保配置了正确的重写规则（已在netlify.toml和vercel.json中配置）

### 调试技巧

1. 使用浏览器开发者工具检查网络请求
2. 查看控制台错误信息
3. 检查环境变量是否正确设置