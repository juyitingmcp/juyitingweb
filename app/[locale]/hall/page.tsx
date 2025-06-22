'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 左侧人格列表 */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">{t('persona_list')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 max-h-[70vh] overflow-y-auto pr-2">
                {corePersonas.map(persona => (
                  <div
                    key={persona.id} 
                    className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 rounded-lg border ${
                      selectedPersona?.id === persona.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg border-blue-200' 
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                    }`}
                    onClick={() => handleSelectPersona(persona)}
                    onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleSelectPersona(persona)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12 border-2 border-gray-200 dark:border-gray-600">
                        <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {persona.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {persona.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {persona.tags[0] && t(persona.tags[0])}
                        </p>
                      </div>
                      {selectedPersona?.id === persona.id && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 右侧人格详情 */}
          <div className="lg:col-span-8">
            {selectedPersona && (
              <Card className="p-8 bg-white dark:bg-gray-800 shadow-xl">
                <div className="text-center mb-8">
                  <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-gray-200 dark:border-gray-600">
                    <AvatarFallback className="text-6xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                      {selectedPersona.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedPersona.name}
                  </h3>
                  <div className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {selectedPersona.description.split('。')[0]}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                    <span className="mr-2">🏷️</span>
                    {t('tags_title')}
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedPersona.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 border-0"
                      >
                        {t(tag)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-xl mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                    <span className="mr-2">📋</span>
                    {t('description_title')}
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {selectedPersona.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300" 
                    onClick={handleStartChat}
                  >
                    <span className="mr-2">💬</span>
                    {t('start_chat_button')}
                  </Button>
                  <Button 
                    variant="bordered" 
                    size="lg"
                    className="px-6 border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                  >
                    <span className="mr-2">⭐</span>
                    收藏
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
