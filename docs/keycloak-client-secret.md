# KeycloakのClient Secret取得方法

Keycloakでの認証エラー（HTTP 500）を解決するには、以下の手順でKeycloakからClient Secretを取得し、`.env.local`ファイルを更新してください。

## 1. Keycloakが実行中であることを確認

```bash
docker-compose ps
```

Keycloakコンテナが実行中（Up状態）であることを確認してください。

## 2. Keycloak管理コンソールへアクセス

ブラウザで以下のURLにアクセスします：
```
http://localhost:8080
```

管理者アカウント（`admin` / `admin`）でログインします。

## 3. 正しいレルムを選択

左上のドロップダウンメニューから「my-app-realm」を選択します。（まだ作成していない場合は作成してください）

## 4. クライアント設定の確認

左側のメニューから「Clients」を選択し、「nextjs-client」をクリックします。（まだ作成していない場合は作成してください）

クライアント設定で以下を確認・設定します：
- Client authentication: ON
- Access Type: confidential
- Valid Redirect URIs: `http://localhost:3000/api/auth/*`
- Web Origins: `http://localhost:3000`

「Save」ボタンをクリックして保存します。

## 5. Client Secretの取得

「nextjs-client」の詳細ページで、「Credentials」タブをクリックします。
表示される「Client Secret」の値をコピーします。

## 6. .env.localファイルの更新

`.env.local`ファイルを開き、`AUTH_KEYCLOAK_SECRET`の値を、コピーしたClient Secretに置き換えます：

```
AUTH_KEYCLOAK_SECRET="ここにコピーしたClient Secretを貼り付ける"
```

## 7. アプリケーションの再起動

環境変数を更新したら、Next.jsアプリケーションを再起動します：

```bash
npm run dev
```

これでKeycloakとの連携が正しく行われ、ログインページが表示されるはずです。
