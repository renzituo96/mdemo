# Deno Deploy 部署指南

本指南将详细介绍如何将你的项目部署到 Deno Deploy 平台，帮助你快速实现零成本的项目上线。

## 1. Deno Deploy 简介

Deno Deploy 是一个全球分布式的 JavaScript/TypeScript 边缘运行时平台，专为现代 Web 应用设计，提供：
- 快速的全球部署
- 零配置的 TLS 证书
- 与 GitHub 直接集成
- 支持 TypeScript、JavaScript、WebAssembly
- 免费套餐可用

## 2. 前提条件

在开始部署前，请确保你已完成以下准备工作：

1. **GitHub 账号**：项目代码需要托管在 GitHub 上
2. **Deno Deploy 账号**：访问 [https://dash.deno.com/](https://dash.deno.com/) 注册账号
3. **项目准备**：确保你的项目代码已经推送到 GitHub 仓库（github.com/renzituo96/mdemo）

## 3. 部署步骤

### 3.1 通过 GitHub 集成部署

1. **登录 Deno Deploy**：
   - 访问 [https://dash.deno.com/](https://dash.deno.com/)
   - 使用 GitHub 账号登录（推荐，便于后续集成）

2. **连接 GitHub 仓库**：
   - 在 Deno Deploy 控制台中，点击 "New Project"
   - 选择 "Deploy from GitHub"
   - 授权 Deno Deploy 访问你的 GitHub 账号
   - 选择仓库：`github.com/renzituo96/mdemo`

3. **配置部署设置**：
   - **Branch**：选择要部署的分支（通常是 `main` 或 `master`）
   - **Root Path**：项目根目录（通常是 `/`）
   - **Entry Point**：指定主入口文件（如 `src/main.js` 或 `index.js`）
   - **Environment Variables**：设置必要的环境变量（如 Supabase 配置）

4. **开始部署**：
   - 点击 "Deploy Project"
   - Deno Deploy 将开始从 GitHub 拉取代码并构建

### 3.2 查看部署状态

部署开始后，你可以在 Deno Deploy 控制台中查看详细的部署状态：

1. **部署详情页面**：
   - 项目部署后，会自动跳转到部署详情页面
   - 页面会显示实时的构建和部署进度

2. **部署状态指示器**：
   - **绿色**：部署成功
   - **红色**：部署失败
   - **黄色**：部署进行中

3. **构建日志**：
   - 查看完整的构建和部署日志
   - 分析可能的错误信息

## 4. 环境变量配置

对于需要环境变量的项目（如使用 Supabase 的应用），请在 Deno Deploy 中设置：

1. 在项目配置页面，找到 "Environment Variables"
2. 添加必要的环境变量：
   - `SUPABASE_URL`：你的 Supabase 项目 URL
   - `SUPABASE_KEY`：你的 Supabase 匿名密钥
   - 其他项目所需的环境变量

## 5. 持续部署配置

Deno Deploy 默认支持持续部署，配置如下：

1. 每次推送到选定的分支时，Deno Deploy 会自动触发新的部署
2. 你可以在项目设置中调整部署触发条件
3. 部署历史会保存在控制台中，便于回滚和排查问题

## 6. 自定义域名配置（可选）

如果你想使用自己的域名：

1. 在项目设置中，点击 "Domains"
2. 添加你的自定义域名
3. 按照指引在你的 DNS 提供商处添加 DNS 记录
4. Deno Deploy 会自动为你的域名配置 TLS 证书

## 7. 常见问题排查

### 7.1 部署失败

- **检查入口文件**：确保指定了正确的入口文件路径
- **查看构建日志**：分析错误信息，通常会指出具体问题
- **环境变量检查**：确保所有必要的环境变量都已正确设置
- **代码兼容性**：确保代码兼容 Deno 运行时

### 7.2 部署成功但应用不工作

- **检查应用日志**：在 Deno Deploy 控制台中查看运行日志
- **API 连接**：确认 API 端点配置正确，特别是 Supabase 相关设置
- **CORS 问题**：检查是否存在跨域访问限制

## 8. 部署后管理

### 8.1 监控与日志

- 在 Deno Deploy 控制台中查看实时日志
- 设置错误监控和告警

### 8.2 回滚部署

如果遇到问题，可以轻松回滚到之前的部署版本：

1. 在部署历史中选择一个稳定的版本
2. 点击 "Activate" 将该版本设为当前活跃版本

## 9. 与其他部署平台的比较

| 功能 | Deno Deploy | Netlify | Vercel |
|------|-------------|---------|--------|
| 部署速度 | 极快（全球边缘） | 快 | 快 |
| 构建环境 | Deno 运行时 | 多种语言支持 | 多种语言支持 |
| 免费套餐 | 有 | 有 | 有 |
| 全球分发 | ✓ | ✓ | ✓ |
| 自定义域名 | ✓ | ✓ | ✓ |
| 环境变量 | ✓ | ✓ | ✓ |

## 10. 后续步骤

部署完成后，你可以：

1. 测试应用的功能和性能
2. 监控应用的运行状态
3. 继续开发并推送到 GitHub，触发自动部署

---

通过以上步骤，你可以成功将你的项目部署到 Deno Deploy 平台。如果遇到任何问题，请参考 Deno Deploy [官方文档](https://deno.com/deploy/docs) 或检查构建日志获取更多信息。