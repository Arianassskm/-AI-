# 家庭用药助手

一个帮助家庭管理药品和用药计划的智能应用。

## 功能特点

- 📱 药品管理
  - 多种录入方式
    - 扫码录入
    - 拍照识别
    - 手动录入
  - 智能识别药品信息
  - 药品库存管理
  - 药品到期提醒
  - 药品分类管理

- 💊 用药计划
  - 创建个性化用药计划
  - 智能用药提醒
  - 用药记录追踪
  - 计划完成度统计
  - 用药时间轴展示

- 🤖 AI 智能助手
  - 智能用药指导
    - 注射类用药指导
    - 吸入类用药指导
    - 雾化类用药指导
    - 其他给药途径指导
  - 药物相互作用分析
  - 用药建议生成
  - 健康状况追踪

- 👨‍👩‍👧‍👦 家庭成员管理
  - 多成员档案管理
  - 权限分配
  - 用药历史记录
  - 健康数据统计

## 技术栈

### 前端
- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide Icons
- React Router

### 后端
- Supabase
  - PostgreSQL 数据库
  - 实时订阅
  - 身份认证
  - 存储服务
- Node.js

### AI 功能
- OCR 文字识别
- 智能对话
- 健康数据分析

## 项目结构

```
src/
├── components/         # UI组件
│   ├── ai/            # AI相关组件
│   ├── auth/          # 认证相关组件
│   ├── camera/        # 相机/扫描组件
│   ├── chat/          # 聊天组件
│   ├── guide/         # 用药指引组件
│   ├── home/          # 首页组件
│   ├── inventory/     # 药品库存组件
│   ├── plans/         # 用药计划组件
│   ├── profile/       # 用户档案组件
│   ├── reminders/     # 提醒组件
│   ├── scanner/       # 扫描组件
│   └── ui/            # 通用UI组件
├── data/              # 静态数据和配置
├── hooks/             # 自定义Hooks
├── pages/             # 页面组件
├── services/          # API服务
├── types/             # TypeScript类型定义
└── utils/             # 工具函数

backend/
└── supabase/
    └── migrations/    # 数据库迁移文件
```

## 数据库设计

主要数据表:
- users: 用户信息
- medications: 药品信息
- medication_cabinet: 药箱管理
- medication_plans: 用药计划
- medication_records: 用药记录
- health_records: 健康记录
- medication_reminders: 用药提醒
- medication_knowledge: 药品知识库
- guide_templates: 用药指引模板
- generated_guides: 生成的用药指引

## 开发指南

### 环境要求
- Node.js 18+
- npm 9+

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 代码规范
- 使用 TypeScript 进行类型检查
- 遵循 ESLint 规则
- 使用 Prettier 进行代码格式化

## 安全性

- 使用 Supabase 提供的身份认证
- 实施行级安全策略(RLS)
- 数据加密存储
- 权限控制

## 部署

1. 前端部署
   - 支持部署到 Netlify
   - 静态资源优化
   - 环境变量配置

2. 后端部署
   - Supabase 云服务
   - 数据库备份
   - 监控告警

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 发起 Pull Request

## 许可证

MIT License