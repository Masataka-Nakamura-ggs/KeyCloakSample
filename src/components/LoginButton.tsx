"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  if (isLoading) {
    return <button className="p-2 bg-gray-200 rounded-md">読み込み中...</button>;
  }

  if (session?.user) {
    return (
      <button
        className="p-2 bg-red-500 text-white rounded-md"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        ログアウト
      </button>
    );
  }

  return (
    <button
      className="p-2 bg-blue-500 text-white rounded-md"
      onClick={() => signIn("keycloak")}
    >
      ログイン
    </button>
  );
}
