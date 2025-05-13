import React, {ReactNode} from 'react';

export const metadata = {
  title:'継なぎ手',
  description: '継なぎ手と言う名前でお手伝いや庭師、イベントの裏方等を仕事として行なっております'
}

export default function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-natural-beige-texture">
      {/* ページコンテント */}
      <main className="relative z-10 p-8 text-black">
        {/* ここにページの中身が入ります */}
        {children}
      </main>
    </div>
  );
}