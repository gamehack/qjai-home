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

## 内容页面

- `/articles/`：原创长文（`src/content/articles/*.md`，Astro 内容集合）+ 博客近期研究列表。
- `/about/`、`/contact/`、`/privacy/`：关于我们、联系我们、隐私政策（含 Google AdSense / DoubleClick Cookie 说明）。
- 首页第 5 区域展示原创长文与博客近期研究。

博客近期研究在**构建时**读取 `https://cms.qjai.org/sitemap.xml` 与各文章页的 `<title>` / `meta description`
（cms.qjai.org 暂无 RSS/JSON feed 或公开 API），见 `src/lib/cms.ts`。读取失败时自动跳过该列表，不影响构建。
博客更新后，需要重新部署官网才会刷新该列表。

## 广告（Google AdSense）

- `public/ads.txt`：AdSense 发布商声明。
- `SiteLayout.astro`：`google-adsense-account` meta 与自动广告脚本。
- `public/_headers`：CSP 已放行 AdSense 所需域名。

## 低耦合原则

- 官网介绍品牌、产品和内容渠道；文章仅在构建时读取博客公开页面生成摘要列表，不嵌入播客单集或工具目录。
- 运行时不调用 CMS、播客、工具站或社交平台 API。
- 各产品独立部署、独立运行；官网只提供入口和静态介绍。
- 微信公众号展示关注二维码；Bilibili 展示账号入口和筹备状态，不嵌入动态内容。
- 新产品可以作为新的独立展示区域加入，不改变现有产品平台。

## 技术

- Astro 静态生成
- Cloudflare Pages
- GitHub Actions 构建验证
- 无数据库、无后端；构建时只读取 cms.qjai.org 公开页面
- `@astrojs/sitemap` 生成 `sitemap-index.xml`

## 开发

```bash
npm install
npm run dev
npm run build
```

## 结构

- `src/pages/index.astro`：四大区域的品牌与产品门户首页
- `src/layouts/SiteLayout.astro`：全站元信息、AdSense、页头和页尾
- `src/pages/about.astro` / `contact.astro` / `privacy.astro`：站点信息页
- `src/pages/articles/`：文章列表与文章详情
- `src/content/articles/`：原创文章 Markdown
- `src/lib/cms.ts`：构建时读取博客文章摘要
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
