import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // 匹配所有路径除了以下开头的
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // 但总是匹配 /api/trpc
    '/api/(.*)'
  ]
}; 