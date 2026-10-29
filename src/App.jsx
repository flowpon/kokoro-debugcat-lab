import { useEffect, useState } from "react";
import { questions } from "./data/questions";
import { results } from "./data/results";
import { calculateDiagnosis } from "./utils/diagnosis";
import "./index.css";

function App() {
  // 画面と診断の状態
  const [screen, setScreen] = useState("home");
  const [legalReturnScreen, setLegalReturnScreen] = useState("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [diagnosis, setDiagnosis] = useState(null);

  // 図鑑の状態
  const [catalogReturnScreen, setCatalogReturnScreen] = useState("home");
  const [selectedBugId, setSelectedBugId] = useState(null);

  // URLコピーのメッセージ
  const [copyMessage, setCopyMessage] = useState("");

  const question = questions[currentQuestion];
  const selectedBug = selectedBugId ? results[selectedBugId] : null;

  // ロード画面を4秒表示して結果へ進む
  useEffect(() => {
    if (screen !== "loading") return;

    const resultTimer = setTimeout(() => {
      setScreen("result");
    }, 4000);

    return () => {
      clearTimeout(resultTimer);
    };
  }, [screen]);

  // 診断開始
  function startDiagnosis() {
    setAnswers([]);
    setCurrentQuestion(0);
    setDiagnosis(null);
    setCopyMessage("");
    setSelectedBugId(null);
    setScreen("quiz");
  }

  // 回答を保存して次へ進む
  function selectAnswer(typeId) {
    const nextAnswers = [...answers];
    nextAnswers[currentQuestion] = typeId;
    setAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setDiagnosis(calculateDiagnosis(nextAnswers));
      setScreen("loading");
    }
  }

  // 前の質問へ戻る
  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }

  // 図鑑を開く
  function openCatalog(fromScreen) {
    setCatalogReturnScreen(fromScreen);
    setSelectedBugId(null);
    setScreen("catalog");
  }

  // 図鑑を閉じて元の画面へ戻る
  function closeCatalog() {
    setSelectedBugId(null);
    setScreen(catalogReturnScreen);
  }

  function openLegalPage(page) {
    if (screen !== "privacy" && screen !== "security") {
      setLegalReturnScreen(screen);
    }

    setScreen(page);
  }

  function closeLegalPage() {
    setScreen(legalReturnScreen);
  }

  // Xで診断結果をシェア

  function shareToX() {
    if (!diagnosis) return;

    const text = `私のココロに住むバグねこは「${diagnosis.result.name}」でした！🐾🔍

    あなたのココロにはどんなバグねこが住んでる？🐈
    気になる人は診断してみてね！
    あなたの診断結果もぜひポストで教えてね✨

    #ココロに住むバグねこ診断`;

    const url = `${window.location.origin}${window.location.pathname}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  }

  // 診断サイトのURLをコピー

  async function copyUrl() {
    if (!diagnosis) return;

    try {
      const url = `${window.location.origin}${window.location.pathname}`;

      const text = `私のココロに住むバグねこは「${diagnosis.result.name}」でした！🐾🔍

      あなたのココロにはどんなバグねこが住んでる？🐈
      気になる人は診断してみてね！
      あなたの診断結果もぜひシェアしてね✨

      #ココロに住むバグねこ診断

      🐾 診断はこちら
      ${url}`;

      await navigator.clipboard.writeText(text);
      setCopyMessage("シェア文とURLをコピーしました！");
    } catch {
      setCopyMessage("コピーできませんでした。");
    }
  }

  // トップ画面へ戻る
  function restart() {
    setAnswers([]);
    setCurrentQuestion(0);
    setDiagnosis(null);
    setCopyMessage("");
    setSelectedBugId(null);
    setScreen("home");
  }

  return (
    <main className="app">
      {/* ヘッダー */}
      <header
        className="site-header"
        onClick={restart}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            restart();
          }
        }}
        aria-label="トップページに戻る"
      >
        <p className="brand">
          <span className="english-text">KOKORO DEBUGCAT LAB</span>
        </p>
        <p className="brand-subtitle">ココロに住むバグねこ診断</p>
      </header>

      {/* ホーム画面 */}
      {screen === "home" && (
        <section className="panel home">
          <p className="eyebrow">
            <span className="english-text">KOKORO DEBUGCAT LAB</span>
          </p>

          <div className="hero-icon" aria-hidden="true">
            <img
              src={`${import.meta.env.BASE_URL}images/overthinking.png`}
              alt="考えすぎバグのキャラクター"
            />
          </div>

          <h1>
            ココロに住むバグねこ、
            <br />
            見つけてみない？
          </h1>

          <p className="description">
            考えすぎたり、つい先延ばししたり。
            <br />
            あなたのココロにも、ちょっと不思議なクセねこが住みついているかも？
          </p>

          <div className="investigator-intro">
            <p className="investigator-name">🕵️ ココロのバグねこ調査員より</p>
            <p>
              全10問の質問に直感で答えて、
              <br />
              あなたに当てはまるバグねこを見つけよう!
            </p>
          </div>

          <button className="primary-button" onClick={startDiagnosis}>
            診断をはじめる →
          </button>

          <button
            className="option-button catalog-entry"
            onClick={() => openCatalog("home")}
          >
            📚 バグねこ図鑑を見る
          </button>
        </section>
      )}

      {/* 質問画面 */}
      {screen === "quiz" && (
        <section className="panel quiz">
          <p className="eyebrow">ココロのバグねこを調査中...</p>

          <div className="progress-info">
            <span>
              {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
            </span>
          </div>

          <div
            className="progress-track"
            role="progressbar"
            aria-label="診断の進捗"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(
              ((currentQuestion + 1) / questions.length) * 100,
            )}
          >
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h1 className="question-title">{question.text}</h1>

          <p className="description">あなたに一番近いものを選んでね。</p>

          <div className="options">
            {question.options.map((option, index) => (
              <button
                className="option-button"
                key={`${question.id}-${index}`}
                onClick={() => selectAnswer(option.type)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option.text}</span>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button className="back-button" onClick={goBack}>
              ← 前の質問に戻る
            </button>
          )}
        </section>
      )}

      {/* 解析中のロード画面 */}
      {screen === "loading" && (
        <section className="panel loading-screen" aria-label="診断結果を解析中">
          <p className="eyebrow">
            <span className="english-text">KOKORO DEBUGCAT LAB</span>
          </p>

          <div className="loading-bug" aria-hidden="true">
            🐾
          </div>

          <h1 className="loading-title">ココロを解析中...</h1>

          <div
            className="loading-track"
            role="progressbar"
            aria-label="解析の進捗"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="loading-fill" />
          </div>
        </section>
      )}

      {/* 結果画面・調査レポート */}
      {screen === "result" && diagnosis && (
        <section className="panel result">
          <p className="eyebrow">
            <span className="english-text">YOUR KOKORO DEBUG REPORT</span>
          </p>

          <img
            className="result-image"
            src={diagnosis.result.image}
            alt={diagnosis.result.character}
          />

          <p className="result-label">
            あなたのココロに住んでいるバグねこは...
          </p>

          <h1 className="result-title">{diagnosis.result.name}</h1>

          <p className="character-name">
            キャラクター：{diagnosis.result.character}
          </p>

          <p className="catchphrase">{diagnosis.result.catchphrase}</p>

          <div className="result-section">
            <h2>🔍 バグねこの特徴</h2>
            <p>{diagnosis.result.description}</p>
          </div>

          <div className="result-section">
            <h2>✨ このバグねこのいいところ</h2>
            <p>{diagnosis.result.strength}</p>
          </div>

          <div className="result-section">
            <h2>🛠️ ココロのデバッグ方法</h2>
            <p>{diagnosis.result.advice}</p>
          </div>

          <div className="investigator-note">
            <p className="investigator-note-label">📝 調査員からのメモ</p>
            <p>{diagnosis.result.investigatorNote}</p>
          </div>

          <div className="share-buttons">
            <button className="option-button" onClick={shareToX}>
              𝕏 結果をシェアする
            </button>

            <button className="option-button" onClick={copyUrl}>
              🔗 URLをコピーしてシェアする
            </button>

            {copyMessage && (
              <p className="copy-message" role="status">
                {copyMessage}
              </p>
            )}
          </div>

          <button className="back-button" onClick={restart}>
            トップに戻る
          </button>
        </section>
      )}

      {/* バグ図鑑 */}
      {screen === "catalog" && (
        <section className="panel catalog">
          <p className="eyebrow">
            <span className="english-text">KOKORO BUGCAT ENCYCLOPEDIA</span>
          </p>

          <h1 className="catalog-title">ココロのバグねこ図鑑</h1>

          <p className="description">
            ココロに住む8種類のバグねこたち。
            <br />
            気になるバグねこを調査してみよう。
          </p>

          <div className="catalog-grid">
            {Object.entries(results).map(([typeId, bug]) => (
              <button
                className={`catalog-card ${
                  selectedBugId === typeId ? "is-selected" : ""
                }`}
                key={typeId}
                onClick={() =>
                  setSelectedBugId(selectedBugId === typeId ? null : typeId)
                }
                aria-pressed={selectedBugId === typeId}
              >
                <img
                  className="catalog-image"
                  src={bug.image}
                  alt={bug.character}
                />
                <span className="catalog-name">{bug.character}</span>
                <span className="catalog-type">{bug.name}</span>
                <span className="catalog-hint">
                  {selectedBugId === typeId ? "選択中" : "詳細を見る →"}
                </span>
              </button>
            ))}
          </div>

          {selectedBug && (
            <div className="catalog-detail" aria-live="polite">
              <p className="catalog-detail-emoji" aria-hidden="true">
                {selectedBug.emoji}
              </p>

              <h2>{selectedBug.name}</h2>
              <p className="character-name">{selectedBug.character}</p>
              <p className="catchphrase">{selectedBug.catchphrase}</p>

              <div className="result-section">
                <h3>🔍 バグねこの特徴</h3>
                <p>{selectedBug.description}</p>
              </div>

              <div className="result-section">
                <h3>✨ このバグねこのいいところ</h3>
                <p>{selectedBug.strength}</p>
              </div>

              <div className="result-section">
                <h3>🛠️ ココロのデバッグ方法</h3>
                <p>{selectedBug.advice}</p>
              </div>
            </div>
          )}

          <button className="primary-button" onClick={closeCatalog}>
            ← {catalogReturnScreen === "result" ? "診断結果に戻る" : "戻る"}
          </button>

          <button
            className="option-button catalog-entry"
            onClick={startDiagnosis}
          >
            🕵️ 診断をはじめる
          </button>
        </section>
      )}

      {/* プライバシーについて */}
      {screen === "privacy" && (
        <section className="panel legal-page">
          <h1>プライバシーについて</h1>

          <div className="result-section">
            <h2>1. このサイトについて</h2>
            <p>
              ココロに住むバグねこ診断は、楽しみながら自分の傾向を知るための
              エンターテインメントコンテンツです。
            </p>
          </div>

          <div className="result-section">
            <h2>2. 個人情報について</h2>
            <p>
              このサイトでは、診断への回答をもとに結果を表示します。
              回答の保存や送信については、実際のプログラムの仕様に従います。
            </p>
          </div>

          <div className="result-section">
            <h2>3. 外部サービスについて</h2>
            <p>
              Google
              Fontsによるフォントの読み込みや、Xへのシェア機能を利用しています。
              これらのサービスでは、各サービスの仕様に応じて情報が取り扱われる場合があります。
            </p>
            <p>
              Google Analyticsを導入した場合は、利用目的や取得する情報について
              このページに追記します。
            </p>
          </div>

          <button className="primary-button" onClick={closeLegalPage}>
            ← 元の画面に戻る
          </button>
        </section>
      )}

      {/* セキュリティについて */}
      {screen === "security" && (
        <section className="panel legal-page">
          <h1>セキュリティについて</h1>

          <div className="result-section">
            <h2>1. 安全なサイト運営</h2>
            <p>
              このサイトは、安心して利用できるよう、
              使用するプログラムや公開設定を適切に管理することを目指しています。
            </p>
          </div>

          <div className="result-section">
            <h2>2. 外部サービスの利用</h2>
            <p>
              フォントの読み込みやSNSへのシェアなど、一部の機能では
              外部サービスを利用しています。
              外部サービスの利用時には、それぞれのサービスの規約や
              プライバシーポリシーもご確認ください。
            </p>
          </div>

          <div className="result-section">
            <h2>3. ご利用にあたって</h2>
            <p>
              この診断はエンターテインメントを目的としたもので、
              医学的な診断や専門的な助言を提供するものではありません。
            </p>
          </div>

          <button className="primary-button" onClick={closeLegalPage}>
            ← 元の画面に戻る
          </button>
        </section>
      )}

      {/* フッター */}
      <footer className="site-footer">
        <p>
          ココロに住むバグねこ診断 |{" "}
          <span className="english-text">KOKORO DEBUGCAT LAB</span>
        </p>
        <p>※この診断はエンターテインメントです。医学的な診断ではありません。</p>

        <nav className="footer-links" aria-label="フッターメニュー">
          <button type="button" onClick={() => openLegalPage("privacy")}>
            プライバシーについて
          </button>
          <button type="button" onClick={() => openLegalPage("security")}>
            セキュリティについて
          </button>
        </nav>

        <p className="copyright">© KOKORO DEBUGCAT LAB</p>
      </footer>
    </main>
  );
}

export default App;
