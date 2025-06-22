import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: '聚义厅 - 重新定义AI时代的人格协作',
  description: '让每个人都能拥有一支专属的AI智囊团，通过人格化的协作，获得超越个体认知局限的智慧支持。',
  keywords: ['AI', '人格协作', '智能助手', '聚义厅', '决策支持'],
  authors: [{ name: '聚义厅团队' }],
  creator: '聚义厅',
  publisher: '聚义厅',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
} 