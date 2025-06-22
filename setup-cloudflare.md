# Cloudflare Pages 配置指南

## 修复 Node.JS 兼容性错误

你的网站已经成功部署到: https://dea53cae.juyitingweb.pages.dev

但是需要在 Cloudflare Dashboard 中配置兼容性标志来修复 Node.JS 兼容性错误。

### 步骤:

1. **登录 Cloudflare Dashboard**
   - 访问: https://dash.cloudflare.com/
   - 登录你的账户

2. **进入 Pages 项目**
   - 在左侧菜单选择 "Workers & Pages"
   - 点击你的项目 "juyitingweb"

3. **设置兼容性标志**
   - 点击 "Settings" 标签
   - 向下滚动找到 "Compatibility flags" 部分
   - 点击 "Configure compatibility flags"

4. **添加 nodejs_compat 标志**
   - 在 Production 环境中添加: `nodejs_compat`
   - 在 Preview 环境中添加: `nodejs_compat`
   - 点击 "Save"

5. **触发重新部署**
   - 返回 "Deployments" 标签
   - 点击最新部署旁边的 "Retry deployment" 按钮

### 自动化部署命令

以后可以使用以下命令进行部署:

```bash
# 构建项目
npm run build

# 构建 Cloudflare Pages 版本
npm run pages:build

# 部署到 Cloudflare Pages
npm run pages:deploy
```

### 验证部署

配置完成后，访问你的网站应该不再出现 Node.JS 兼容性错误。

如果仍有问题，请检查:
1. 兼容性标志是否正确添加
2. 是否触发了重新部署
3. wrangler.toml 文件配置是否正确 