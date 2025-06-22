'use client';

import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Users, Bot } from 'lucide-react';
import { AIPersona, ChatMessage } from '@/types';
import { cn } from '@/lib/utils';

interface ScenarioTemplate {
  id: string;
  title: string;
  description: string;
  personas: string[];
  category: string;
  difficulty: string;
  duration: string;
}

interface PersonaChatProps {
  personas: AIPersona[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  className?: string;
  template?: ScenarioTemplate | null;
}

// Using ChatMessage type from types/index.ts

export function PersonaChat({ 
  personas, 
  onSendMessage, 
  isLoading = false,
  className,
  template
}: PersonaChatProps) {
  const getInitialMessage = () => {
    if (template) {
      return `欢迎使用「${template.title}」场景模板！\n\n${template.description}\n\n我们已经为您组建了专业团队：${template.personas.join('、')}。请描述您的具体问题，我们将基于这个场景为您提供专业的协作分析。`;
    }
    return '大家好！我们已经准备好为您提供全方位的智慧支持。请描述您需要协助的问题，我们会从不同角度为您分析和建议。';
  };

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化消息
  useEffect(() => {
    setMessages([{
      id: '1',
      content: getInitialMessage(),
      type: 'system',
      timestamp: new Date(),
    }]);
  }, [template]);

  // 清理函数：当组件卸载或模板改变时清理localStorage
  useEffect(() => {
    return () => {
      if (template) {
        localStorage.removeItem('selectedTemplate');
      }
    };
  }, [template]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    onSendMessage?.(inputValue);
    setInputValue('');

    // 模拟AI人格回复
    setTimeout(() => {
      personas.forEach((persona, index) => {
        setTimeout(() => {
          const personaMessage: ChatMessage = {
            id: `${Date.now()}-${index}`,
            content: getPersonaResponse(persona, inputValue),
            persona,
            type: 'persona',
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, personaMessage]);
        }, index * 1000);
      });
    }, 500);
  };

  const getPersonaResponse = (persona: AIPersona, userInput: string): string => {
    // 这里是模拟回复，实际中会调用AI API
    const baseResponses = {
      'introspective-sage': `让我深入思考一下这个问题。首先，我们需要理解问题的本质是什么？从第一性原理来看...`,
      'fiery-challenger': `等等！这里有几个问题需要质疑：你确定这样做是对的吗？有没有考虑到潜在的风险？`,
      'gentle-maid': `这确实是个值得关注的问题呢。我觉得您可以从这几个角度来考虑，不要有太大压力...`,
      'efficiency-master': `直接给你行动方案：1. 立即开始A 2. 同时准备B 3. 48小时内完成C。时间就是效率！`,
      'data-emperor': `根据我掌握的数据显示，类似情况的成功率是78.3%，主要影响因素包括...`,
      'idea-king': `哇！这让我想到一个超酷的想法：我们可以尝试从完全不同的角度来看这个问题...`
    };

    let response = baseResponses[persona.id as keyof typeof baseResponses] || `作为${persona.name}，我认为...`;
    
    // 如果有模板，添加场景相关的回复内容
    if (template) {
      const templateContext = `\n\n基于「${template.title}」场景，我建议...`;
      response += templateContext;
    }
    
    return response;
  };

  const getPersonaAvatar = (persona: AIPersona) => {
    const avatarMap = {
      'introspective-sage': '🤔',
      'fiery-challenger': '🔥',
      'gentle-maid': '💕',
      'efficiency-master': '⚡',
      'data-emperor': '📊',
      'idea-king': '💡'
    };
    return avatarMap[persona.id as keyof typeof avatarMap] || '🤖';
  };

  return (
    <Card className={cn('flex flex-col h-[600px] max-w-4xl mx-auto', className)}>
      {/* 聊天头部 */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">聚义厅协作</h3>
          <Badge variant="secondary">
            {personas.length} 位智者
          </Badge>
        </div>
        <div className="flex -space-x-2">
          {personas.map((persona) => (
            <Avatar key={persona.id} className="w-8 h-8 border-2 border-white">
              <AvatarFallback className="text-xs">
                {getPersonaAvatar(persona)}
              </AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>

      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'flex gap-3',
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.type !== 'user' && (
              <Avatar className="w-8 h-8 mt-1">
                {message.persona ? (
                  <AvatarFallback>
                    {getPersonaAvatar(message.persona)}
                  </AvatarFallback>
                ) : (
                  <AvatarFallback>
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                )}
              </Avatar>
            )}
            
            <div
              className={cn(
                'max-w-[70%] rounded-lg p-3',
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.type === 'system'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-white border shadow-sm'
              )}
            >
              {message.persona && (
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{message.persona.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {message.persona.tags[0] || 'Persona'}
                  </Badge>
                </div>
              )}
              <p className="text-gray-800 dark:text-gray-200" style={{ whiteSpace: 'pre-wrap' }}>
                {message.content}
              </p>
              <span className="text-xs opacity-60 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>

            {message.type === 'user' && (
              <Avatar className="w-8 h-8 mt-1">
                <AvatarFallback>👤</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="描述您需要协助的问题，聚义厅智者们将为您提供全方位的建议..."
            className="flex-1 resize-none"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="self-end"
            size="sm"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>按 Enter 发送，Shift + Enter 换行</span>
          <span>{inputValue.length}/500</span>
        </div>
      </div>
    </Card>
  );
} 