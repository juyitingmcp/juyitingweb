'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { corePersonas } from '@/lib/data/personas';
import { AIPersona } from '@/types';

export const runtime = 'edge';

export default function SettingsPage() {
  const t = useTranslations('settings');

  const [activeTab, setActiveTab] = useState('profile');
  const [personas, setPersonas] = useState(corePersonas);
  const [newPersona, setNewPersona] = useState<Omit<AIPersona, 'id'>>({
    name: '',
    avatar: '',
    description: '',
    is_core: false,
    user_id: 'user-custom',
    tags: []
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAddPersona = () => {
    const newId = `custom-${Date.now()}`;
    setPersonas([...personas, { ...newPersona, id: newId }]);
    setNewPersona({
      name: '',
      avatar: '',
      description: '',
      is_core: false,
      user_id: 'user-custom',
      tags: []
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {t('subtitle')}
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4">
          <nav className="flex flex-col space-y-2">
            <Button
              color={activeTab === 'profile' ? 'secondary' : 'default'}
              variant='ghost'
              className="justify-start"
              onClick={() => handleTabChange('profile')}
            >
              {t('tabs.profile')}
            </Button>
            <Button
              color={activeTab === 'personas' ? 'secondary' : 'default'}
              variant='ghost'
              className="justify-start"
              onClick={() => handleTabChange('personas')}
            >
              {t('tabs.personas')}
            </Button>
            <Button
              color={activeTab === 'billing' ? 'secondary' : 'default'}
              variant='ghost'
              className="justify-start"
              onClick={() => handleTabChange('billing')}
            >
              {t('tabs.billing')}
            </Button>
          </nav>
        </aside>

        <main className="w-full md:w-3/4">
          {activeTab === 'profile' && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('profile.title')}</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.name')}</label>
                  <Input id="name" type="text" defaultValue="Cobo" className="mt-1 block w-full"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('profile.email')}</label>
                  <Input id="email" type="email" defaultValue="cobo@pity.com" className="mt-1 block w-full" />
                </div>
                <Button type="submit" color='secondary'>{t('profile.save')}</Button>
              </form>
            </Card>
          )}

          {activeTab === 'personas' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{t('personas.title')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {personas.filter(p => p.is_core).map(persona => (
                  <Card key={persona.id} className="p-4 flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {persona.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{persona.name}</h3>
                      <p className="text-sm text-gray-500">{t('personas.core')}</p>
                    </div>
                  </Card>
                ))}
                 {personas.filter(p => !p.is_core).map(persona => (
                  <Card key={persona.id} className="p-4 flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="text-lg bg-gradient-to-br from-green-500 to-teal-500 text-white">
                        {persona.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{persona.name}</h3>
                      <p className="text-sm text-gray-500">{t('personas.custom')}</p>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">{t('personas.add_new')}</h3>
                <div className="space-y-4">
                    <Input placeholder={t('personas.name_placeholder')} value={newPersona.name} onChange={e => setNewPersona({...newPersona, name: e.target.value})} />
                    <Input placeholder={t('personas.avatar_placeholder')} value={newPersona.avatar} onChange={e => setNewPersona({...newPersona, avatar: e.target.value})}/>
                    <Textarea placeholder={t('personas.desc_placeholder')} value={newPersona.description} onChange={e => setNewPersona({...newPersona, description: e.target.value})}/>
                    <Button onClick={handleAddPersona} color='secondary'>{t('personas.add_button')}</Button>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'billing' && (
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{t('billing.title')}</h2>
              <p>{t('billing.current_plan')}: <span className="font-semibold">{t('billing.pro_plan')}</span></p>
              <p>{t('billing.next_billing_date')}: 2025-02-01</p>
              <Button className="mt-4" color='secondary'>{t('billing.manage_subscription')}</Button>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}
