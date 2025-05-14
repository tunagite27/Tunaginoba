import Image from "next/image";
import Link from "next/link";
import fs from 'fs/promises'; 
import path from 'path';  
import { ChevronRight } from "lucide-react";

interface ContentInfo {
  title: string;
  imagePath: string; 
  slug: string;
  summary: string;
  location: string; 
  category: string; 
}

// --- データ取得関数 ---
// Server Component であるため、サーバーサイドで直接ファイル読み込みが可能
async function getData(): Promise<ContentInfo[]> {
  try {
    // info.json のパスを取得 (プロジェクトルートにあると仮定)
    // process.cwd() はビルド時/実行時のカレントディレクトリ (通常プロジェクトルート)
    const filePath = path.join(process.cwd(), 'src','app','info.json'); 
    // 代替: src フォルダにある場合 -> path.join(process.cwd(), 'src', 'info.json');
    
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData) as ContentInfo[];
    return data;
  } catch (error) {
    console.error("Failed to read or parse info.json:", error);
    // エラー発生時は空配列を返すか、エラーをスローするか選択
    return []; 
  }
}

// --- 配列シャッフル関数 (Fisher-Yates Algorithm) ---
function shuffleArray<T>(array: T[]): T[] {
  // 元の配列を破壊しないようにコピーを作成
  const shuffled = [...array]; 
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // 要素を入れ替え
  }
  return shuffled;
}

// --- ランディングページコンポーネント ---
export default async function LandingPage() { // async に変更して await を使用
  
  const postsData = await getData(); // データを非同期で取得
  const posts = shuffleArray(postsData); // 取得したデータをシャッフル

  // pt-20 はヘッダーの高さなどに応じて調整してください
  return (
    <div className="pt-28 sm:pt-28 overflow-x-hidden"> {/* 横スクロール防止のため overflow-x-hidden を追加 */}
      {posts.map((post, index) => {
        // 偶数番目(0, 2, 4...)か奇数番目(1, 3, 5...)かを判定
        const isOdd = index % 2 !== 0;

        return (
          <section
            key={post.slug}
            // min-h-screen は各セクションで全画面高になるため長大になる可能性あり。
            // 必要に応じて py-16 や py-24 など上下のパディングに変更検討
            className={`flex flex-col ${
              // 奇数番目のセクションは md サイズ以上で左右反転 (flex-row-reverse)
              isOdd ? 'md:flex-row-reverse' : 'md:flex-row'
            } items-center justify-center gap-4 p-4 md:p-8`}
          >
            {/* 画像セクション (md:w-1/2) */}
            <div className="w-full md:w-1/2 flex justify-center"> 
              {/* 画像のみをLinkで囲む */}
              <Link href={`/${post.slug}`} aria-label={`View details about ${post.title}`}> 
                 {/* slugが 'content-1' なら '/content-1' へ遷移 */}
                <Image
                  // imagePath を使用
                  src={post.imagePath} 
                  alt={post.title}
                  width={1000} // 表示したい最大幅に近い値
                  height={750}// width に応じた高さ (アスペクト比4:3の場合)
                  // sizes はレスポンシブイメージの最適化に役立つ (任意)
                  // sizes="(max-width: 768px) 100vw, 50vw" 
                  priority={index < 2} // 最初の1, 2枚は優先読み込み (LCP改善のため、任意)
                  className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[70vh]" // スタイル調整: 影を強く、縦長になりすぎないようにmax-hを設定
                />
              </Link>
            </div>

            {/* テキストセクション (md:w-1/2) */}
            <div className={`w-full md:w-1/2 flex flex-col items-center ${
                // テキストブロック自体の左右位置も反転させる
                isOdd ? 'md:items-end' : 'md:items-start' 
              } transform md:-rotate-3`} // 回転はテキストコンテナに適用
            >
              {/* テキスト内容のコンテナ (ここで text-align を制御) */}
              <div className={`mt-4 md:mt-0  text-center ${isOdd ? 'md:text-right md:pl-20' : 'md:text-left md:pr-20'}`}>
                 {/* モバイルでは中央揃え、デスクトップでは左右交互 */}
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