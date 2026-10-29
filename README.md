# 🐱 ココロに住むバグねこ診断｜KOKORO DEBUGCAT LAB

**あなたのココロには、どんなバグねこが住んでる？**

ココロのクセを「バグねこ」にたとえて楽しく見つける、全10問のエンタメ診断アプリです。

🔗 **[診断サイトはこちら](https://flowpon.github.io/kokoro-debugcat-lab/)**

---

## 🌷 主な機能

- 全10問の選択式診断
- 診断結果にキャラクター画像・特徴・いいところ・デバッグ方法を表示
- 診断結果をシェア
- 診断サイトのURLをコピー
- 8種類のバグねこを閲覧できる図鑑
- 診断の進捗表示
- 解析中のローディング画面

## 🐾 診断タイプ

| タイプID           | 診断タイプ       | キャラクター名 |
| ------------------ | ---------------- | -------------- |
| `overthinking`     | 考えすぎループ型 | ぐるぐるちゃん |
| `people_pleasing`  | 気遣い過剰型     | いいこちゃん   |
| `procrastination`  | 先延ばし型       | あとでちゃん   |
| `perfectionism`    | 完璧主義型       | きっちりちゃん |
| `emotional`        | 感情ダダ漏れ型   | ぽろりちゃん   |
| `distance_control` | 距離感調整型     | すいすいちゃん |
| `easygoing`        | マイペース型     | のんびりちゃん |
| `hyperfocus`       | 好きに一直線型   | むちゅうちゃん |

## 🛠️ 使用技術

- React
- Vite
- JavaScript
- CSS
- Vitest（診断ロジックのテスト）
- Google Analytics 4（アクセス解析）

## 🚀 セットアップ

### 1. 依存パッケージをインストール

```bash
npm install
```

### 2. 開発サーバーを起動

PowerShellで `npm.ps1` の実行が制限されている場合は、`npm` の代わりに `npm.cmd` を使ってください。

```powershell
npm.cmd run dev
```

ターミナルに表示されたローカルURL（通常は `http://localhost:5173/`）をブラウザで開きます。

## 🏗️ ビルド

本番用ファイルを生成するには、次のコマンドを実行します。

```powershell
npm.cmd run build
```

生成されたファイルは `dist/` フォルダに出力されます。

## 🧪 テスト

診断ロジックのテストを実行します。

```powershell
npx.cmd vitest run
```

Vitestがまだインストールされていない場合は、次のコマンドで追加できます。

```powershell
npm.cmd install -D vitest
```

## 📁 主なファイル構成

```text
kokoro-debug-lab/
├─ public/
│  ├─ images/               # 公開する画像素材
│  └─ ogp.png               # SNSシェア用画像
├─ src/
│  ├─ data/
│  │  ├─ questions.js       # 質問と選択肢
│  │  └─ results.js         # 診断結果データ
│  ├─ tests/
│  │  └─ diagnosis.test.js  # 診断ロジックのテスト
│  ├─ utils/
│  │  └─ diagnosis.js       # 診断結果の計算処理
│  ├─ App.jsx               # 画面と画面遷移
│  ├─ index.css             # アプリ全体のスタイル
│  └─ main.jsx              # Reactアプリの起点
├─ index.html
├─ package.json
└─ README.md
```

※ ファイル構成は実際のプロジェクトに合わせて更新してください。

## 📌 免責事項

この診断はエンタメを目的としています。医療的な診断や専門的な心理評価を行うものではありません。

---

🐾 **あなたのココロには、どんなバグねこが住んでる？**

[ココロに住むバグねこ診断を試す →](https://flowpon.github.io/kokoro-debugcat-lab/)
