# KeyCloak + Next.js 認証サンプルプロジェクトのセットアップと実行手順

このドキュメントでは、KeyCloakとNext.jsを連携した認証サンプルプロジェクトのセットアップと実行方法を説明します。

## 前提条件

- Docker と Docker Compose がインストールされていること
- Node.js と npm がインストールされていること

## ステップ1: KeyCloakの起動

1. プロジェクトルートディレクトリで以下のコマンドを実行して、KeyCloakコンテナを起動します：

```bash
docker-compose up -d
```

2. KeyCloakの起動を確認します（初回起動時は少し時間がかかる場合があります）：

```bash
docker-compose ps
```

3. ブラウザで以下のURLにアクセスして、KeyCloakの管理コンソールを開きます：

```
http://localhost:8080
```

4. 初期管理者アカウントでログインします：
   - ユーザー名: `admin`
   - パスワード: `admin`

## ステップ2: KeyCloakの設定

1. 左上のドロップダウンメニュー（「Master」と表示されている部分）の横にある「Create Realm」ボタンをクリックして、新しいレルム「my-app-realm」を作成します。

2. 左側のメニューから「Clients」を選択し、「Create client」ボタンをクリックします。
   - 「Client type」は「OpenID Connect」を選択
   - 「Client ID」に `nextjs-client` と入力
   - 「Client authentication」を「On」に設定
   - 「Valid redirect URIs」に `http://localhost:3000/api/auth/*` と入力
   - 「Web origins」に `http://localhost:3000` と入力

3. 作成したクライアント（nextjs-client）の設定画面で「Credentials」タブをクリックし、表示される「Client secret」の値をコピーします。

4. 左側のメニューから「Users」を選択し、「Add user」ボタンをクリックして新しいユーザーを作成します：
   - 「Username」に `testuser` と入力
   - 「Email」に任意のメールアドレスを入力
   - 「Email verified」にチェックを入れる
   - ユーザー作成後、「Credentials」タブでパスワード（例: `password`）を設定し、「Temporary」を「Off」に設定

## ステップ3: 環境変数の設定

1. Nextプロジェクトの`.env.local`ファイルを編集して、以下の変数を設定します：

```bash
# KeyCloakから取得したクライアントシークレットを設定
AUTH_KEYCLOAK_SECRET="ここにKeyCloakから取得したクライアントシークレットを貼り付ける"

# 以下は認証用シークレット（本番環境では必ず変更してください）
AUTH_SECRET="$(openssl rand -base64 32)"
```

## ステップ4: Next.jsアプリケーションの起動

1. frontendディレクトリに移動し、依存関係をインストールします（初回のみ）：

```bash
cd frontend
npm install
```

2. アプリケーションを開発モードで起動します：

```bash
npm run dev
```

3. ブラウザで以下のURLにアクセスします：

```
http://localhost:3000
```

## 動作確認

1. トップページの「ログイン」ボタンをクリックすると、KeyCloakのログインページにリダイレクトされます。
2. 作成したテストユーザー（testuser/password）でログインすると、Next.jsアプリケーションに戻り、ユーザー情報が表示されます。
3. 「ダッシュボードへ」ボタンをクリックすると、保護されたダッシュボードページが表示されます。
4. ログアウト後に再度ダッシュボードにアクセスしようとすると、自動的にKeyCloakのログインページにリダイレクトされます。

## SSO（シングルサインオン）の確認

KeyCloakによるSSOを確認するには、同じレルム（my-app-realm）に別のクライアントアプリケーションを登録し、片方でログインした後、もう片方にアクセスすると自動的に認証された状態になることを確認できます。詳細は`docs/SSO解説.md`を参照してください。

## トラブルシューティング

- KeyCloakのログインページにリダイレクトされない場合は、KeyCloakが正常に起動しているか確認してください。
- 「Invalid redirect URI」エラーが表示される場合は、KeyCloakのクライアント設定で正しいリダイレクトURIが設定されているか確認してください。
- トークン検証エラーが発生する場合は、環境変数の`AUTH_KEYCLOAK_SECRET`と`AUTH_KEYCLOAK_ISSUER`が正しく設定されているか確認してください。
