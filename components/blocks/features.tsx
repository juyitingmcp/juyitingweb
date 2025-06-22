'use client';

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

export function Features({ title, subtitle, items }: FeaturesProps) {
  const icons = ['🧠', '⚡', '🎯', '🔧']; // 简单的表情符号图标

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
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

        {/* 功能卡片 */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="mb-4 text-4xl">
                  {icons[index % icons.length]}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 