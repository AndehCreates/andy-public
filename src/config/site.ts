const emDash = String.fromCharCode(0x2014);
const eAcute = String.fromCharCode(0x00e9);

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
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
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work/' },
    { label: 'Systems', href: '/systems/' },
    { label: 'Handbook', href: '/handbook/' },
    { label: 'Signal Library', href: '/signals/' },
    { label: 'About', href: '/about/' },
    { label: `R${eAcute}sum${eAcute}`, href: '/resume/' },
  ],
} as const;
