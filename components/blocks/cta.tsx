'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Users } from 'lucide-react';

interface CTAProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTA({ title, description, primaryCTA, secondaryCTA }: CTAProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3 h-auto"
            onClick={() => window.open(primaryCTA.href, '_self')}
          >
            <Users className="w-5 h-5 mr-2" />
            {primaryCTA.text}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {secondaryCTA && (
            <Button
              variant="bordered"
              size="lg"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-3 h-auto"
              onClick={() => window.open(secondaryCTA.href, '_self')}
            >
              {secondaryCTA.text}
            </Button>
          )}
        </div>

        {/* Stats or social proof */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm text-blue-100">活跃用户</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">50,000+</div>
              <div className="text-sm text-blue-100">协作会话</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-sm text-blue-100">AI人格</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98%</div>
              <div className="text-sm text-blue-100">用户满意度</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 