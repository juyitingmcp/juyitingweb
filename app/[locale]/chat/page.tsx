'use client';

import { useState, useEffect, Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { PersonaChat } from '@/components/chat/persona-chat';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Settings, Download, Share, Target, Clock } from 'lucide-react';
import { corePersonas } from '@/lib/data/personas';
import { AIPersona } from '@/types';

export const runtime = 'edge';

interface ScenarioTemplate {
  id: string;
  title: string;
  description: string;
  personas: string[];
  category: string;
  difficulty: string;
  duration: string;
}

function ChatPageContent() {
  const t = useTranslations('chat');
  const searchParams = useSearchParams();
  const [selectedPersonas, setSelectedPersonas] = useState<AIPersona[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<ScenarioTemplate | null>(null);

  // 处理场景模板加载
  useEffect(() => {
    const templateId = searchParams.get('template');
    
    if (templateId) {
      // 从localStorage获取模板数据
      const templateData = localStorage.getItem('selectedTemplate');
      if (templateData) {
        const template: ScenarioTemplate = JSON.parse(templateData);
        setCurrentTemplate(template);
        
        // 根据模板的人格名称匹配实际的人格对象
        const matchedPersonas = template.personas.map(personaName => {
          return corePersonas.find(p => p.name === personaName);
        }).filter(Boolean) as AIPersona[];
        
        setSelectedPersonas(matchedPersonas);
      }
    } else {
      // 默认选择前4个人格
      setSelectedPersonas(corePersonas.slice(0, 4));
    }
  }, [searchParams]);

  const getPersonaAvatar = (personaId: string) => {
    const persona = corePersonas.find(p => p.id === personaId);
    return persona?.avatar || '🤖';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'default';
      case 'intermediate': return 'secondary';  
      case 'advanced': return 'destructive';
      default: return 'default';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '入门';
      case 'intermediate': return '中级';
      case 'advanced': return '高级';
      default: return '未知';
    }
  };

  const handleSendMessage = (message: string) => {
    console.log('发送消息:', message);
    // 这里将来会集成实际的AI API
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧边栏 - 人格信息 */}
          <div className="lg:col-span-1 space-y-4">
            {/* 场景模板信息 */}
            {currentTemplate && (
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold">当前场景</h3>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{currentTemplate.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{currentTemplate.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant={getDifficultyColor(currentTemplate.difficulty)}>
                      {getDifficultyText(currentTemplate.difficulty)}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {currentTemplate.duration}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* 当前团队 */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">当前团队</h3>
                <Badge variant="secondary">
                  {selectedPersonas.length} 位智者
                </Badge>
              </div>
              
              <div className="space-y-3">
                {selectedPersonas.map(persona => (
                  <div key={persona.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-sm">
                        {getPersonaAvatar(persona.id)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {persona.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {persona.description}
                      </p>
                    </div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                ))}
              </div>

              <Button 
                variant="bordered" 
                size="sm" 
                className="w-full mt-4"
              >
                <Users className="w-4 h-4 mr-2" />
                调整团队
              </Button>
            </Card>

            {/* 会话设置 */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">会话设置</h3>
              
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    协作模式
                  </label>
                  <select className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2">
                    <option>并行讨论</option>
                    <option>轮流发言</option>
                    <option>深度对话</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    回复长度
                  </label>
                  <select className="mt-1 block w-full text-sm border border-gray-300 rounded-md px-3 py-2">
                    <option>简洁回复</option>
                    <option>标准回复</option>
                    <option>详细分析</option>
                  </select>
                </div>
              </div>

              <Button 
                variant="bordered" 
                size="sm" 
                className="w-full mt-4"
              >
                <Settings className="w-4 h-4 mr-2" />
                更多设置
              </Button>
            </Card>

            {/* 快速操作 */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">快速操作</h3>
              
              <div className="space-y-2">
                <Button variant="bordered" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  导出对话
                </Button>
                <Button variant="bordered" size="sm" className="w-full justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  分享会话
                </Button>
              </div>
            </Card>
          </div>

          {/* 右侧主聊天区域 */}
          <div className="lg:col-span-3">
            <PersonaChat
              personas={selectedPersonas}
              onSendMessage={handleSendMessage}
              className="h-[80vh]"
              template={currentTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载聊天室...</p>
        </div>
      </div>
    }>
      <ChatPageContent />
    </Suspense>
  );
}