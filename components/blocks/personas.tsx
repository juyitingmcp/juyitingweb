'use client';

interface PersonaItem {
  name: string;
  role: string;
  description: string;
  skills: string[];
}

interface PersonasProps {
  title: string;
  subtitle: string;
  personas: PersonaItem[];
}

export function Personas({ title, subtitle, personas }: PersonasProps) {
  const colors = [
    'bg-pink-500', 'bg-red-500', 'bg-green-500', 
    'bg-blue-500', 'bg-purple-500', 'bg-yellow-500'
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题部分 */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* 人格卡片 */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {personas.map((persona, index) => (
            <div 
              key={persona.name}
              className="persona-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* 头像 */}
              <div className="flex items-center space-x-4 mb-4">
                <div 
                  className={`w-12 h-12 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-bold text-lg`}
                >
                  {persona.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {persona.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {persona.role}
                  </p>
                </div>
              </div>

              {/* 描述 */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                {persona.description}
              </p>

              {/* 技能标签 */}
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 底部CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            体验智能人格协作，开启全新的思维模式
          </p>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            立即体验
          </button>
        </div>
      </div>
    </section>
  );
} 