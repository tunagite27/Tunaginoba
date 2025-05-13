'use client'; 

import React, { useState, useEffect, useRef } from 'react'; // Reactフックをインポート
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

// ドロップダウンアイテムの型
interface DropdownItem {
  name: string;
  href: string;
}

// エリアのアイテム定義
const areaItems: DropdownItem[] = [
  { name: "諏訪", href: "/area/Suwa" },
  { name: "岡谷", href: "/area/Okaya" },
  { name: "茅野", href: "/area/Chino" },
];

// カテゴリのアイテム定義
const categoryItems: DropdownItem[] = [
  { name: "Worker", href: "/category/Worker" },
  { name: "Event", href: "/category/Event" },
  { name: "Spot", href: "/category/Spot" },
  { name: "Company", href: "/category/Company" },
];

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navItemsRef.current && !navItemsRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const renderDropdownMenu = (items: DropdownItem[], dropdownName: string) => (
    <div
      className={`
        absolute mt-2 w-48 rounded-md bg-white py-1 shadow-lg 
        ring-1 ring-black ring-opacity-5 focus:outline-none 
        transition-opacity duration-150 ease-out 
        dark:bg-gray-800 dark:ring-gray-700 z-50
        ${openDropdown === dropdownName ? 'opacity-100 visible' : 'opacity-0 invisible'}
        
        left-0 origin-top-left  /* ★モバイルでは左端基準、左上を起点とする */
        sm:right-0 sm:left-auto sm:origin-top-right /* ★sm以上では元の右端基準、右上を起点に戻す (またはsm:left-1/2 sm:-translate-x-1/2 sm:origin-top で中央揃え) */
      `}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={`${dropdownName}-menu-button`}
    >
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          // ★ モバイルでも文字色とサイズが確実に適用されるようにクラスを確認・明示
          className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          role="menuitem"
          onClick={() => setOpenDropdown(null)}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );


  return (
    // モバイルではflex-col、sm以上でflex-row。sm以上でjustify-between。
    <header className="fixed top-0 left-0 right-0 z-40 bg-white bg-opacity-90 p-4 flex flex-col sm:flex-row sm:justify-between items-center dark:bg-gray-900 dark:bg-opacity-90">
      {/* 左側のタイトル */}
      {/* モバイルではpl-0、sm以上でpl-4。モバイルではw-full、sm以上でw-auto */}
      <div className="w-full sm:w-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-left pl-0 sm:pl-4 md:pl-8 text-gray-900 dark:text-white">
            Tunaginoba
          </h1>
      </div>
      

      {/* 右側のナビゲーションアイテム群 (モバイルではタイトルの下、sm以上で右側) */}
      {/* navItemsRef をこの div に適用 */}
      {/* モバイルではw-full justify-around mt-4、sm以上で元のスタイル */}
      <div 
        ref={navItemsRef} 
        className="w-full flex items-center justify-around mt-4 sm:mt-0 sm:w-auto sm:justify-end sm:space-x-1 md:space-x-2 lg:space-x-4"
      >
        {/* Home Link */}
        <Link
          href="/"
          className="rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => setOpenDropdown(null)}
        >
          Home
        </Link>

        {/* Area Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('area')}
            id="area-menu-button"
            aria-expanded={openDropdown === 'area'}
            aria-haspopup="true"
            className="inline-flex items-center justify-center rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Area
            <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-150 ${openDropdown === 'area' ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          {renderDropdownMenu(areaItems, 'area')}
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown('category')}
            id="category-menu-button"
            aria-expanded={openDropdown === 'category'}
            aria-haspopup="true"
            className="inline-flex items-center justify-center rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Category
            <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform duration-150 ${openDropdown === 'category' ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          {renderDropdownMenu(categoryItems, 'category')}
        </div>

        {/* About Us Link */}
        <Link
          href="/aboutus"
          className="rounded-md px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={() => setOpenDropdown(null)}
        >
          Tunaginobaについて
        </Link>
      </div>
    </header>
  );
}
  