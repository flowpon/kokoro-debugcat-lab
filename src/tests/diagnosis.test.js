import { describe, it, expect } from "vitest";
import { calculateDiagnosis } from "../utils/diagnosis";
import { results } from "../data/results";
import { questions } from "../data/questions";

describe("診断ロジックのテスト", () => {
  it("8タイプのうち1つを結果として返す", () => {
    const answers = [
      "overthinking",
      "people_pleasing",
      "procrastination",
      "perfectionism",
      "emotional",
      "distance_control",
      "easygoing",
      "hyperfocus",
      "overthinking",
      "hyperfocus",
    ];

    const diagnosis = calculateDiagnosis(answers);

    expect(results[diagnosis.type]).toBeDefined();
    expect(diagnosis.result).toEqual(results[diagnosis.type]);
  });

  it("10問すべてに回答した場合、合計10回答を集計する", () => {
    const answers = [
      "overthinking",
      "people_pleasing",
      "procrastination",
      "perfectionism",
      "emotional",
      "distance_control",
      "easygoing",
      "hyperfocus",
      "overthinking",
      "hyperfocus",
    ];

    const diagnosis = calculateDiagnosis(answers);
    const total = Object.values(diagnosis.counts).reduce(
      (sum, count) => sum + count,
      0,
    );

    expect(total).toBe(10);
  });

  it("どのタイプも選ばれていない場合も結果を返す", () => {
    const diagnosis = calculateDiagnosis([]);

    expect(results[diagnosis.type]).toBeDefined();
  });

  it("8タイプすべてが診断結果になりうる", () => {
    const typeIds = Object.keys(results);

    typeIds.forEach((typeId) => {
      const answers = Array(10).fill(typeId);
      const diagnosis = calculateDiagnosis(answers);

      expect(diagnosis.type).toBe(typeId);
    });
  });

  it("回答パターンを試して8タイプの出現回数を集計する", () => {
    const typeIds = Object.keys(results);
    const appearances = Object.fromEntries(
      typeIds.map((typeId) => [typeId, 0]),
    );

    // 5択の組み合わせをランダムに10000回試す
    for (let i = 0; i < 10000; i += 1) {
      const answers = questions.map((question) => {
        const option =
          question.options[Math.floor(Math.random() * question.options.length)];

        return option.type;
      });

      const diagnosis = calculateDiagnosis(answers);
      appearances[diagnosis.type] += 1;
    }

    console.log("タイプ別の出現回数:", appearances);

    expect(
      Object.values(appearances).reduce((sum, count) => sum + count, 0),
    ).toBe(10000);
  });
});
