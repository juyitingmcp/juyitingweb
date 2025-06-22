# juyitingweb
当梁山好汉的聚义精神穿越800年的时光，在AI时代找到了新的表达方式。今天，我们要介绍一个革命性的产品——聚义厅(Hall of Sages)，一个重新定义AI人格协作的智能编排平台。

# 聚义厅 (Hall of Sages)

> 重新定义AI时代的人格协作

聚义厅是一个革命性的AI人格协作平台，让每个人都能拥有一支专属的AI智囊团。通过智能人格编排，实现多维度分析、专业化分工，为用户提供超越个体认知局限的智慧支持。

## ✨ 核心特性

- 🧠 **智能人格编排** - 根据问题类型自动匹配最佳人格组合
- ⚡ **专业化分工** - 每个AI人格专注特定思维模式，深度专业化
- 🎯 **多维度分析** - 从不同角度同时分析问题，避免思维盲区
- 🔧 **场景化模板** - 针对决策分析、技术开发、创意策划等专业模板

## 🎭 核心人格团队

- **自省姐** - 深度思考者，运用MECE原则和第一性原理进行逻辑分析
- **暴躁老哥** - 现实检验者，直接犀利地质疑和挑战，确保考虑风险
- **女仆** - 情感支持者，提供温暖体贴的支持和鼓励
- **效率狂** - 执行优化者，专注高效执行和时间管理
- **数据帝** - 客观分析者，基于数据和事实进行量化分析
- **点子王** - 创意激发者，天马行空的创意思维和创新突破

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- pnpm 8.0 或更高版本
- PostgreSQL 数据库

### 安装依赖

```bash
pnpm install
```

### 环境配置

1. 复制环境变量文件：
```bash
cp .env.example .env.local
```

2. 配置必要的环境变量：
- 数据库连接 `DATABASE_URL`
- Google OAuth 认证信息
- OpenAI API Key
- 支付服务配置（可选）

### 数据库设置

```bash
# 生成 Prisma 客户端
pnpm db:generate

# 推送数据库架构
pnpm db:push

# 或运行迁移
pnpm db:migrate
```

### 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
juyitingweb/
├── app/                    # Next.js 14 App Router
│   ├── [locale]/          # 国际化路由
│   ├── api/               # API 路由
│   └── globals.css        # 全局样式
├── components/             # 组件库
│   ├── blocks/            # 页面区块组件
│   └── ui/                # 基础UI组件
├── features/              # 功能模块
├── i18n/                  # 国际化配置
├── lib/                   # 工具函数
├── messages/              # 翻译文件
├── types/                 # TypeScript 类型定义
└── README.md
```

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **样式**: Tailwind CSS + HeroUI
- **类型**: TypeScript
- **国际化**: next-intl
- **认证**: NextAuth.js
- **数据库**: Prisma + PostgreSQL
- **支付**: Stripe / Paddle
- **AI**: OpenAI API

## 🌍 国际化

支持多语言：
- 中文 (zh-CN) - 默认语言
- English (en)

添加新语言：
1. 在 `messages/` 目录下创建对应的翻译文件
2. 更新 `i18n/routing.ts` 中的语言配置

## 📚 开发指南

### 组件开发

遵循组件块（Blocks）设计模式：
- `components/blocks/` - 业务组件块
- `components/ui/` - 基础UI组件

### API开发

API路由位于 `app/api/`：
- 认证保护
- 错误处理
- 类型安全

### 数据模型

使用 Prisma 管理数据模型：
```bash
# 修改 schema.prisma 后
pnpm db:generate
pnpm db:push
```

## 🔧 脚本命令

```bash
# 开发
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm start        # 启动生产服务器

# 数据库
pnpm db:generate  # 生成 Prisma 客户端
pnpm db:push      # 推送数据库架构
pnpm db:migrate   # 运行数据库迁移
pnpm db:studio    # 打开 Prisma Studio

# 代码质量
pnpm lint         # 运行 ESLint
```

## 🚢 部署

### Vercel (推荐)

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### Docker

```bash
# 构建镜像
docker build -t juyiting-web .

# 运行容器
docker run -p 3000:3000 juyiting-web
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 📞 联系我们

- 官网: [juyiting.com](https://juyiting.com)
- 邮箱: hello@juyiting.com
- GitHub: [github.com/juyiting](https://github.com/juyiting)

---

*聚义千秋，智慧共享* ✨
