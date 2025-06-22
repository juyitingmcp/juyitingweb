'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Settings,
  User,
  Bell,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Download,
  Trash2,
  Save,
  RotateCcw,
  Check,
  X
} from 'lucide-react';

interface SettingsTab {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

export default function SettingsPage() {
  const t = useTranslations('settings');
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    language: 'zh-CN',
    theme: 'light',
    timezone: 'Asia/Shanghai',
    autoSave: true,
    defaultPersonas: ['自省姐', '暴躁老哥', '女仆'],
    personaStyle: 'collaborative',
    emailNotifications: true,
    pushNotifications: true,
    collaborationUpdates: true,
    systemUpdates: false,
    weeklyDigest: true,
  });

  const tabs: SettingsTab[] = [
    { id: 'general', label: t('tabs.general'), icon: Settings },
    { id: 'personas', label: t('tabs.personas'), icon: User },
    { id: 'notifications', label: t('tabs.notifications'), icon: Bell },
    { id: 'account', label: t('tabs.account'), icon: Globe },
  ];

  const availablePersonas = [
    '自省姐', '暴躁老哥', '女仆', '效率狂', '数据帝', '点子王',
    '拆解大师', '破局王', '开心果', '直觉王', '机会眼', '谨慎派'
  ];

  const personaStyles = [
    { id: 'collaborative', label: t('personas.collaborative') },
    { id: 'direct', label: t('personas.direct') },
    { id: 'detailed', label: t('personas.detailed') },
    { id: 'concise', label: t('personas.concise') },
  ];

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePersonaToggle = (persona: string) => {
    const currentPersonas = settings.defaultPersonas;
    if (currentPersonas.includes(persona)) {
      handleSettingChange('defaultPersonas', currentPersonas.filter(p => p !== persona));
    } else if (currentPersonas.length < 6) {
      handleSettingChange('defaultPersonas', [...currentPersonas, persona]);
    }
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('general.title')}</h3>
        
        {/* Language Setting */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('general.language')}</label>
          <select 
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="zh-CN">中文（简体）</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Theme Setting */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('general.theme')}</label>
          <div className="flex space-x-3">
            <Button
              variant={settings.theme === 'light' ? 'solid' : 'bordered'}
              onClick={() => handleSettingChange('theme', 'light')}
              className="flex items-center space-x-2"
            >
              <Sun className="w-4 h-4" />
              <span>浅色</span>
            </Button>
            <Button
              variant={settings.theme === 'dark' ? 'solid' : 'bordered'}
              onClick={() => handleSettingChange('theme', 'dark')}
              className="flex items-center space-x-2"
            >
              <Moon className="w-4 h-4" />
              <span>深色</span>
            </Button>
          </div>
        </div>

        {/* Auto Save Setting */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium">{t('general.autoSave')}</label>
              <p className="text-sm text-gray-500">{t('general.autoSaveDescription')}</p>
            </div>
            <Button
              variant={settings.autoSave ? 'solid' : 'bordered'}
              onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
              className="flex items-center space-x-2"
            >
              {settings.autoSave ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              <span>{settings.autoSave ? '已开启' : '已关闭'}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPersonaSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('personas.title')}</h3>
        
        {/* Default Personas */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('personas.defaultPersonas')}</label>
          <p className="text-sm text-gray-500 mb-4">{t('personas.defaultPersonasDescription')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {availablePersonas.map((persona) => (
              <Button
                key={persona}
                variant={settings.defaultPersonas.includes(persona) ? 'solid' : 'bordered'}
                onClick={() => handlePersonaToggle(persona)}
                className="text-sm"
                disabled={!settings.defaultPersonas.includes(persona) && settings.defaultPersonas.length >= 6}
              >
                {persona}
              </Button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            已选择 {settings.defaultPersonas.length}/6 个人格
          </p>
        </div>

        {/* Persona Style */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">{t('personas.personaStyle')}</label>
          <p className="text-sm text-gray-500 mb-4">{t('personas.personaStyleDescription')}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {personaStyles.map((style) => (
              <Button
                key={style.id}
                variant={settings.personaStyle === style.id ? 'solid' : 'bordered'}
                onClick={() => handleSettingChange('personaStyle', style.id)}
                className="text-sm"
              >
                {style.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('notifications.title')}</h3>
        
        {/* Notification Toggles */}
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: t('notifications.emailNotifications') },
            { key: 'pushNotifications', label: t('notifications.pushNotifications') },
            { key: 'collaborationUpdates', label: t('notifications.collaborationUpdates') },
            { key: 'systemUpdates', label: t('notifications.systemUpdates') },
            { key: 'weeklyDigest', label: t('notifications.weeklyDigest') },
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {settings[notification.key as keyof typeof settings] ? 
                  <Volume2 className="w-5 h-5 text-green-500" /> : 
                  <VolumeX className="w-5 h-5 text-gray-400" />
                }
                <span className="font-medium">{notification.label}</span>
              </div>
              <Button
                variant={settings[notification.key as keyof typeof settings] ? 'solid' : 'bordered'}
                onClick={() => handleSettingChange(notification.key, !settings[notification.key as keyof typeof settings])}
                size="sm"
              >
                {settings[notification.key as keyof typeof settings] ? '开启' : '关闭'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAccountSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">{t('account.title')}</h3>
        
        {/* Account Actions */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('account.profile')}</h4>
                <p className="text-sm text-gray-500">管理您的个人资料信息</p>
              </div>
              <Button variant="bordered">编辑资料</Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('account.subscription')}</h4>
                <p className="text-sm text-gray-500">查看和管理您的订阅计划</p>
              </div>
              <Badge variant="default">专业版</Badge>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('account.usage')}</h4>
                <p className="text-sm text-gray-500">查看您的使用统计和配额</p>
              </div>
              <Button variant="bordered">查看详情</Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('account.dataExport')}</h4>
                <p className="text-sm text-gray-500">导出您的协作历史和数据</p>
              </div>
              <Button variant="bordered" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{t('actions.export')}</span>
              </Button>
            </div>
          </Card>

          <Card className="p-4 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-red-600">{t('account.deleteAccount')}</h4>
                <p className="text-sm text-red-500">永久删除您的账户和所有数据</p>
              </div>
              <Button variant="bordered" color="danger" className="flex items-center space-x-2">
                <Trash2 className="w-4 h-4" />
                <span>{t('actions.delete')}</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'personas':
        return renderPersonaSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'account':
        return renderAccountSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('description')}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:w-1/4">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <Card className="p-6">
              {renderTabContent()}
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button variant="bordered" className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>{t('actions.reset')}</span>
                </Button>
                <div className="flex space-x-3">
                  <Button variant="bordered">{t('actions.cancel')}</Button>
                  <Button className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{t('actions.save')}</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 