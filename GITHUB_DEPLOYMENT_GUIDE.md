# 将代码推送到GitHub仓库的详细步骤

本指南将详细说明如何将本地项目代码推送到GitHub仓库，为后续部署做准备。

## 前提条件

- 已安装Git（可通过 `git --version` 检查是否安装）
- 已注册GitHub账号
- 本地已有项目代码

## 步骤一：初始化Git仓库（如果尚未初始化）

如果你的项目还没有初始化Git仓库，请执行以下命令：

```bash
# 进入项目目录
cd c:\Users\86189\Desktop\my\myuniapp\ai - fu

# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交到本地仓库
git commit -m "初始化项目"
```

## 步骤二：在GitHub上创建新仓库

1. 登录你的GitHub账号
2. 点击页面右上角的 "+" 图标，选择 "New repository"
3. 填写仓库信息：
   - Repository name: 输入仓库名称（如 "ai-fu-app"）
   - Description: 输入仓库描述（可选）
   - Visibility: 选择 "Public" 或 "Private"
   - 不要勾选 "Add a README file"（因为我们已有项目文件）
   - 不要勾选其他选项（.gitignore、license等，因为我们已有这些文件）
4. 点击 "Create repository"

## 步骤三：将本地仓库与远程仓库关联并推送代码

在GitHub创建仓库后，页面会显示一些命令。在你的项目目录中执行以下命令：

```bash
# 添加远程仓库地址（请替换为你自己的仓库地址）
git remote add origin https://github.com/你的GitHub用户名/仓库名称.git

# 推送代码到远程仓库的main分支
git push -u origin main
```

如果是第一次使用Git，系统会提示你输入GitHub的用户名和密码。现在GitHub推荐使用Personal Access Token代替密码，所以你可能需要：

1. 在GitHub上生成Personal Access Token：
   - 进入GitHub设置 → Developer settings → Personal access tokens → Generate new token
   - 勾选所需的权限（至少需要 `repo` 权限）
   - 生成token并复制保存（关闭页面后将无法再次查看）
2. 当Git要求输入密码时，粘贴你的Personal Access Token

## 步骤四：验证推送是否成功

推送完成后，刷新GitHub仓库页面，你应该能看到所有项目文件已经上传成功。

## 后续操作：定期推送更新

当你对项目进行修改后，可以通过以下命令更新远程仓库：

```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "描述你的更改内容"

# 推送到远程仓库
git push
```

## 常见问题解决

### 1. 推送失败 - 远程仓库已存在文件

如果遇到 `Updates were rejected because the remote contains work that you do not have locally` 错误：

```bash
# 先拉取远程仓库的内容（可能需要解决冲突）
git pull --rebase origin main

# 然后再推送
git push origin main
```

### 2. Git用户信息配置

如果是第一次使用Git，可能需要配置用户信息：

```bash
# 配置用户名
git config --global user.name "你的GitHub用户名"

# 配置邮箱
git config --global user.email "你的GitHub邮箱"
```

### 3. 遇到认证问题

如果遇到认证失败，可以尝试更新凭证管理器中的凭证，或者使用SSH方式连接（更安全且不需要每次输入密码）。

## 部署到Netlify或Vercel

代码推送到GitHub后，你可以按照 [部署指南](DEPLOYMENT_GUIDE.md) 中的步骤，将代码部署到Netlify或Vercel平台。