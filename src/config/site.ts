const emDash = String.fromCharCode(0x2014);
const eAcute = String.fromCharCode(0x00e9);

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function withBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${base}${path}` || '/';
}

export function isActiveNavigationPath(currentPath: string, navigationHref: string): boolean {
  const current = normalizePath(currentPath);
  const navigation = normalizePath(navigationHref);

  return navigation === '/' ? current === '/' : current === navigation || current.startsWith(`${navigation}/`);
}

export const site = {
  title: `Andy ${emDash} AI Systems`,
  description:
    'Evidence-led software and AI systems built to strengthen human capability.',
  opportunityLabel: 'Open to roles and collaboration',
  navigation: [
    { label: 'Home', href: withBase('/') },
    { label: 'Work', href: withBase('/work/') },
    { label: 'Systems', href: withBase('/systems/') },
    { label: 'Handbook', href: withBase('/handbook/') },
    { label: 'Signal Library', href: withBase('/signals/') },
    { label: 'About', href: withBase('/about/') },
    { label: `R${eAcute}sum${eAcute}`, href: withBase('/resume/') },
  ],
} as const;
