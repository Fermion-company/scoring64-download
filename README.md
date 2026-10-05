# Scoring64 ダウンロード

紙のテストのための電子採点ソフト「Scoring64」のインストーラーを置いています。ソースコードは、ここにはありません。

**使い方・よくある質問・料金は、こちらのサイトにまとめています：<https://fermion-company.github.io/scoring64-download/>**

## ダウンロード

- Windows：[最新版をダウンロード](https://github.com/Fermion-company/scoring64-download/releases/latest/download/Scoring64-Setup.exe)（`Scoring64-Setup.exe`）
- Mac（Apple Silicon）：[最新版のページ](https://github.com/Fermion-company/scoring64-download/releases/latest)の「Assets」から `Scoring64-版-mac-arm64.zip` をダウンロードし、開いてできた `Scoring64.app` を「アプリケーション」フォルダに移します。

一度入れると、新しい版が出たときはアプリの中でお知らせし、再起動するだけで更新できます。

版ごとのファイルと SHA-256 は、[最新版のページ](https://github.com/Fermion-company/scoring64-download/releases/latest)の「Assets」にあります。

## 動作環境

- Windows 10／11（64ビット）
- Apple Silicon の Mac（M1 以降）
- 専用のウィンドウで開きます。ブラウザは要りません。
- 管理者の権限は要りません。使うときにインターネットへの接続は要りません。答案と成績は、このパソコンの中だけで処理します。

## インストールのときの表示

- Edge に「一般的にダウンロードされていません」と出たとき：「…」→「保持」→「詳細表示」→「保持する」
- 「Windows によって PC が保護されました」と出たとき：「詳細情報」→「実行」
- Mac で「開発元を確認できないため開けません」と出たとき：「システム設定」→「プライバシーとセキュリティ」の下にある「このまま開く」を押します。
- Mac で更新したあとに「キーチェーンへのアクセス」の確認が出たとき：ログインのパスワードを入れて「常に許可」を押します。ライセンスはそのまま使えます。

## ライセンスキー

初めて使うときから10日間は、すべての機能を試せます。マークシートの読み取り・正誤判定・得点計算・結果CSVは、その後もキーなしで使えます。用紙作成・記述採点・成績表・返却PDFなどには、ご契約のときにお送りするライセンスキーが要ります。

## お問い合わせ

株式会社Fermion　contact@fermion.company

このソフトウェアの著作権は株式会社Fermionにあります。使用には、当社との使用許諾契約への同意が必要です。

## アクセス解析

各案内ページは `assets/analytics.js` から GA4 を読み込みます。測定 ID は同ファイルの `measurementId` に設定します。GA4 の拡張計測を有効にし、閲覧を `page_view`、インストーラーへのクリックを `file_download` で確認します。クリック数はダウンロード完了数ではありません。実際のリリース資産の取得数は GitHub Releases で確認します。広告向け設定は無効です。解析についての案内は `contact.html#analytics` にあります。
