import { results } from "../data/results";

const TYPE_IDS = Object.keys(results);

export function calculateDiagnosis(answers) {
  // 8タイプの得点を初期化
  const scores = Object.fromEntries(TYPE_IDS.map((typeId) => [typeId, 0]));

  const counts = Object.fromEntries(TYPE_IDS.map((typeId) => [typeId, 0]));

  // 回答を集計
  answers.forEach((typeId) => {
    if (!Object.hasOwn(scores, typeId)) return;

    scores[typeId] += 2;
    counts[typeId] += 1;
  });

  // 最高得点を取得
  const maxScore = Math.max(...Object.values(scores));

  // 最高得点のタイプを候補にする
  const candidates = TYPE_IDS.filter((typeId) => scores[typeId] === maxScore);

  // 同点なら候補からランダムに選ぶ
  const winner = candidates[Math.floor(Math.random() * candidates.length)];

  return {
    type: winner,
    result: results[winner],
    scores,
    counts,
  };
}
