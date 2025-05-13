import Image from 'next/image';
import { Facebook, Mail, User, MessageSquare } from 'lucide-react'; // Mail, User, MessageSquare を追加
import Link from 'next/link';

// サーバーアクション用の型定義 (必要に応じて)
interface FormData {
  name: string;
  email: string;
  message: string;
}

// お問い合わせフォームのサーバーアクション (基本的な雛形)
async function submitContactForm(formData: FormData) {
  'use server'; // この関数はサーバーサイドで実行されることを示す

  // ここで実際のメール送信処理やデータベースへの保存処理を実装します。
  // 例: Nodemailer, Resend, SendGridなどのサービスを利用
  console.log('Form data received:', formData);

  // 実際には成功/失敗のレスポンスを返すか、リダイレクト処理などを行う
  // throw new Error("Failed to send message."); // エラーテスト用
  // return { success: true, message: "メッセージが送信されました。" };
}


export default function AboutUsPage() { // 関数名を AboutUsPage に変更 (慣習)
  const commonHeadingStyle = "text-4xl md:text-5xl font-bold my-8 text-center text-gray-800";
  const cardStyle = "bg-white p-6 md:p-10 rounded-xl shadow-2xl my-12";

  // サーバーアクションを呼び出すクライアントサイドの関数
  // このコンポーネントを "use client" にするか、フォーム部分を別コンポーネントに切り出す必要があります。
  // ここでは、フォームをラップする関数を定義し、その関数内でフォームを扱います。
  // ただし、ページ全体を "use client" にしない場合は、フォーム部分をクライアントコンポーネントに分離する必要があります。
  // 今回はページ全体をサーバーコンポーネントのままにし、フォーム送信は標準のform actionで行う形を想定します。

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    };
    // サーバーアクションを直接呼び出す代わりに、APIルートや外部サービスを想定
    // もしサーバーアクションをこの場で使いたい場合は、このコンポーネント（またはフォーム部分）を
    // "use client" にして、別途インポートしたサーバーアクションを呼び出す必要があります。
    // ここではUIの構築に留めます。
    alert(`（デモ）フォームデータ: ${JSON.stringify(data)}。サーバーアクションでの処理が必要です。`);
    // const result = await submitContactForm(data);
    // if (result?.success) {
    //   alert(result.message);
    //   (event.target as HTMLFormElement).reset();
    // } else {
    //   alert("メッセージの送信に失敗しました。");
    // }
  };


  return (
    <main className='pt-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
      <section className={cardStyle}>
        <h1 className={commonHeadingStyle}>
          Tunaginobaについて
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          わたしたちTunaginobaは岡谷・諏訪・茅野地域のヒト・場所・コト・モノが互いの関心だけではなく<br />
          ふとしたきっかけで繋がりあうことが出来るような可能性を生み出す、<br />
          そんなメディアです。<br />
          もしかしたらあなたの求めているヒトや場所、物事や会社・団体がすぐ近くにあるかもしれません。
        </p>
      </section>

      <section className={cardStyle}>
        <h2 className={commonHeadingStyle}>
          QRコードから拡がる新しい発見
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 my-8 justify-center">
          {/* 仮の画像プレースホルダー
          <div className="w-full sm:w-1/2 aspect-video bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-500">QRコード設置イメージ1</p>
          </div>
          <div className="w-full sm:w-1/2 aspect-video bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
            <p className="text-gray-500">QRコード設置イメージ2</p>
          </div> */}
        </div>
        <p className="text-lg text-gray-700 leading-relaxed text-center">
          掲載者さまやTunaginobaプロジェクトに共感いただいた方のお店や施設などに<br/>
          QRコードを置かせていただいています。<br />
          トップページや各コンテンツの表示はランダムです。<br />
          ホッと一息つきながら、普段知ることの出来なかったヒト・場所・コト・モノを発見してください。
        </p>
      </section>

      <section className={cardStyle}>
        <h2 className={commonHeadingStyle}>Owner</h2>
        <div className="flex flex-col md:flex-row md:space-x-12 space-y-10 md:space-y-0 mt-8">
          {/* オーナー1: 三浦昂生 */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Tunagite -継なぎ手-</h3>
            <div className="w-48 h-48 md:w-56 md:h-56 relative my-4">
              <Image
                src="/Tunagite/images/TunagiteMain.jpg" // publicフォルダからのパス
                alt="三浦昂生"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg"
              />
            </div>
            <figcaption className="text-xl font-medium text-gray-700 mt-2">三浦滉生</figcaption>
            <p className="text-md text-gray-600 leading-relaxed my-4 px-2">
              {/* Tunaginobaを作ったきっかけ・ビジョンなど */}
              継なぎ手として、地域のお手伝いやイベントサポートを通じて「Tunaginoba」のアイデアを思いつきました。このプラットフォームが、<br/>
              多くの素敵な繋がりを生むことを願っています。
            </p>
            <Link href="/Tunagite" className='text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors duration-150'>
              継なぎ手のページへ
            </Link>
          </div>

          {/* オーナー2: 松井はるか */}
          <div className="w-full md:w-1/2 flex flex-col items-center text-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">Software Engineer</h3>
            <div className="w-48 h-48 md:w-56 md:h-56 relative my-4">
              <Image
                src="/aboutus/matsuiharuka.jpg" // publicフォルダからのパス
                alt="松井はるか"
                layout="fill"
                objectFit="cover"
                className="rounded-full shadow-lg"
              />
            </div>
            <figcaption className="text-xl font-medium text-gray-700 mt-2">松井はるか</figcaption>
            <p className="text-md text-gray-600 leading-relaxed my-4 px-2">
              長野県と神奈川県の2拠点で仕事をする<br/>
              ソフトウェアエンジニアです。<br />
              とにかく自分の技術で友人の背中を押したい、大好きな長野県で何か仕掛けたい、
              そんな想いでこの<br/>
              プロジェクトの裏側を作っています。
            </p>
            <a href='https://www.facebook.com/profile.php?id=61575862861136' target="_blank" rel="noopener noreferrer" className='text-indigo-500 hover:text-indigo-800 transition-colors duration-150'>
              <Facebook size={32} />
            </a>
          </div>
        </div>
      </section>

      <section className={cardStyle}>
        <h2 className={commonHeadingStyle}>お問い合わせ</h2>
        <p className="text-lg text-gray-700 leading-relaxed text-center mb-8">
          Tunaginobaに関するご質問、掲載依頼、その他お問い合わせは以下のフォーム、またはメールアドレスまでお気軽にご連絡ください。
        </p>
        {/* Next.js サーバーアクションを使用する場合、form タグに action={submitContactForm} を指定します。
          このページコンポーネントがサーバーコンポーネントのままであるため、
          フォーム送信をクライアントサイドでインタラクティブに扱いたい場合（例：送信中のローディング表示、エラー表示）は、
          フォーム部分を 'use client' を付けた別コンポーネントに切り出すのが一般的です。
          以下は基本的なフォームの構造です。
        */}
        <form 
            action={async (formData) => {
                'use server';
                const data = {
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    message: formData.get('message') as string,
                };
                await submitContactForm(data); 
                // ここでリダイレクトやメッセージ表示の処理を追加できます
                // 例: redirect('/aboutus?message=success');
                // 注意: サーバーアクション内でリダイレクトする場合は next/navigation の redirect を使います。
                // このコンポーネントがクライアントコンポーネントの場合は、useRouter を使ったクライアントサイドリダイレクトも可能です。
            }}
            className="space-y-6 max-w-lg mx-auto"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              <User size={16} className="inline mr-1 mb-0.5" />お名前
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-600 focus:border-indigo-500 sm:text-sm"
              placeholder="会社名でも可"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline mr-1 mb-0.5" />メールアドレス
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="your_email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              <MessageSquare size={16} className="inline mr-1 mb-0.5" />メッセージ内容
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="お問い合わせ内容を具体的にご記入ください。"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              送信する
            </button>
          </div>
        </form>
        <div className="text-center mt-8">
          <p className="text-md text-gray-600">または、直接メールでお問い合わせいただくことも可能です。</p>
          <a 
            href="mailto:Tunaginoba@gmail.com?subject=Tunaginobaへのお問い合わせ" 
            className="text-indigo-600 hover:text-indigo-800 font-semibold hover:underline transition-colors duration-150 inline-flex items-center mt-2"
          >
            <Mail size={20} className="mr-2" /> tunagari28mk@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}