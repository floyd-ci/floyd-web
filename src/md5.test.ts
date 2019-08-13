import {md5} from "./md5";

test("md5", (): void => {
  expect(md5("value")).toBe("2063c1608d6e0baf80249c42e2be5804");
});
