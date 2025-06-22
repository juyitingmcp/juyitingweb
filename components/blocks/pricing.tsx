'use client';

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  priceUnit?: string;
  features: string[];
}

interface PricingProps {
  title: string;
  subtitle: string;
  plans: {
    free: PricingPlan;
    pro: PricingPlan;
    enterprise: PricingPlan;
  };
  monthlyText: string;
  yearlyText: string;
}

export function Pricing({ title, subtitle, plans, monthlyText, yearlyText }: PricingProps) {
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

        {/* 价格卡片 */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* 免费版 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plans.free.name}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {plans.free.description}
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plans.free.price}
                </span>
              </div>
            </div>
            <ul className="mt-8 space-y-3">
              {plans.free.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full bg-gray-100 text-gray-900 hover:bg-gray-200 py-2 px-4 rounded-lg transition-colors">
              开始使用
            </button>
          </div>

          {/* 专业版 - 推荐 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                推荐
              </span>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plans.pro.name}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {plans.pro.description}
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plans.pro.price}
                </span>
                {plans.pro.priceUnit && (
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    {plans.pro.priceUnit}
                  </span>
                )}
              </div>
            </div>
            <ul className="mt-8 space-y-3">
              {plans.pro.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full bg-blue-600 text-white hover:bg-blue-700 py-2 px-4 rounded-lg transition-colors">
              立即升级
            </button>
          </div>

          {/* 企业版 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {plans.enterprise.name}
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {plans.enterprise.description}
              </p>
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {plans.enterprise.price}
                </span>
              </div>
            </div>
            <ul className="mt-8 space-y-3">
              {plans.enterprise.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button className="mt-8 w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 py-2 px-4 rounded-lg transition-colors">
              联系销售
            </button>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            所有方案都包含 14 天免费试用，随时可以取消
          </p>
        </div>
      </div>
    </section>
  );
} 