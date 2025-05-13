import React, {ReactNode} from 'react';

export const metadata = {
  title: 'AI 地域未来塾',
  description: 'わたしたちAI地域未来塾は、全ての人にAIの可能性と楽しさを知ってもらい、AIの力を使って地域を盛り上げるべく、ゆいワーク茅野を中心に毎月1~3回、無料の講座を開設中です',
}


export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-tl from-indigo-950 via-slate-900 to-slate-800">
      {/* ページコンテント */}
      <main className="relative z-10 p-8 text-black">
        {/* ここにページの中身が入ります */}
        {children}
      </main>
    </div>
  );
}