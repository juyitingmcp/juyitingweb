'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
}

export function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="absolute inset-0 bg-grid-gray-100 dark:bg-grid-gray-800 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* 标题部分 */}
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            <span className="block">{title}</span>
          </h1>
          
          {/* 副标题 */}
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300 sm:text-2xl">
            {subtitle}
          </p>
          
          {/* 描述 */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            {description}
          </p>
          
          {/* CTA按钮 */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href={primaryCTA.href}>
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            
            <a href={secondaryCTA.href}>
              <Button
                variant="ghost"
                size="lg"
                className="text-gray-900 dark:text-white px-8 py-3 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                {secondaryCTA.text}
              </Button>
            </a>
          </div>
          
          {/* 装饰性元素 */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg" />
              <div className="relative flex items-center space-x-4 rounded-lg bg-white/80 dark:bg-gray-800/80 p-6 backdrop-blur-sm">
                <div className="flex -space-x-2">
                  {[
                    { name: '女仆', color: 'bg-pink-500' },
                    { name: '效率狂', color: 'bg-blue-500' },
                    { name: '数据帝', color: 'bg-green-500' },
                    { name: '点子王', color: 'bg-yellow-500' },
                  ].map((persona, index) => (
                    <div
                      key={persona.name}
                      className={`h-10 w-10 rounded-full ${persona.color} border-2 border-white dark:border-gray-800 flex items-center justify-center text-white text-sm font-medium`}
                      title={persona.name}
                    >
                      {persona.name[0]}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">4+</span> 个核心人格随时待命
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 