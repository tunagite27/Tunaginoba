import Image from 'next/image';
import React from 'react';
import { Mail, Phone, Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CategoryCarousel, {ContentInfo} from '@/app/components/categorycarousel'; 
import AreaCarousel from '@/app/components/areacarousel'; 
import fs from 'fs/promises';
import path from 'path'; 

async function getData(): Promise<ContentInfo[]> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'app', 'info.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData) as ContentInfo[];
    return data;
  } catch (error) {
    console.error("Failed to read or parse info.json:", error);
    return [];
  }
}

export default async function Page() {
  const headerOffset = 'pt-24';
  const sectionClasses = "flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800";
  const imageContainerClasses = "w-full md:w-1/3 flex justify-center items-center";
  const textContainerClasses = "w-full md:w-2/3 flex flex-col justify-center text-center md:text-left py-4";
  const headingTextClass = "text-gray-900 dark:text-white";
  const bodyTextClass = "text-gray-700 dark:text-gray-300";
  const linkTextClass = "text-blue-600 dark:text-blue-400 hover:underline";

  const THIS_PAGE_SLUG = "Tunagite"; 

  const allContentData = await getData(); 

  const currentPost = allContentData.find(p => p.slug === THIS_PAGE_SLUG);

  if (!currentPost) {
  
    return (
      <main className={`flex min-h-screen flex-col items-center justify-center ${headerOffset} px-4 text-center`}>
        <h1 className="text-2xl font-semibold text-red-600">エラー</h1>
        <p className={`mt-2 ${bodyTextClass}`}>このページのコンテンツ情報が見つかりませんでした。</p>
        <p className={`${bodyTextClass}`}>slug: {THIS_PAGE_SLUG} が info.json に存在するか確認してください。</p>
        <Link href="/" className={`mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors`}>
          ホームに戻る
        </Link>
      </main>
    );
  }

  const image1Src = "/Tunagite/images/TunagiteMain.jpg"; 
  const image2Src = "/Tunagite/images/Tunagite_2.jpg";
  //const image3Src = "";


  return (
    <main className={`flex min-h-screen flex-col items-center ${headerOffset} px-4 dark:bg-slate-900`}>

      <section className={sectionClasses}>
        <div className={imageContainerClasses}>
          <Image
            src={image1Src} 
            alt="継なぎ手 イメージ1"
            width={640} 
            height={360}
            priority 
            className="rounded-lg shadow-lg max-w-full h-auto" 
          />
        </div>
        <div className={textContainerClasses}>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${headingTextClass}`}>
          継なぎ手
          </h2>
          <p className={`${bodyTextClass} leading-relaxed`}>
            継なぎ手と言う名前でお手伝いや庭師、イベントの裏方等を仕事として行なっております。<br/>
          代表の三浦です。周りからは何でも屋さんとも呼ばれる事があります。<br/>
          </p>
        </div>
      </section>

      <section className={sectionClasses}>
        <div className={imageContainerClasses}>
          <Image
            src={image2Src} 
            alt="継なぎ手 イメージ2"
            width={640}
            height={360}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        <div className={textContainerClasses}>
          <p className={`${bodyTextClass} leading-relaxed`}>
            今はこれまでの経験を活かしサポート事業を始動している途中です。<br/>
          クラフト作家さんを紹介したり、自分らしさ・楽しさや<br/>
          これからのヒントになるような物事を紹介しております。
          </p>
        </div>
      </section>
      
      <section className={sectionClasses}>
        {/*
        <div className={imageContainerClasses}>
          <Image
            src={image3Src} // 修正: publicからのパス文字列を使用
            alt="AI地域未来塾 イメージ3"
            width={640}
            height={360}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>*/}
        <div className={textContainerClasses}>
          <h3 className={`text-2xl font-semibold mb-4 border-b pb-2 ${headingTextClass} dark:border-gray-600`}>お問い合わせ</h3>
          <div className="space-y-3 mt-4">
            <p className={bodyTextClass}>
              活動内容についてのお問い合わせ、ご依頼は、以下の連絡先までお気軽にご連絡ください。
            </p>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={18} className="text-gray-600 dark:text-gray-400 flex-shrink-0" /> 
              <a href="mailto:tunagari28mk@gmail.com" className={`${linkTextClass} break-all`}>
                tunagari28mk@gmail.com
              </a>
              <Phone size={18} className="text-gray-600 dark:text-gray-400 flex-shrink-0"/>
              <p>
              080-5835-3441
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SNS・外部リンクセクション --- */}
      <section className={`w-full max-w-5xl p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-semibold mb-4 border-b pb-2 ${headingTextClass} dark:border-gray-600`}>SNS</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/tunagitenoba/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-blue-700 dark:text-blue-400 transition-colors">
                <Instagram size={28} />
              </a>
            </div>
          </div>
          {/*
          <div>
            <h3 className={`text-2xl font-semibold mb-4 border-b pb-2 ${headingTextClass} dark:border-gray-600`}>関連リンク</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://osashin041218warap.wixsite.com/my-site?fbclid=PAZXh0bgNhZW0CMTEAAad9faESsvhLYdVFrpZaKeKZlGBQ6fdBqODD613LstAqTxR1-JUc0vFuOuEntQ_aem_GWOph_MqL3boEH349-U3OA" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 ${linkTextClass}`}>
                  <ExternalLink size={16} />
                  ホームページ
                </a>
              </li>
            </ul>
          </div>
          */}
        </div>
      </section>

      {/* === カルーセル表示エリア === */}
      <div className="w-full max-w-7xl mx-auto mt-4 md:mt-8 mb-6">
        {/* カテゴリカルーセル */}
        <CategoryCarousel
          allContentItems={allContentData} // 全データを渡す
          currentContentCategory={currentPost.Category} // このページのカテゴリを渡す
          currentContentSlug={currentPost.slug} // このページのslugを渡す (除外用)
        />
        
        {/* エリアカルーセル (縦並びにするため、CategoryCarouselの下に配置) */}
        <div className="mt-4 md:mt-8"> {/* カルーセル間のスペース */}
          <AreaCarousel
            allContentItems={allContentData} // 全データを渡す
            currentContentArea={currentPost.Area} // このページのエリアを渡す
            currentContentSlug={currentPost.slug} // このページのslugを渡す (除外用)
          />
        </div>
      </div>
    </main>
  );
}