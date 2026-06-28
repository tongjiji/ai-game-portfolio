# 个人简历作品集网站

一个极简风格的个人AI视频作品展示网站，支持后台管理和视频上传功能。

## 技术栈

- **前端**: React 18 + TypeScript + Vite
- **样式**: Tailwind CSS 4.x
- **路由**: React Router v6
- **后端**: Express.js + Node.js
- **文件上传**: Multer
- **数据存储**: JSON 文件

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

需要同时启动前端和后端服务：

```bash
# 终端1 - 启动前端开发服务器（端口 5173）
npm run dev

# 终端2 - 启动后端服务（端口 3001）
node server/index.js
```

### 访问网站

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:5173/ |
| 作品合集 | http://localhost:5173/portfolio |
| 关于页面 | http://localhost:5173/about |
| 后台登录 | http://localhost:5173/admin/login |
| 后台管理 | http://localhost:5173/admin |

## 后台管理

### 登录信息

- **密码**: `admin123`

### 管理功能

1. **个人信息编辑**: 修改姓名、职位、邮箱、电话、所在地、个人简介等
2. **作品管理**: 添加、编辑、删除AI视频作品
3. **文件上传**: 上传视频和封面图片，获取文件URL

## 文件上传

### 上传流程

1. 在后台「文件上传」页面选择文件
2. 等待上传完成，获取文件URL（如 `/uploads/xxx.mp4`）
3. 在「作品管理」中添加/编辑作品，粘贴URL

### 支持的文件类型

- **视频**: mp4, webm, ogg
- **图片**: jpeg, png, webp
- **最大文件大小**: 100MB

## 项目结构

```
.
├── public/
│   └── uploads/          # 上传的文件存储目录
├── server/
│   ├── data/
│   │   └── db.json       # 数据库文件（个人信息、作品数据）
│   └── index.js          # 后端服务
├── src/
│   ├── api/
│   │   └── index.ts      # API 接口封装
│   ├── components/
│   │   ├── AuthGuard.tsx # 路由守卫
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── VideoPlayer.tsx
│   ├── data/
│   │   ├── profile.ts    # 默认个人信息
│   │   └── works.ts      # 默认作品数据
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Admin.tsx     # 后台管理页面
│   │   ├── AdminLogin.tsx # 后台登录页面
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   ├── Portfolio.tsx
│   │   └── PortfolioDetail.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/profile` | GET | 获取个人信息 |
| `/api/profile` | PUT | 更新个人信息 |
| `/api/works` | GET | 获取作品列表 |
| `/api/works/:id` | GET | 获取单个作品 |
| `/api/works` | POST | 添加作品 |
| `/api/works/:id` | PUT | 更新作品 |
| `/api/works/:id` | DELETE | 删除作品 |
| `/api/upload` | POST | 上传文件 |
| `/api/uploads` | GET | 获取已上传文件列表 |
| `/api/uploads/:filename` | DELETE | 删除上传文件 |

## 注意事项

1. **后端服务必须运行**: 后台管理和数据修改功能需要后端服务（端口3001）运行
2. **文件存储**: 上传的文件存储在 `public/uploads/` 目录
3. **数据持久化**: 数据存储在 `server/data/db.json` 文件中
4. **登录状态**: 登录状态保存在 sessionStorage 中，浏览器关闭后需要重新登录
5. **密码安全**: 默认密码为 `admin123`，建议上线前修改
6. **生产环境**: 建议使用环境变量管理密码和配置

## 修改默认密码

修改密码需要修改以下文件：

1. `src/pages/AdminLogin.tsx` - 前端密码验证逻辑
2. 建议在后端添加密码验证 API

## 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录。

## 部署建议

1. 前端部署到 Vercel、Netlify 或其他静态托管服务
2. 后端部署到 Node.js 服务器（如 Vercel Serverless、Heroku、阿里云等）
3. 配置环境变量和 CORS
4. 使用云存储服务（如阿里云OSS、腾讯云COS）存储视频文件
