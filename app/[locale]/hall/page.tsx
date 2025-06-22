'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { corePersonas } from '@/lib/data/personas';
import { AIPersona } from '@/types';

export const runtime = 'edge';

export default function HallPage() {
  const t = useTranslations('hall');
  const router = useRouter();
  const [selectedPersona, setSelectedPersona] = useState<AIPersona | null>(corePersonas[0]);

  const handleSelectPersona = (persona: AIPersona) => {
    setSelectedPersona(persona);
  };

  const handleStartChat = () => {
    if (selectedPersona) {
      router.push(`/chat?persona_ids=${selectedPersona.id}`);
    }
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">{t('persona_list')}</h2>
          <div className="space-y-2">
            {corePersonas.map(persona => (
              <div 
                key={persona.id} 
                className={`p-3 cursor-pointer transition-all rounded-lg ${selectedPersona?.id === persona.id ? 'ring-2 ring-primary bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}
                onClick={() => handleSelectPersona(persona)}
                onKeyDown={(e) => e.key === 'Enter' && handleSelectPersona(persona)}
                role="button"
                tabIndex={0}
              >
                <Card className="pointer-events-none">
                  <div className="flex items-center space-x-3">
                    <img src={persona.avatar} alt={persona.name} className="w-10 h-10 rounded-full" />
                    <span className="font-medium">{persona.name}</span>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          {selectedPersona && (
            <Card className="p-6 sticky top-8">
              <div className="text-center">
                <img src={selectedPersona.avatar} alt={selectedPersona.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                <h3 className="text-2xl font-bold">{selectedPersona.name}</h3>
                <p className="text-md text-gray-500 mb-4">{selectedPersona.description.split('。')[0]}</p>
              </div>
              
              <div className="my-6">
                <h4 className="font-semibold text-lg mb-3">{t('tags_title')}</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPersona.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{t(tag)}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">{t('description_title')}</h4>
                <p className="text-gray-700 whitespace-pre-line">{selectedPersona.description}</p>
              </div>

              <Button size="lg" className="w-full mt-6" color="primary" onClick={handleStartChat}>
                {t('start_chat_button', { name: selectedPersona.name })}
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
