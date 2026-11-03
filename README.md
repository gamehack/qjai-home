# 潜界 AI 官方网站

潜界 AI 官方品牌与产品官网，部署于 `https://qjai.org`。

## 定位

这是品牌官网，不是内容聚合门户或项目导航页。

- 介绍潜界 AI 的品牌定位、理念与发展方向。
- 不聚合 CMS 文章、播客节目或在线工具。
- 不读取其他业务系统的数据，不依赖 CMS、播客、工具站 API。
- 现阶段不设置产品目录页；正式自有产品发布后再增加产品展示。

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

- `src/pages/index.astro`：首页
- `src/pages/about.astro`：品牌与公司介绍
- `public/_redirects`：旧产品页地址重定向到首页
- `src/styles/global.css`：全局设计系统
- `public/assets/qianjie-ai-mark.svg`：潜界 AI 官方破界 Q 标志

## 品牌

- 品牌：潜界 AI
- 口号：为创业者而生
- 视觉：深海军蓝、青色与电光蓝；克制、锐利、简洁
- 运营主体：上海元流未竭科技有限公司

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
