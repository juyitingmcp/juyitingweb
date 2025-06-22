# 自定义域名配置指南

## 为 juyitingweb 添加 juyiting.150404.xyz 域名

### 前提条件
- 确保你的域名 `150404.xyz` 已经托管在 Cloudflare 上
- 如果不在 Cloudflare，需要先将域名 NS 记录指向 Cloudflare

### 步骤 1: 在 Cloudflare Pages 中添加自定义域名

1. **登录 Cloudflare Dashboard**
   - 访问: https://dash.cloudflare.com/
   - 登录你的账户

2. **进入 Pages 项目**
   - 在左侧菜单选择 "Workers & Pages"
   - 点击你的项目 "juyitingweb"

3. **添加自定义域名**
   - 点击 "Custom domains" 标签
   - 点击 "Set up a custom domain" 按钮
   - 输入域名: `juyiting.150404.xyz`
   - 点击 "Continue"

4. **验证域名**
   - Cloudflare 会自动检测 DNS 记录
   - 如果域名已在 Cloudflare 托管，会自动配置 CNAME 记录
   - 点击 "Activate domain"

### 步骤 2: DNS 配置（如果需要手动配置）

如果域名不在 Cloudflare 托管，需要手动添加 CNAME 记录：

```
类型: CNAME
名称: juyiting
目标: juyitingweb.pages.dev
TTL: Auto（或 3600）
```

### 步骤 3: 验证部署

1. **等待 DNS 传播**
   - 通常需要几分钟到几小时
   - 可以使用 `dig` 命令检查: `dig juyiting.150404.xyz`

2. **测试访问**
   - 访问: https://juyiting.150404.xyz
   - 确保网站正常加载

### 步骤 4: 设置重定向（可选）

如果你希望根域名也重定向到子域名：

1. 在 Cloudflare DNS 中添加 A 记录:
   ```
   类型: A
   名称: 150404.xyz
   IPv4: 192.0.2.1 (Cloudflare 占位符 IP)
   代理状态: 已代理（橙色云朵）
   ```

2. 在 Page Rules 中添加重定向规则:
   ```
   URL: 150404.xyz/*
   设置: 转发 URL - 301 永久重定向
   目标: https://juyiting.150404.xyz/$1
   ```

### 常见问题解决

1. **域名验证失败**
   - 检查域名是否在 Cloudflare 托管
   - 确保没有冲突的 DNS 记录

2. **SSL 证书问题**
   - Cloudflare 会自动为自定义域名颁发 SSL 证书
   - 通常在域名激活后几分钟内生效

3. **访问 404 错误**
   - 确保 Cloudflare Pages 项目已正确部署
   - 检查 DNS 记录是否正确指向 `juyitingweb.pages.dev`

### 当前项目信息
- Pages 项目名: juyitingweb
- 默认域名: https://dea53cae.juyitingweb.pages.dev
- 自定义域名: https://juyiting.150404.xyz (配置后) 