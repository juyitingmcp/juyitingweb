'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Crown, Github, Twitter, Mail } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');

  const footerLinks = {
    product: [
      { title: '人格大厅', href: '/hall' },
      { title: '场景模板', href: '/scenarios' },
      { title: '协作聊天', href: '/chat' },
      { title: '定价方案', href: '/pricing' },
    ],
    company: [
      { title: '关于我们', href: '/about' },
      { title: '博客', href: '/blog' },
      { title: '帮助中心', href: '/help' },
      { title: '联系我们', href: '/contact' },
    ],
    developers: [
      { title: 'API 文档', href: '/docs' },
      { title: '人格标准', href: '/persona-standard' },
      { title: '开发指南', href: '/dev-guide' },
      { title: 'GitHub', href: 'https://github.com/juyiting' },
    ],
    legal: [
      { title: '隐私政策', href: '/privacy' },
      { title: '服务条款', href: '/terms' },
      { title: '许可协议', href: '/license' },
      { title: 'Cookie 政策', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">聚义厅</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/juyiting"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com/juyiting"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:hello@juyiting.com"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t('product')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t('company')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t('developers')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                    {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              {t('copyright')}
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <span className="text-sm text-gray-600">
                "{t('slogan')}"
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 