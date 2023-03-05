import { roundOffIncluding5 } from "./util";

describe("Util#roundOffIncluding5", () => {
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
