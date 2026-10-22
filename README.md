# Scoring64 ダウンロード

紙のテストのための電子採点ソフト「Scoring64」のインストーラーを置いています。ソースコードは、ここにはありません。

**使い方・よくある質問・料金は、こちらのサイトにまとめています：<https://scoring64.fermion.company/>**

## ダウンロード

- Windows：[最新版をダウンロード](https://github.com/Fermion-company/scoring64-download/releases/latest/download/Scoring64-Setup.exe)（`Scoring64-Setup.exe`）
- Mac（Apple Silicon）：[最新版をダウンロード](https://github.com/Fermion-company/scoring64-download/releases/latest/download/Scoring64-mac-arm64.zip)（`Scoring64-mac-arm64.zip`）。開いてできた `Scoring64.app` を「アプリケーション」フォルダに移します。

一度入れると、新しい版が出たときはアプリの中でお知らせし、再起動するだけで更新できます。

版ごとのファイルと SHA-256 は、[最新版のページ](https://github.com/Fermion-company/scoring64-download/releases/latest)の「Assets」にあります。

## 動作環境

- Windows 10／11（64ビット）
- Apple Silicon の Mac（M1 以降）
- Scoring64 の専用ウィンドウで動きます（ブラウザは開きません）。
- 管理者の権限は要りません。採点や読み取りにインターネットへの接続は要りません（新しい版の確認と、アプリで用紙を作るための TeX の準備のときだけ使います）。答案と成績は、このパソコンの中だけで処理します。

## インストールのときの表示

- Edge に「一般的にダウンロードされていません」と出たとき：「…」→「保持」→「詳細表示」→「保持する」
- 「Windows によって PC が保護されました」と出たとき：「詳細情報」→「実行」
- Mac で「開発元を確認できないため開けません」と出たとき：「システム設定」→「プライバシーとセキュリティ」の下にある「このまま開く」を押します。
- Mac で更新したあとに「キーチェーンへのアクセス」の確認が出たとき：ログインのパスワードを入れて「常に許可」を押します。ライセンスはそのまま使えます。

## ライセンスキー

このPCで毎月2テストまで、人数制限なしですべての機能を無料で使えます。初めて採点するテストを1回と数え、日本時間の毎月1日に無料枠を更新します。同じテストへの答案追加・再採点・出力では、翌月以降も枠を消費しません。上限後は新しいテストの採点だけを停止します。有料版はテスト数も無制限で、1教室・最大5台。税込定価は月3,300円、年33,000円、買い切り82,500円、任意保守は年8,250円です。

## お問い合わせ

株式会社Fermion　contact@fermion.company

このソフトウェアの著作権は株式会社Fermionにあります。使用には、当社との使用許諾契約への同意が必要です。

## 申込とキーの案内

申込方法とPCコードの提出・キー登録は `pricing.html#apply` と `pricing.html#license` を正本とし、`start.html#key`・`contact.html`・`faq.html#q-buy` から案内します。キー発行は本体リポジトリ `Fermion-company/Scoring64` の `docs/licensing.md` にある販売元の手順で行います。このサイトにキー発行・自動メール送信の処理はありません。

請求書は既存のGoogleフォームを使います。現在の選択肢は年払い・買い切り・保守の更新・複数教室の見積もりで、PCコードは「ご質問・ご要望」欄へ記入する案内です。月払いの請求書の相談と、申込後のPCコード提出は `contact@fermion.company` で受けます。フォームを編集する場合は、編集権限と公開側の表示を確認し、販売条件は会社サイトの `https://fermion.company/tokushoho#scoring64` と照合してください。

## サイトの検証と配信

公開サイトの正本はこのリポジトリの `main` 直下です。GitHub Pagesの設定は `build_type: legacy`、sourceは `main` の `/`、独自ドメインは `CNAME` の `scoring64.fermion.company` です。アプリ本体のCI・Release公開とは別の配信です。Vercelは使いません。

変更はworktreeで行います。専用のビルド・テストコマンドはなく、静的HTMLを配信します。`git diff --check`、変更したHTMLの内部リンクと構造化データ、料金・申込先の維持を確認し、`python3 -m http.server 4364 --bind 127.0.0.1` で表示します。PCコードの案内から申込先・提出先・キー登録まで、デスクトップと狭い画面で確認します。実際の申込・決済・メール送信は表示確認に含めません。

検証済みのコミットを `main` へpushすると、既存の `pages-build-deployment` が配信します。認証は保存済みの `gh`／Git認証を使います。`gh api repos/Fermion-company/scoring64-download/pages` で配信元、`gh run list --repo Fermion-company/scoring64-download --limit 3` と `gh api repos/Fermion-company/scoring64-download/pages/builds/latest` でコミットと成功状態を確認し、本番の変更ページと申込フォームを開いて確認してください。公開リポジトリのPagesは本体リポジトリの有料Actions枠とは状況が異なるため、配信できるかは対象の実行結果で判断します。代替の本番配信経路は未設定です。配信が失敗した場合は成功扱いせず、既存の本番表示と未反映のコミットを報告します。

## アクセス解析

各案内ページは `assets/analytics.js` から GA4 を読み込みます。測定 ID は同ファイルの `measurementId` に設定します。GA4 の拡張計測を有効にし、閲覧を `page_view`、インストーラーへのクリックを `file_download` で確認します。クリック数はダウンロード完了数ではありません。実際のリリース資産の取得数は GitHub Releases で確認します。広告向け設定は無効です。解析についての案内は `contact.html#analytics` にあります。
