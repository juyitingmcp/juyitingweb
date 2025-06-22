import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LOCALES } from '@/i18n/routing';
import { Hero } from '@/components/blocks/hero';
import { Features } from '@/components/blocks/features';
import { Personas } from '@/components/blocks/personas';
import { Pricing } from '@/components/blocks/pricing';
import { CTA } from '@/components/blocks/cta';

interface Props {
  params: Promise<{ locale: LOCALES }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = await getTranslations();

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCTA={{
          text: t('hero.cta'),
          href: '/hall',
        }}
        secondaryCTA={{
          text: t('hero.secondaryCta'),
          href: '#demo',
        }}
      />

      {/* Features Section */}
      <Features
        title={t('features.title')}
        subtitle={t('features.subtitle')}
        items={t.raw('features.items')}
      />

      {/* Personas Section */}
      <Personas
        title={t('personas.title')}
        subtitle={t('personas.subtitle')}
        personas={t.raw('personas.items')}
      />

      {/* Pricing Section */}
      <Pricing
        title={t('pricing.title')}
        subtitle={t('pricing.subtitle')}
        plans={t.raw('pricing.plans')}
        monthlyText={t('pricing.monthly')}
        yearlyText={t('pricing.yearly')}
      />

      {/* CTA Section */}
      <CTA
        title="开始您的AI人格协作之旅"
        description="立即体验聚义厅，让AI智囊团为您提供专业建议"
        primaryCTA={{
          text: t('common.getStarted'),
          href: '/hall',
        }}
      />
    </main>
  );
} 