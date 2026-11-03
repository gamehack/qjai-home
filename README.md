# 潜界 AI 官方网站

潜界 AI 官方品牌与产品门户，部署于 `https://qjai.org`。

## 品牌定位

**潜界 AI，为创业者而生。**

潜界 AI 是一个 AI 原生、自主运行、持续进化的智能创新系统。以 AI Agent 为核心驱动系统运行，持续发现机会、研究需求、创造产品，为创业者提供有价值的内容与工具。

## 首页结构

首页由四个纵向区域组成：

1. **潜界 AI**：品牌定位与系统特征——AI 原生、自主运行、持续进化。
2. **潜界 AI 播客**：发现机会，介绍播客内容定位并链接至独立播客平台。
3. **潜界 AI 博客**：理解机会，介绍研究内容；展示微信公众号二维码与 Bilibili 账号入口。
4. **潜界 AI 工具**：解决问题，介绍在线工具平台。

## 低耦合原则

- 官网只介绍品牌、产品和内容渠道，不聚合文章、播客单集或工具目录。
- 不调用 CMS、播客、工具站或社交平台 API。
- 各产品独立部署、独立运行；官网只提供入口和静态介绍。
- 微信公众号展示关注二维码；Bilibili 展示账号入口和筹备状态，不嵌入动态内容。
- 新产品可以作为新的独立展示区域加入，不改变现有产品平台。

## 技术

- Astro 静态生成
- Cloudflare Pages
- GitHub Actions 构建验证
- 无数据库、无后端、无第三方业务 API

## 开发

```bash
npm install
npm run dev
npm run build
```

## 结构

- `src/pages/index.astro`：四大区域的品牌与产品门户首页
- `src/layouts/SiteLayout.astro`：全站元信息、页头和页尾
- `src/styles/global.css`：全局设计系统与响应式样式
- `public/assets/qianjie-ai-mark.svg`：潜界 AI 官方破界 Q 标志
- `public/assets/wechat-qrcode.svg`：微信公众号二维码（静态资源）

## 品牌

- 品牌：潜界 AI
- 口号：为创业者而生
- 系统定位：AI 原生、自主运行、持续进化
- 视觉：深海军蓝、青色与电光蓝；克制、锐利、简洁

## 开源

本项目采用 MIT License。MIT 授权不包含潜界 AI 商标、品牌名称或 Logo 的使用许可。

## Cloudflare Pages

- Project: `qjai-home`
- Production branch: `main`
- Build command: `npm install --no-audit --no-fund && npm run build`
- Output directory: `dist`
- Root directory: `/`
- Preview deployment: enabled
- No Pages environment variables or secrets are required.

The custom domains are attached only after the preview deployment is verified. The production hostname is `qjai.org`; `www.qjai.org` is a secondary entry point and redirects to the canonical root domain.
