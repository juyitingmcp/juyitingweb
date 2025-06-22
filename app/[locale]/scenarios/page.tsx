'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Lightbulb, 
  Code, 
  TrendingUp, 
  Users, 
  Target,
  Clock,
  Star,
  ArrowRight,
  Search
} from 'lucide-react';

interface ScenarioTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  personas: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: React.ComponentType<any>;
  usageCount: number;
  rating: number;
}

export default function ScenariosPage() {
  const t = useTranslations('scenarios');
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const scenarioTemplates: ScenarioTemplate[] = [
    // 商业决策类
    {
      id: 'startup-evaluation',
      title: '创业项目评估',
      description: '全方位分析创业项目的可行性、风险和机会，提供专业决策建议',
      category: 'business',
      personas: ['自省姐', '暴躁老哥', '数据帝', '女仆', '效率狂'],
      duration: '30-45分钟',
      difficulty: 'intermediate',
      icon: TrendingUp,
      usageCount: 1247,
      rating: 4.8
    },
    {
      id: 'investment-analysis',
      title: '投资决策分析',
      description: '深度分析投资机会，评估风险收益比，制定投资策略',
      category: 'business',
      personas: ['数据帝', '谨慎派', '机会眼', '自省姐'],
      duration: '25-40分钟',
      difficulty: 'advanced',
      icon: Target,
      usageCount: 892,
      rating: 4.7
    },
    {
      id: 'market-strategy',
      title: '市场策略规划',
      description: '制定产品市场策略，分析竞争环境，设计推广方案',
      category: 'business',
      personas: ['思维帝', '点子王', '数据帝', '机会眼'],
      duration: '35-50分钟',
      difficulty: 'intermediate',
      icon: Users,
      usageCount: 654,
      rating: 4.6
    },
    
    // 创意创新类
    {
      id: 'product-innovation',
      title: '产品创新设计',
      description: '从用户需求出发，设计创新产品功能和体验',
      category: 'creative',
      personas: ['点子王', '需求帝', '场景王', '用户体验师'],
      duration: '40-60分钟',
      difficulty: 'intermediate',
      icon: Lightbulb,
      usageCount: 1156,
      rating: 4.9
    },
    {
      id: 'content-creation',
      title: '内容创作策划',
      description: '策划有影响力的内容，从选题到执行的全流程指导',
      category: 'creative',
      personas: ['点子王', '自省姐', '开心果', '需求帝'],
      duration: '20-35分钟',
      difficulty: 'beginner',
      icon: Brain,
      usageCount: 2341,
      rating: 4.5
    },
    
    // 技术开发类
    {
      id: 'architecture-design',
      title: '系统架构设计',
      description: '设计可扩展的系统架构，考虑性能、安全和维护性',
      category: 'technical',
      personas: ['架构师', '代码侠', '测试鬼', '运维通'],
      duration: '45-70分钟',
      difficulty: 'advanced',
      icon: Code,
      usageCount: 743,
      rating: 4.8
    },
    {
      id: 'bug-analysis',
      title: '问题诊断分析',
      description: '系统性分析技术问题，找到根因并制定解决方案',
      category: 'technical',
      personas: ['拆解大师', '代码侠', '背锅侠', '测试鬼'],
      duration: '25-40分钟',
      difficulty: 'intermediate',
      icon: Target,
      usageCount: 567,
      rating: 4.7
    },
    
    // 个人成长类
    {
      id: 'career-planning',
      title: '职业规划指导',
      description: '分析个人优势和市场机会，制定职业发展路径',
      category: 'personal',
      personas: ['自省姐', '女仆', '数据帝', '效率狂'],
      duration: '30-45分钟',
      difficulty: 'beginner',
      icon: TrendingUp,
      usageCount: 1876,
      rating: 4.6
    },
    {
      id: 'skill-learning',
      title: '技能学习规划',
      description: '制定系统性的技能学习计划，提高学习效率',
      category: 'personal',
      personas: ['拆解大师', '效率狂', '牛马弟', '开心果'],
      duration: '20-30分钟',
      difficulty: 'beginner',
      icon: Brain,
      usageCount: 1432,
      rating: 4.4
    },

    // --- 新增模板 ---

    // 商业决策类
    {
      id: 'enterprise-risk-management',
      title: '企业风险管控',
      description: '全面识别和评估企业潜在风险，制定预防和应对策略，确保稳健运营',
      category: 'business',
      personas: ['谨慎派', '数据帝', '暴躁老哥', '背锅侠', '指挥官'],
      duration: '40-60分钟',
      difficulty: 'advanced',
      icon: Target,
      usageCount: 412,
      rating: 4.9
    },
    {
      id: 'business-model-innovation',
      title: '商业模式创新',
      description: '颠覆传统商业模式，设计和验证具有竞争力的创新商业模式',
      category: 'business',
      personas: ['破局王', '思维帝', '机会眼', '数据帝', '谨慎派'],
      duration: '50-75分钟',
      difficulty: 'advanced',
      icon: TrendingUp,
      usageCount: 389,
      rating: 4.8
    },

    // 创意创新类
    {
      id: 'marketing-campaign-design',
      title: '营销活动策划',
      description: '策划一场从创意到执行的全链路病毒式营销活动',
      category: 'creative',
      personas: ['点子王', '机会眼', '数据帝', '开心果', '效率狂'],
      duration: '35-50分钟',
      difficulty: 'intermediate',
      icon: Lightbulb,
      usageCount: 978,
      rating: 4.7
    },

    // 技术开发类
    {
      id: 'technical-debt-review',
      title: '技术债评审',
      description: '全面评审和量化技术债，制定分阶段偿还计划，提升系统健康度',
      category: 'technical',
      personas: ['架构师', '代码侠', '数据帝', '项目帝', '谨慎派'],
      duration: '45-60分钟',
      difficulty: 'advanced',
      icon: Code,
      usageCount: 245,
      rating: 4.6
    },
    {
      id: 'critical-incident-response',
      title: '重大故障复盘',
      description: '快速响应并彻底复盘线上重大故障，从根源上解决问题并建立防范机制',
      category: 'technical',
      personas: ['运维通', '监控眼', '背锅侠', '拆解大师', '架构师'],
      duration: '60-90分钟',
      difficulty: 'advanced',
      icon: Target,
      usageCount: 198,
      rating: 4.9
    },

    // 个人成长类
    {
      id: 'complex-negotiation-strategy',
      title: '复杂谈判策略',
      description: '为关键谈判制定策略，分析对手，设计双赢方案',
      category: 'personal',
      personas: ['思维帝', '女仆', '机会眼', '谨慎派', '数据帝'],
      duration: '30-45分钟',
      difficulty: 'intermediate',
      icon: Users,
      usageCount: 765,
      rating: 4.8
    },

    // 新增分类：项目管理
    {
      id: 'agile-project-kickoff',
      title: '敏捷项目启动',
      description: '规划并启动一个敏捷项目，定义MVP，拆解用户故事，制定迭代计划',
      category: 'management',
      personas: ['项目帝', '需求帝', '拆解大师', '架构师', '效率狂'],
      duration: '40-55分钟',
      difficulty: 'intermediate',
      icon: Users,
      usageCount: 512,
      rating: 4.7
    },
    {
      id: 'team-conflict-resolution',
      title: '团队冲突解决',
      description: '分析团队内部冲突根源，制定有效的沟通和解决方案，重建团队信任',
      category: 'management',
      personas: ['指挥官', '女仆', '背锅侠', '自省姐', '开心果'],
      duration: '25-40分钟',
      difficulty: 'intermediate',
      icon: Users,
      usageCount: 321,
      rating: 4.6
    },
    
    // 新增分类：产品开发
    {
      id: 'full-feature-development',
      title: '全功能开发规划',
      description: '从需求到上线，规划一个完整功能的开发全流程，覆盖设计、开发、测试、部署',
      category: 'product',
      personas: ['产品官', '需求帝', '场景王', '架构师', '项目帝', '测试鬼'],
      duration: '60-120分钟',
      difficulty: 'advanced',
      icon: Code,
      usageCount: 488,
      rating: 4.9
    },
    {
      id: 'user-feedback-analysis',
      title: '用户反馈深度分析',
      description: '系统性收集和分析用户反馈，挖掘潜在需求，转化为可执行的产品改进方案',
      category: 'product',
      personas: ['数据帝', '需求帝', '产品官', '自省姐', '女仆'],
      duration: '30-50分钟',
      difficulty: 'intermediate',
      icon: Brain,
      usageCount: 812,
      rating: 4.8
    },
    
    // 新增分类：战略分析
    {
      id: 'swot-deep-analysis',
      title: 'SWOT深度分析',
      description: '运用多个人格视角，对企业或个人进行全面、客观、深入的SWOT分析',
      category: 'strategy',
      personas: ['思维帝', '机会眼', '暴躁老哥', '数据帝', '自省姐'],
      duration: '35-50分钟',
      difficulty: 'intermediate',
      icon: Brain,
      usageCount: 1024,
      rating: 4.7
    },
    {
      id: 'competitor-deep-dive',
      title: '竞争对手深度剖析',
      description: '从战略、产品、技术、市场等多维度，系统性剖析核心竞争对手',
      category: 'strategy',
      personas: ['数据帝', '暴躁老哥', '架构师', '产品官', '机会眼'],
      duration: '45-70分钟',
      difficulty: 'advanced',
      icon: Target,
      usageCount: 633,
      rating: 4.8
    }
  ];

  const categories = [
    { id: 'all', name: '全部', count: scenarioTemplates.length },
    { id: 'business', name: t('categories.business'), count: scenarioTemplates.filter(s => s.category === 'business').length },
    { id: 'creative', name: t('categories.creative'), count: scenarioTemplates.filter(s => s.category === 'creative').length },
    { id: 'technical', name: t('categories.technical'), count: scenarioTemplates.filter(s => s.category === 'technical').length },
    { id: 'personal', name: t('categories.personal'), count: scenarioTemplates.filter(s => s.category === 'personal').length },
    { id: 'management', name: t('categories.management'), count: scenarioTemplates.filter(s => s.category === 'management').length },
    { id: 'product', name: t('categories.product'), count: scenarioTemplates.filter(s => s.category === 'product').length },
    { id: 'strategy', name: t('categories.strategy'), count: scenarioTemplates.filter(s => s.category === 'strategy').length },
  ];

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

  const handleUseTemplate = (scenario: ScenarioTemplate) => {
    // 将选中的场景模板信息存储到localStorage
    const templateData = {
      id: scenario.id,
      title: scenario.title,
      description: scenario.description,
      personas: scenario.personas,
      category: scenario.category,
      difficulty: scenario.difficulty,
      duration: scenario.duration
    };
    
    localStorage.setItem('selectedTemplate', JSON.stringify(templateData));
    
    // 跳转到聊天页面
    router.push('/chat?template=' + scenario.id);
  };

  const filteredScenarios = scenarioTemplates.filter(scenario => {
    const matchesCategory = selectedCategory === 'all' || scenario.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.personas.some(persona => persona.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('description')}
          </p>
          <p className="text-gray-500">
            {t('subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="搜索场景模板..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'solid' : 'bordered'}
              className="min-w-[120px]"
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Scenario Templates Grid */}
        {filteredScenarios.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              没有找到匹配的场景模板
            </h3>
            <p className="text-gray-600 mb-6">
              试试调整搜索关键词或选择不同的分类
            </p>
            <Button 
              variant="bordered"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              清除筛选条件
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScenarios.map((scenario) => {
            const IconComponent = scenario.icon;
            return (
              <Card 
                key={scenario.id} 
                className="hover:shadow-lg transition-shadow duration-300 cursor-pointer p-6"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {scenario.title}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge 
                          variant={getDifficultyColor(scenario.difficulty)}
                        >
                          {getDifficultyText(scenario.difficulty)}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{scenario.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm">
                  {scenario.description}
                </p>
                
                {/* Personas */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">参与人格：</div>
                  <div className="flex flex-wrap gap-1">
                    {scenario.personas.map((persona) => (
                      <Badge 
                        key={persona} 
                        variant="outline"
                        className="text-xs"
                      >
                        {persona}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{scenario.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{scenario.usageCount.toLocaleString()} 次使用</span>
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full"
                  onClick={() => handleUseTemplate(scenario)}
                >
                  使用模板
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            );
          })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              没找到合适的模板？
            </h2>
            <p className="text-gray-600 mb-6">
              您可以创建自定义场景模板，或者直接进入聊天开始自由协作
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                创建自定义模板
              </Button>
              <Button 
                variant="bordered" 
                size="lg"
                onClick={() => router.push('/chat')}
              >
                直接开始协作
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 