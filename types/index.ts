// 人格相关类型
export interface AIPersona {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  avatar?: string;
  traits: PersonalityTraits;
  capabilities: PersonaCapabilities;
}

export interface PersonalityTraits {
  tone: string;
  style: string;
  focus: string[];
  approach: string;
}

export interface PersonaCapabilities {
  primarySkills: string[];
  domainExpertise: string[];
  thinkingPatterns: string[];
}

// 协作会话类型
export interface CollaborationSession {
  id: string;
  title: string;
  description: string;
  personas: AIPersona[];
  messages: SessionMessage[];
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface SessionMessage {
  id: string;
  content: string;
  role: 'user' | 'persona';
  personaId?: string;
  timestamp: Date;
  type: MessageType;
}

export type SessionStatus = 'active' | 'completed' | 'paused';
export type MessageType = 'question' | 'analysis' | 'suggestion' | 'summary';

// 聊天消息类型
export interface ChatMessage {
  id: string;
  content: string;
  persona?: AIPersona;
  timestamp: Date;
  type: 'user' | 'persona' | 'system';
}

// 场景模板类型
export interface ScenarioTemplate {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  recommendedPersonas: string[];
  minPersonas: number;
  maxPersonas: number;
  prompts: TemplatePrompt[];
}

export interface TemplatePrompt {
  id: string;
  text: string;
  order: number;
  required: boolean;
}

export type ScenarioCategory = 
  | 'decision-making'
  | 'creative-brainstorming'
  | 'technical-analysis'
  | 'strategic-planning'
  | 'problem-solving';

// 用户相关类型
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  plan: UserPlan;
  credits: number;
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  language: 'zh-CN' | 'en';
  theme: 'light' | 'dark';
  favoritePersonas: string[];
  defaultScenario?: string;
}

export type UserPlan = 'free' | 'pro' | 'enterprise';

// API 响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 