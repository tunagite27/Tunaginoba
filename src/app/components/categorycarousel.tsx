'use client';

import React, { useState, useEffect, useMemo } from 'react'; // useMemo を追加
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ContentInfo インターフェース
export interface ContentInfo { // 他のファイルからインポートできるように export
  title: string;
  imagePath: string;
  slug: string;
  Area: string;
  summary: string;
  Category: string;
}

// 配列シャッフル関数 (コンポーネント内で定義またはユーティリティからインポート)
function shuffleArray<T>(array: T[]): T[] {
  if (!array) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

interface CategoryCarouselProps {
  allContentItems: ContentInfo[];    // 全てのコンテンツアイテムのリスト
  currentContentCategory: string; // 現在のメインコンテンツのカテゴリ名
  currentContentSlug: string;     // 現在のメインコンテンツのslug (これを除外するため)
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({
  allContentItems,
  currentContentCategory,
  currentContentSlug,
}) => {
  // 表示するアイテムリストを useMemo を使って計算・メモ化
  const carouselDisplayItems = useMemo(() => {
    if (!allContentItems || !currentContentCategory) {
      return [];
    }
    // 1. カテゴリでフィルタリング (大文字・小文字を区別しない)
    const categoryFiltered = allContentItems.filter(
      (item) => item.Category.toLowerCase() === currentContentCategory.toLowerCase()
    );
    // 2. 現在表示中のアイテムを除外
    const finalFiltered = categoryFiltered.filter(
      (item) => item.slug !== currentContentSlug
    );
    // 3. シャッフル
    return shuffleArray(finalFiltered);
  }, [allContentItems, currentContentCategory, currentContentSlug]);

  const [currentIndex, setCurrentIndex] = useState(0);

  // carouselDisplayItems が変更されたら currentIndex をリセット
  useEffect(() => {
    setCurrentIndex(0);
  }, [carouselDisplayItems]);

  if (!carouselDisplayItems || carouselDisplayItems.length === 0) {
    // 表示する「他の」コンテンツがない場合は何もレンダリングしないか、メッセージを表示
    return (
      <div className="w-full py-8 md:py-12 text-center text-gray-500">
        同じ「{currentContentCategory}」カテゴリの他のコンテンツは現在ありません。
      </div>
    );
  }

  const totalItems = carouselDisplayItems.length;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalItems - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  const showArrows = totalItems > 1;
  // currentItem の参照を carouselDisplayItems に変更
  const currentItem = carouselDisplayItems[currentIndex]; 
  // currentItem が undefined になる可能性を考慮 (totalItems === 0 の場合など)
  if (!currentItem) { 
      return (
        <div className="w-full py-8 md:py-12 text-center text-gray-500">
            同じ「{currentContentCategory}」カテゴリのコンテンツを読み込み中です...
        </div>
      );
  }


  return (
    <section className="w-full py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative w-full max-w-3xl mx-auto aspect-[16/10] md:aspect-[16/9] group">
          <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
            {/* 表示するアイテムを carouselDisplayItems からマッピング */}
            {carouselDisplayItems.map((item, index) => (
              <div
                key={item.slug + index}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <Image
                  src={item.imagePath}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white w-full">
                  <h3 className="text-xl md:text-2xl font-bold mb-1 drop-shadow-md">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-200 mb-2 drop-shadow-md">エリア: {item.Area}</p>
                  <Link
                    href={`/${item.slug}`} // 各コンテンツページへのリンク (例: /AItiikimiraijyuku)
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-xs md:text-sm py-2 px-3 md:px-4 rounded-md shadow-md transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Go {item.title} page
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {showArrows && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 ease-in-out z-20 opacity-70 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                aria-label="前のスライドへ"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={goToNext}
                className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-all duration-300 ease-in-out z-20 opacity-70 group-hover:opacity-100 transform scale-90 group-hover:scale-100"
                aria-label="次のスライドへ"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;