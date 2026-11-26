export function formatDate(input: Date | string | null | undefined): string {
  if (!input) return '';
  const d = typeof input === 'string' ? new Date(`${input}T00:00:00+08:00`) : input;
  const parts = new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
  return parts;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}
