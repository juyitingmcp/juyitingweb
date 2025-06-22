'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  X, 
  Users, 
  MessageSquare, 
  Settings, 
  Crown,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');

  const navItems = [
    {
      title: t('hall'),
      href: '/hall',
      icon: Users,
      description: '人格大厅'
    },
    {
      title: t('chat'),
      href: '/chat',
      icon: MessageSquare,
      description: '协作聊天'
    },
    {
      title: t('scenarios'),
      href: '/scenarios',
      icon: Crown,
      description: '场景模板'
    },
    {
      title: t('settings'),
      href: '/settings',
      icon: Settings,
      description: '设置'
    }
  ];

  return (
    <nav className={cn('bg-white border-b border-gray-200 sticky top-0 z-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              聚义厅
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.title}</span>
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="bordered" size="sm">
              <Globe className="w-4 h-4 mr-2" />
              中文
            </Button>
            <Button variant="bordered" size="sm">
              登录
            </Button>
            <a href="/hall">
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600">
                开始协作
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="bordered"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button variant="bordered" className="w-full justify-start">
                <Globe className="w-4 h-4 mr-2" />
                语言设置
              </Button>
              <Button variant="bordered" className="w-full">
                登录
              </Button>
              <a href="/hall" className="w-full">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                  开始协作
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 