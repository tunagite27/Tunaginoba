// src/app/AItiikimiraijyuku/page.tsx

import Image from 'next/image';
import React from 'react';
import { Mail, Phone, Instagram, ExternalLink } from 'lucide-react'; // Phoneもインポートリストに含めておきます
import Link from 'next/link'; // Linkをインポート

// カルーセルコンポーネントをインポート (パスは実際の場所に合わせてください)
// CategoryCarousel から ContentInfo 型もエクスポートされている前提
import CategoryCarousel, {ContentInfo} from '@/app/components/categorycarousel'; 
import AreaCarousel from '@/app/components/areacarousel';  // AreaCarouselも同様にContentInfo型を共有または定義

import fs from 'fs/promises'; // fs/promises をインポート
import path from 'path';       // path をインポート

// --- データ取得関数 ---
// この関数はサーバーコンポーネント内でのみ直接実行されます
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

export default async function Page() { // Next.jsのページコンポーネントはデフォルトエクスポート
  const headerOffset = 'pt-24';
  // ダークモード対応を意識したスタイルを追加 (任意)
  const sectionClasses = "flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800";
  const imageContainerClasses = "w-full md:w-1/3 flex justify-center items-center";
  const textContainerClasses = "w-full md:w-2/3 flex flex-col justify-center text-center md:text-left py-4";
  const headingTextClass = "text-gray-900 dark:text-white";
  const bodyTextClass = "text-gray-700 dark:text-gray-300";
  const linkTextClass = "text-blue-600 dark:text-blue-400 hover:underline";


  // --- このページ固有の情報を定義 ---
  // この静的ページがinfo.jsonのどのエントリに対応するかをslugで指定
  const THIS_PAGE_SLUG = "AItiikimiraijyuku"; 

  const allContentData = await getData(); // サーバーサイドで全データを取得

  // 現在のページのコンテンツ情報を取得
  const currentPost = allContentData.find(p => p.slug === THIS_PAGE_SLUG);

  if (!currentPost) {
    // 該当するコンテンツ情報がinfo.jsonに見つからない場合のフォールバック
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

  // 画像パスをpublicフォルダからの絶対パス文字列に変更
  // これらのパスはinfo.jsonから取得するのが理想的ですが、現在の構造に合わせています。
  // currentPost.imagePath などを使用するのがより動的です。
  // ここでは、既存のコード構造に基づき、ページ専用の画像がある前提でパスを指定します。
  // もしこれらの画像もinfo.jsonのimagePathで管理されているなら、currentPost.imagePathを使用してください。
  const image1Src = "/AItiikimiraijyuku/images/AImiraijyukuMain.jpg"; 
  const image2Src = "/AItiikimiraijyuku/images/AItiikimiraijyuku_2.jpg";
  const image3Src = "/AItiikimiraijyuku/images/AItiikimiraijyuku_3.jpg";


  return (
    <main className={`flex min-h-screen flex-col items-center ${headerOffset} px-2 sm:px-4 dark:bg-slate-900`}>

      {/* --- セクション 1 --- */}
      <section className={sectionClasses}>
        <div className={imageContainerClasses}>
          <Image
            src={image1Src} // 修正: publicからのパス文字列を使用
            alt="AI地域未来塾 イメージ1"
            width={640} 
            height={360}
            priority 
            className="rounded-lg shadow-lg max-w-full h-auto" 
          />
        </div>
        <div className={textContainerClasses}>
          <h2 className={`text-3xl lg:text-4xl font-bold mb-4 ${headingTextClass}`}>
            AI 地域未来塾 {/* currentPost.title を使用することも検討 */}
          </h2>
          <p className={`${bodyTextClass} leading-relaxed`}>
            民間向けのAI利活用講座<br />
            中南信地域の教育期間に向けたIT講座<br />
            中小企業・士業・個人事業主さまに向けたPCサポート
            {/* currentPost.summary の一部や、専用の記述を使用することも検討 */}
          </p>
        </div>
      </section>

      {/* --- セクション 2 --- */}
      <section className={sectionClasses}>
        <div className={imageContainerClasses}>
          <Image
            src={image2Src} // 修正: publicからのパス文字列を使用
            alt="AI地域未来塾 イメージ2"
            width={640}
            height={360}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        <div className={textContainerClasses}>
          <p className={`${bodyTextClass} leading-relaxed`}>
            わたしたちAI地域未来塾は、全ての人にAIの可能性と楽しさを知ってもらい、<br />
            AIの力を使って地域を盛り上げるべく、ゆいワーク茅野を中心に<br />
            毎月1~3回、無料の講座を開設中です。<br />
            どなたでもお越しになっていただき、パソコンを使って「実現したいこと」・「やってみたいこと」<br />
            をぶつけてみてください。
          </p>
        </div>
      </section>

      {/* --- セクション 3 (お問い合わせ) --- */}
      <section className={sectionClasses}>
        <div className={imageContainerClasses}>
          <Image
            src={image3Src} // 修正: publicからのパス文字列を使用
            alt="AI地域未来塾 イメージ3"
            width={640}
            height={360}
            className="rounded-lg shadow-lg max-w-full h-auto"
          />
        </div>
        <div className={textContainerClasses}>
          <h3 className={`text-2xl font-semibold mb-4 border-b pb-2 ${headingTextClass} dark:border-gray-600`}>お問い合わせ</h3>
          <div className="space-y-3 mt-4">
            <p className={bodyTextClass}>
              活動内容についてのお問い合わせ、ご依頼は、以下の連絡先までお気軽にご連絡ください。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2">
              <Mail size={18} className="text-gray-600 dark:text-gray-400 flex-shrink-0" /> 
              <a href="mailto:aimiraijuku@gmail.com" className={`${linkTextClass} break-all`}>
                aimiraijuku@gmail.com
              </a>
            </div>
            {/* 電話番号 */}
          </div>
        </div>
      </section>

      {/* --- SNS・外部リンクセクション --- */}
      <section className={`w-full max-w-5xl p-3 sm:p-4 md:p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800 mb-8 md:mb-12`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className={`text-2xl font-semibold mb-4 border-b pb-2 ${headingTextClass} dark:border-gray-600`}>SNS</h3>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.instagram.com/aimiraijuku_nagano/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-blue-700 dark:text-blue-400 transition-colors">
                <Instagram size={28} />
              </a>
            </div>
          </div>
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
        </div>
      </section>

      {/* === カルーセル表示エリア === */}
      <div className="w-full max-w-7xl mx-auto mt-8 mb-8 md:mt-10 md:mb-10">
        {/* カテゴリカルーセル */}
        <CategoryCarousel
          allContentItems={allContentData} // 全データを渡す
          currentContentCategory={currentPost.Category} // このページのカテゴリを渡す
          currentContentSlug={currentPost.slug} // このページのslugを渡す (除外用)
        />
        
        {/* エリアカルーセル (縦並びにするため、CategoryCarouselの下に配置) */}
        <div className="mt-8 md:mt-10"> {/* カルーセル間のスペース */}
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