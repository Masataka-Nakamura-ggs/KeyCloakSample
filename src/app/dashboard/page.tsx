import { getAuthSession } from "@/auth";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getAuthSession();
  const user = session?.user;

  // ミドルウェアで保護しているが、念のための確認
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">アクセスが拒否されました</h1>
        <p className="mb-6">このページを表示するにはログインが必要です。</p>
        <Link href="/api/auth/signin" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          ログイン
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-8 text-center">ダッシュボード</h1>
        <div className="mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
            <h2 className="text-xl font-semibold mb-4">ユーザー情報</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>名前:</strong> {user.name || "未設定"}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>メール:</strong> {user.email || "未設定"}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  <strong>ユーザーID:</strong> {user.id}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">このページについて</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              このページは<strong>保護されたルート</strong>です。ログインしていないユーザーが
              アクセスしようとすると、自動的にKeyCloakのログインページにリダイレクトされます。
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              この機能は、Next.jsのミドルウェアを使用して実装されています。
            </p>
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <Link href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
            ホームに戻る
          </Link>
          <Link href="/api/auth/signout" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            ログアウト
          </Link>
        </div>
      </div>
    </div>
  );
}
