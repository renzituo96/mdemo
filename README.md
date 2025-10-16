# AI助手应用

这是一个基于Vue 3的AI助手应用，采用前后端分离架构设计，支持零成本部署。

## 项目架构

- **前端框架**：Vue 3 + Vite
- **状态管理**：Pinia
- **路由管理**：Vue Router
- **后端服务**：Supabase (零成本BaaS平台)
- **API层**：封装的服务层，支持环境配置

## 主要特性

- 用户注册和登录功能
- 管理员后台管理
- 前后端分离的API调用方式
- 支持多环境配置
- 零成本部署支持（Netlify、Vercel、GitHub Pages）

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 部署说明

本项目支持零成本部署到多个平台：

- **Netlify**：使用项目中的`netlify.toml`配置
- **Vercel**：使用项目中的`vercel.json`配置
- **GitHub Pages**：支持通过gh-pages部署

详细的部署步骤请参考 [部署指南](DEPLOYMENT_GUIDE.md)。

## 环境变量配置

生产环境需要配置以下环境变量：

- `VITE_SUPABASE_URL`：Supabase项目URL
- `VITE_SUPABASE_KEY`：Supabase匿名密钥

## 项目结构

```
src/
├── components/     # Vue组件
├── views/          # 页面视图
├── router/         # 路由配置
├── stores/         # Pinia状态管理
├── services/       # API服务层
├── utils/          # 工具函数
└── assets/         # 静态资源
```

## 注意事项

1. 确保在部署前正确配置Supabase服务
2. 生产环境使用环境变量管理敏感信息
3. 遵循跨域安全最佳实践
4. 定期备份Supabase数据
