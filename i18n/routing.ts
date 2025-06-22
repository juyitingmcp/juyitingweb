import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh-CN', 'en'],
  defaultLocale: 'zh-CN',
  pathnames: {
    '/': '/',
    '/about': {
      'zh-CN': '/关于',
      en: '/about'
    },
    '/pricing': {
      'zh-CN': '/价格',
      en: '/pricing'
    },
    '/login': {
      'zh-CN': '/登录',
      en: '/login'
    },
    '/workspace': {
      'zh-CN': '/工作台',
      en: '/workspace'
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type LOCALES = (typeof routing.locales)[number]; 