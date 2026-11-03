# 潜界 AI 官方网站

潜界 AI 官方品牌与产品官网，部署于 `https://qjai.org`。

## 定位

这是品牌官网，不是内容聚合门户或项目导航页。

- 介绍潜界 AI 的品牌定位、产品理念和正式自有产品。
- 不聚合 CMS 文章、播客节目或在线工具。
- 不读取其他业务系统的数据，不依赖 CMS、播客、工具站 API。
- 只展示经过确认、正式纳入潜界 AI 品牌的产品。
- 暂无正式对外产品时，产品页明确展示空状态，不虚构产品。

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
- `src/pages/products.astro`：正式产品展示
- `src/pages/about.astro`：品牌与公司介绍
- `src/styles/global.css`：全局设计系统
- `public/assets/qianjie-ai-mark.svg`：潜界 AI 官方破界 Q 标志

## 品牌

- 品牌：潜界 AI
- 口号：为创业者而生
- 视觉：深海军蓝、青色与电光蓝；克制、锐利、简洁
- 运营主体：上海元流未竭科技有限公司

## 开源

本项目采用 MIT License。MIT 授权不包含潜界 AI 商标、品牌名称或 Logo 的使用许可。