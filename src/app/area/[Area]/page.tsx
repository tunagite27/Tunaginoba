import Image from "next/image";
import Link from "next/link";
import fs from 'fs/promises';
import path from 'path';
import { ChevronRight } from "lucide-react";

// --- ContentInfo 型 ---
interface ContentInfo {
 title: string;
 imagePath: string;
 slug: string;
 summary: string;
 Area: string; // 例: "諏訪", "茅野", "岡谷"
 Category: string;
}
// --- データ取得関数 ---
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
// --- 配列シャッフル関数 ---
function shuffleArray<T>(array: T[]): T[] {
 const shuffled = [...array];
 for (let i = shuffled.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
 }
 return shuffled;
}

// --- エリア名変換マッピング ---
const areaDisplayMap: Record<string, string> = {
  "Suwa": "諏訪",
  "Okaya": "岡谷",
  "Chino": "茅野",
};

// --- Props型 ---
interface PageProps {
 params: Promise<{
  Area: string;
 }>;
}
// --- 静的ページコンポーネント ---
export default async function AreaPage({ params }: PageProps) {
 const resolvedParams = await params;
 const currentAreaSlug = resolvedParams.Area; // URLパラメータから英語のエリア名を取得
   // 表示用の日本語エリア名を取得
 const displayAreaName = areaDisplayMap[currentAreaSlug] || currentAreaSlug;
 const currentArea = decodeURIComponent(resolvedParams.Area);
 const allPostsData = await getData();
 const filteredPosts = allPostsData.filter(post => post.Area === currentArea);
 const posts = shuffleArray(filteredPosts);
 if (posts.length === 0) {
  return (
   <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-2xl font-semibold mb-4">{displayAreaName}</h1>
    <p className="text-lg text-gray-600">表示できるコンテンツがまだありません。</p>
    <Link href="/" className="mt-8 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
     ホームに戻る
    </Link>
   </div>
  );
 }
 return (
  <div className="pt-20 overflow-x-hidden">
   <h1 className="text-2xl md:text-3xl font-bold text-left pl-4 sm:pl-8 md:pl-12 mt-16 sm:mt-0 mb-6 py-4 bg-gradient-to-r from-slate-200 via-slate-100/60 to-slate-50/30 border-b-2 border-blue-800 rounded-t-lg text-gray-800 dark:text-gray-100">
    {displayAreaName}
   </h1>
   {posts.map((post, index) => {
    const isOdd = index % 2 !== 0;
    return (
     <section key={post.slug}className={`min-h-[80vh] md:min-h-screen flex flex-col ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-8 p-4 md:p-8`}>
      <div className="w-full md:w-1/2 flex justify-center">
       {/*<Link href={`/${post.slug}`} aria-label={`View details about ${post.title}`}>*/}
        <Image
         src={post.imagePath}
         alt={post.title}
         width={1000}
         height={750}
         priority={index < 2}
         className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[60vh] md:max-h-[70vh]"/>
       {/*</Link>*/}
      </div>
     <div className={`w-full md:w-1/2 flex flex-col items-center ${isOdd ? 'md:items-end' : 'md:items-start'} transform md:-rotate-3`}>
         <div className={`mt-4 md:mt-0 text-center ${isOdd ? 'md:text-right md:pl-20' : 'md:text-left md:pr-20'}`}>
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
        {post.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
         {post.summary}
        </p>
        <Link href={`/${post.slug}`} aria-label={`View details about ${post.title}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-150 ease-in-out mt-4 group">
         もっと読む<ChevronRight size={20} className="ml-0.5 transform transition-transform duration-150 ease-in-out group-hover:translate-x-1"/>
        </Link>
       </div>
      </div>
     </section>
    );
   })}
  </div>
 );
}
// --- 静的パス生成関数 ---
export async function generateStaticParams() {
 const data = await getData();
 // uniqueなエリア名を取得
 const uniqueAreas = Array.from(new Set(data.map(item => item.Area)));
  return uniqueAreas.map(area => ({
  Area: encodeURIComponent(area) // URL用にエンコード
 }));
}