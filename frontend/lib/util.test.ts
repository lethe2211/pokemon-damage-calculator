import { convertHiraganaToKatakana, roundOffIncluding5 } from "./util";

describe("roundOffIncluding5", () => {
  describe("Normal cases", () => {
    test("Round down in case of x.49", () => {
      const expected = 67;
      const actual = roundOffIncluding5(67.49);
      expect(actual).toBe(expected);
    });

    test("Round down in case of x.5", () => {
      const expected = 67;
      const actual = roundOffIncluding5(67.5);
      expect(actual).toBe(expected);
    });

    test("Round up in case of x.51", () => {
      const expected = 68;
      const actual = roundOffIncluding5(67.51);
      expect(actual).toBe(expected);
    });
  });
});

describe("convertHiraganaToKatakana", () => {
  describe("Normal cases", () => {
    test("Convert hiragana into Katakana", () => {
      const expected = "リンゴ"
      const actual = convertHiraganaToKatakana("りんご")
      expect(actual).toBe(expected);
    })

    test("Convert only hiragana in the input string", () => {
      const expected = "ヒラガナカタカナ漢字混ジリノ言葉"
      const actual = convertHiraganaToKatakana("ひらがなカタカナ漢字混じりの言葉")
      expect(actual).toBe(expected);
    })
  })
});
