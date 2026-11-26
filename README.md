# AI 财务教练 · Personal Finance AI Coach

面向大学生的个人财务 AI 助手：聚合用户的收入、支出与储蓄目标，注入 DeepSeek 大模型，生成个性化的财务分析与建议。

## ✨ 功能特性

- 🔐 **用户认证** — JWT 登录/注册，bcrypt 密码哈希存储
- 💰 **收支管理** — 收入/支出的增删改查与分类统计
- 🎯 **财务目标** — 储蓄目标创建、进度追踪
- 🤖 **AI 财务教练** — 聚合财务数据为上下文，调用 DeepSeek 生成个性化建议，支持对话式交互
- 📊 **可视化看板** — 收支结构图表、统计卡片、分类占比

## 🛠 技术栈

| 层 | 技术选型 |
|---|---|
| 后端框架 | FastAPI（async） |
| ORM | SQLAlchemy 2.0（async session） |
| 数据库 | PostgreSQL（asyncpg 异步驱动） |
| 数据库迁移 | Alembic |
| 认证 | JWT（python-jose）+ bcrypt（passlib） |
| AI Provider | DeepSeek（OpenAI SDK，base_url 切换） |
| 配置管理 | Pydantic v2 + pydantic-settings |
| 包管理 | uv |
| 前端 | Next.js 16 · React 19 · TypeScript |
| UI | Tailwind CSS v4 · shadcn/ui |
| 图表 | Recharts |

## 📁 项目结构

```
.
├── backend/                    # FastAPI 后端
│   ├── app/
│   │   ├── models/             # ORM 模型：User / Transaction / Goal
│   │   ├── routers/            # 路由：auth / transaction / goal / ai
│   │   ├── schemas/            # Pydantic 请求/响应模型
│   │   ├── services/           # DeepSeek LLM 客户端封装
│   │   └── utils/              # config / database / security / token
│   ├── alembic/                # 数据库迁移脚本
│   └── main.py                 # 应用入口（挂载路由 + CORS）
└── frontend/                   # Next.js 前端
    └── src/
        ├── app/                # 页面路由（dashboard / goals / coach / transactions）
        ├── components/         # UI 组件（shadcn/ui）
        └── lib/                # API 封装与类型定义
```

## 🚀 快速启动

### 后端

```bash
cd backend
cp .env.example .env          # 配置环境变量
uv sync                       # 安装依赖
uv run alembic upgrade head   # 执行数据库迁移
uv run uvicorn main:app --reload --port 8000
```

### 前端

```bash
cd frontend
pnpm install
pnpm dev
```

浏览器访问 http://localhost:3000

## ⚙️ 环境变量

在 `backend/.env` 中配置（模板见 `backend/.env.example`）：

```ini
TOKEN_KEY=your_jwt_secret_key
ALGORITHM=HS256
DATABASE_URL=postgresql+asyncpg://postgres:your_password@localhost:5432/project_2412
DEEPSEEK_API_KEY=sk-your-deepseek-key
```

## 📌 核心设计

- **AI 链路**：`_user_context()` 聚合用户收入/支出/目标数据 → 结构化 prompt → DeepSeek → 个性化财务建议
- **异步全链路**：FastAPI async + asyncpg + SQLAlchemy async session
- **安全**：密码 bcrypt 哈希、JWT 签名验证、`.env` 密钥隔离（已 gitignore）

## 📄 License

MIT
