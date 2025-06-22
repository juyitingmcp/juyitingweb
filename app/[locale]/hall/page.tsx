'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Search, Filter, Users, Star, Plus } from 'lucide-react';
import { corePersonas } from '@/lib/data/personas';
import { AIPersona } from '@/types';

interface PersonaCardProps {
  persona: AIPersona;
  onSelect: (persona: AIPersona) => void;
  isSelected: boolean;
}

function PersonaCard({ persona, onSelect, isSelected }: PersonaCardProps) {
  const getPersonaAvatar = (personaId: string) => {
    const avatarMap: Record<string, string> = {
      'introspective-sage': '🤔',
      'fiery-challenger': '🔥',
      'gentle-maid': '💕',
      'efficiency-master': '⚡',
      'data-emperor': '📊',
      'idea-king': '💡'
    };
    return avatarMap[personaId] || '🤖';
  };

  return (
    <div 
      className={`p-6 cursor-pointer transition-all hover:shadow-lg border rounded-lg ${
        isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'bg-white border-gray-200'
      }`} 
      onClick={() => onSelect(persona)}
    >
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12">
          <AvatarFallback className="text-lg">
            {getPersonaAvatar(persona.id)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {persona.name}
            </h3>
            {isSelected && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
          
          <Badge variant="outline" className="mb-2">
            {persona.role}
          </Badge>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {persona.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {persona.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {persona.skills.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{persona.skills.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>4.8</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>1.2k 使用</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HallPage() {
  const t = useTranslations('hall');
  const [selectedPersonas, setSelectedPersonas] = useState<AIPersona[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredPersonas = corePersonas.filter(persona => {
    const matchesSearch = persona.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         persona.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterRole === 'all' || persona.role === filterRole;
    
    return matchesSearch && matchesFilter;
  });

  const handlePersonaSelect = (persona: AIPersona) => {
    setSelectedPersonas(prev => {
      const isSelected = prev.some(p => p.id === persona.id);
      if (isSelected) {
        return prev.filter(p => p.id !== persona.id);
      } else if (prev.length < 6) { // 最多选择6个人格
        return [...prev, persona];
      }
      return prev;
    });
  };

  const roles = Array.from(new Set(corePersonas.map(p => p.role)));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              聚义厅人格大厅
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              选择您需要的AI人格组成专属智囊团，不同的人格将从各自的专业角度为您提供建议和分析
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索人格、技能或描述..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide">
              <Button
                variant={filterRole === 'all' ? 'solid' : 'bordered'}
                size="sm"
                onClick={() => setFilterRole('all')}
              >
                全部
              </Button>
              {roles.map(role => (
                <Button
                  key={role}
                  variant={filterRole === role ? 'solid' : 'bordered'}
                  size="sm"
                  onClick={() => setFilterRole(role)}
                >
                  {role}
                </Button>
              ))}
            </div>
          </div>

          {/* Selected Personas */}
          {selectedPersonas.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-900">
                  已选择的人格 ({selectedPersonas.length}/6)
                </h3>
                <Button
                  size="sm"
                  disabled={selectedPersonas.length === 0}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  开始协作
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedPersonas.map(persona => (
                  <Badge
                    key={persona.id}
                    variant="default"
                    className="flex items-center gap-1 px-3 py-1"
                  >
                    {persona.name}
                    <button
                      onClick={() => handlePersonaSelect(persona)}
                      className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Persona Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonas.map(persona => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onSelect={handlePersonaSelect}
              isSelected={selectedPersonas.some(p => p.id === persona.id)}
            />
          ))}
        </div>

        {filteredPersonas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              未找到匹配的人格
            </h3>
            <p className="text-gray-600">
              请尝试修改搜索条件或选择不同的分类
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 