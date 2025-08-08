import { NextRequest, NextResponse } from "next/server";

// 保護されたルートを定義
export const config = {
  matcher: [
    // 要保護ルートを指定 - 未認証の場合はログインにリダイレクト
    "/dashboard/:path*",
    // プロフィールページなど他の保護されたルートを追加可能
    "/profile/:path*",
  ],
};

export default async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('next-auth.session-token')?.value;
  
  // ユーザーが認証されていない場合、ログインページにリダイレクト
  if (!sessionCookie) {
    // サインインURLを構築して、コールバックURLとして現在のパスを含める
    const signInUrl = new URL("/api/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 認証済みの場合は通常通り進める
  return NextResponse.next();
}
