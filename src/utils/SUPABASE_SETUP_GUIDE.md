# Supabase 集成指南

本指南将帮助您将用户注册系统与Supabase数据库集成。

## 1. 在Supabase创建项目

1. 访问 [Supabase官网](https://supabase.com/) 并登录您的账号
2. 点击 "New project" 创建新项目
3. 填写项目名称、选择区域，设置数据库密码
4. 点击 "Create new project" 等待项目创建完成

## 2. 创建用户表

1. 项目创建完成后，进入项目仪表板
2. 在左侧导航栏选择 "Database"
3. 点击 "Create a new table" 或使用SQL编辑器
4. 创建一个名为 `users` 的表，包含以下字段：

   | 字段名 | 数据类型 | 约束 | 描述 |
   |-------|---------|------|------|
   | `id` | `text` | `PRIMARY KEY` | 用户ID（使用时间戳生成） |
   | `username` | `text` | `UNIQUE NOT NULL` | 加密后的用户名 |
   | `email` | `text` | `UNIQUE NOT NULL` | 加密后的邮箱 |
   | `password` | `text` | `NOT NULL` | bcrypt哈希后的密码 |
   | `createdAt` | `text` | `NOT NULL` | 创建时间 |

5. 点击 "Save" 保存表结构

## 3. 配置API密钥

1. 在左侧导航栏选择 "Project Settings"
2. 选择 "API" 选项卡
3. 复制以下信息：
   - Project URL
   - Anon public key（用于客户端访问）

## 4. 配置项目连接

1. 打开 `src/utils/supabaseClient.js` 文件
2. 替换以下变量的值：

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co'  // 替换为您的Project URL
const SUPABASE_KEY = 'your-anon-key'  // 替换为您的Anon public key
```

## 5. 配置API权限

1. 在Supabase仪表板中，选择 "Authentication"
2. 确保匿名用户（public）有权限访问您的`users`表
3. 进入 "Policies" 设置：
   - 允许public角色读取数据（用于登录验证）
   - 允许public角色插入数据（用于用户注册）
   - 可选：限制删除和更新权限

## 6. 安全注意事项

1. **密码安全**：密码已通过bcrypt在客户端加密，但更安全的做法是在服务端进行加密
2. **API密钥保护**：确保不要将service_role密钥暴露在前端代码中
3. **数据访问控制**：建议为不同操作设置更细粒度的权限控制
4. **考虑使用Supabase Auth**：生产环境中可考虑使用Supabase内置的认证系统

## 7. 故障排除

- 如果连接失败，请检查URL和密钥是否正确
- 确保表名和字段名称与代码中的完全匹配
- 检查网络连接和CORS设置
- 查看浏览器控制台和Supabase日志以获取详细错误信息

## 8. 高级配置（可选）

- 启用Supabase Row Level Security (RLS)以增强数据安全性
- 配置自定义域名
- 设置数据库备份
- 配置API限流