'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  LayoutGrid, 
  List,
  Search
} from 'lucide-react';
import { corePersonas } from '@/lib/data/personas';
import { AIPersona } from '@/types';

export const runtime = 'edge';

interface ScenarioTemplate {
  id: string;
  title: string;
  description: string;
  persona_ids: string[];
  tags: string[];
  author: string;
  rating: number;
}

export default function ScenariosPage() {
  const t = useTranslations('scenarios');
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('popular');

  const templates: ScenarioTemplate[] = [
    {
      id: 'prod-design',
      title: t('templates.prod-design.title'),
      description: t('templates.prod-design.description'),
      persona_ids: ['demand-analyst', 'scene-king', 'product-officer', 'ux-designer'],
      tags: [t('categories.professional'), t('categories.design')],
      author: '聚义厅官方',
      rating: 4.8
    },
    {
        id: 'tech-dev',
        title: t('templates.tech-dev.title'),
        description: t('templates.tech-dev.description'),
        persona_ids: ['architect', 'code-hero', 'test-devil', 'ops-master'],
        tags: [t('categories.professional'), t('categories.tech')],
        author: '聚义厅官方',
        rating: 4.9
    },
    {
        id: 'mkt-plan',
        title: t('templates.mkt-plan.title'),
        description: t('templates.mkt-plan.description'),
        persona_ids: ['idea-king', 'data-sage', 'intuition-king', 'opportunity-eye'],
        tags: [t('categories.professional'), t('categories.marketing')],
        author: '聚义厅官方',
        rating: 4.7
    },
    {
        id: 'team-manage',
        title: t('templates.team-manage.title'),
        description: t('templates.team-manage.description'),
        persona_ids: ['commander', 'efficiency-maniac', 'warm-maid', 'scapegoat'],
        tags: [t('categories.professional'), t('categories.management')],
        author: '聚义厅官方',
        rating: 4.6
    },
    {
      id: 'career-plan',
      title: t('templates.career-plan.title'),
      description: t('templates.career-plan.description'),
      persona_ids: ['introspective-sage', 'grumpy-bro', 'warm-maid', 'data-sage'],
      tags: [t('categories.personal'), t('categories.decision')],
      author: '社区精选',
      rating: 4.9
    },
    {
        id: 'investment',
        title: t('templates.investment.title'),
        description: t('templates.investment.description'),
        persona_ids: ['data-sage', 'cautious-one', 'opportunity-eye', 'introspective-sage'],
        tags: [t('categories.personal'), t('categories.decision')],
        author: '社区精选',
        rating: 4.8
    },
    {
        id: 'startup-decision',
        title: t('templates.startup-decision.title'),
        description: t('templates.startup-decision.description'),
        persona_ids: ['thought-emperor', 'grumpy-bro', 'disruptor-king', 'data-sage', 'warm-maid'],
        tags: [t('categories.personal'), t('categories.decision')],
        author: '社区精选',
        rating: 5.0
    },
    {
        id: 'content-creation',
        title: t('templates.content-creation.title'),
        description: t('templates.content-creation.description'),
        persona_ids: ['idea-king', 'introspective-sage', 'happy-fruit', 'demand-analyst'],
        tags: [t('categories.creative'), t('categories.writing')],
        author: '社区精选',
        rating: 4.7
    }
  ];

  const categories = [
    'all',
    'professional',
    'personal',
    'creative',
    'design',
    'tech',
    'marketing',
    'management',
    'decision',
    'writing'
  ];

  const sortOptions = [
    { value: 'popular', label: t('sorts.popular') },
    { value: 'newest', label: t('sorts.newest') },
    { value: 'rating', label: t('sorts.rating') }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.tags.map(tag => t('categories_map.'+tag.split('.')[1], { ns: 'scenarios' })).includes(selectedCategory);
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) || template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPersonaById = (id: string) => {
    return corePersonas.find(p => p.id === id);
  };
  
  const handleCreateTeam = (persona_ids: string[]) => {
    const personaIdsQuery = persona_ids.join(',');
    router.push(`/chat?persona_ids=${personaIdsQuery}`);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder={t('search_placeholder')}
            className="w-full rounded-full bg-white pl-10 pr-4 py-2 dark:bg-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between md:justify-end gap-4">
            <div className='flex items-center gap-2'>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-[120px] rounded-full">
                        <SelectValue placeholder={t('sorts.title')} />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="hidden md:flex items-center gap-2 rounded-full bg-gray-200 p-1 dark:bg-gray-700">
                <Button color={viewMode === 'grid' ? 'secondary' : 'default'} variant='ghost' onClick={() => setViewMode('grid')}>
                    <LayoutGrid size={20} />
                </Button>
                <Button color={viewMode === 'list' ? 'secondary' : 'default'} variant='ghost' onClick={() => setViewMode('list')}>
                    <List size={20} />
                </Button>
            </div>
        </div>
      </div>

      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'solid' : 'bordered'}
              color={selectedCategory === category ? 'secondary' : 'default'}
              className="rounded-full whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>
      </div>

      <main className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
        {filteredTemplates.map(template => (
          <Card key={template.id} className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg dark:bg-gray-800">
            <div className="p-6 flex-grow">
              <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{t(tag)}</Badge>
                ))}
              </div>
              <div className="flex items-center mb-4">
                  <div className="flex -space-x-2 overflow-hidden">
                      {template.persona_ids.map(id => {
                          const persona = getPersonaById(id);
                          return persona ? (
                              <Avatar key={id} className="inline-block h-8 w-8 ring-2 ring-white dark:ring-gray-800">
                                <AvatarFallback className="text-sm bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                  {persona.avatar}
                                </AvatarFallback>
                              </Avatar>
                          ) : null;
                      })}
                  </div>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">+{template.persona_ids.length} {t('members')}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-6 dark:bg-gray-700/50 mt-auto">
              <Button className="w-full" color='secondary' onClick={() => handleCreateTeam(template.persona_ids)}>{t('create_team')}</Button>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
