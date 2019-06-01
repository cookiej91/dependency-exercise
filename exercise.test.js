const exercise = require("./exercise");

test("No jobs passed in, the result should be an empty sequence", () => {
  expect(exercise("")).toEqual([]);
});

test("A single job 'a' passed in, the result should be a sequence containing only 'a'", () => {
  let arr = ["a"];
  expect(exercise(arr)).toEqual(["a"]);
});
