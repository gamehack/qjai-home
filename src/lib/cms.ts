// Build-time reader for the 潜界 AI 博客 (cms.qjai.org).
// cms.qjai.org has no RSS/JSON feed or public API, so we read its sitemap.xml
// and each article's own <title> and <meta name="description"> at build time.
// Any network failure returns an empty list so the build never breaks.

export interface CmsArticle {
  url: string;
  title: string;
  summary: string;
  date: string | null; // YYYY-MM-DD
  category: string | null;
}

const CMS_ORIGIN = 'https://cms.qjai.org';
const TIMEOUT_MS = 10000;

const CATEGORY_LABELS: Record<string, string> = {
  producthunt: '产品猎人',
  'x-daily': 'X 商业情报',
  x: 'X 商业情报',
  trustmrr: 'TrustMRR',
  'trustmrr-weekly': 'TrustMRR',
  'overseas-stories': '海外创业志',
};

async function fetchText(url: string): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'user-agent': 'qjai.org-build (+https://qjai.org/)' },
    });
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(input: string): string {
  return input
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function pickMeta(html: string, name: string): string | null {
  const re = new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? decodeEntities(m[1]).trim() : null;
}

function categoryFromUrl(url: string): string | null {
  const slug = url.split('/article/')[1] ?? '';
  const prefix = slug.replace(/-[0-9a-f]{16,}$/i, '').toLowerCase();
  return CATEGORY_LABELS[prefix] ?? null;
}

let cache: Promise<CmsArticle[]> | null = null;

export function getCmsArticles(limit = 12): Promise<CmsArticle[]> {
  if (!cache) cache = load();
  return cache.then((list) => list.slice(0, limit));
}

async function load(): Promise<CmsArticle[]> {
  const sitemap = await fetchText(`${CMS_ORIGIN}/sitemap.xml`);
  if (!sitemap) {
    console.warn('[cms] sitemap unavailable; building without CMS articles');
    return [];
  }

  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((m) => {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim() ?? '';
      const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? '';
      const date = lastmod.match(/\d{4}-\d{2}-\d{2}/)?.[0] ?? null;
      return { loc, date };
    })
    .filter((e) => e.loc.includes('/article/'))
    .slice(0, 24);

  const results = await Promise.all(
    entries.map(async ({ loc, date }): Promise<CmsArticle | null> => {
      const html = await fetchText(loc);
      if (!html) return null;
      const rawTitle = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '';
      const title = decodeEntities(rawTitle).replace(/\s*[|｜]\s*潜界 AI\s*$/, '').trim();
      const summary = pickMeta(html, 'description') ?? '';
      // Skip pages that only carry the site-wide default description.
      if (!title || title === '潜界 AI' || !summary || summary.startsWith('潜伏AI世界')) return null;
      return { url: loc, title, summary, date, category: categoryFromUrl(loc) };
    }),
  );

  const list = results.filter((a): a is CmsArticle => a !== null);
  list.sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));
  console.log(`[cms] loaded ${list.length} articles from ${CMS_ORIGIN}`);
  return list;
}
