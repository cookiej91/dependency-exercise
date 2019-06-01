const exercise = require("./exercise");

test("No jobs passed in, the result should be an empty sequence", () => {
  expect(exercise("")).toStrictEqual([]);
});
