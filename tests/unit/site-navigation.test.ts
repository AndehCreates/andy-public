import { expect, it } from 'vitest';
import { isActiveNavigationPath, site } from '../../src/config/site';

it('uses encoding-stable public labels with the intended display semantics', () => {
  expect(site.title).toBe(`Andy ${String.fromCharCode(0x2014)} AI Systems`);
  expect(site.navigation.find((item) => item.href === '/resume/')?.label).toBe(`R${String.fromCharCode(0x00e9)}sum${String.fromCharCode(0x00e9)}`);
  expect(JSON.stringify(site)).not.toMatch(/Ã.|â./);
});

it('marks only the matching root or navigation section as active', () => {
  expect(isActiveNavigationPath('/', '/')).toBe(true);
  expect(isActiveNavigationPath('/work/', '/')).toBe(false);
  expect(isActiveNavigationPath('/work/', '/work/')).toBe(true);
  expect(isActiveNavigationPath('/work/foo/', '/work/')).toBe(true);
  expect(isActiveNavigationPath('/workshop/', '/work/')).toBe(false);
  expect(isActiveNavigationPath('/systems', '/systems/')).toBe(true);
});
