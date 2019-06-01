const exercise = require("./exercise");

test("No jobs passed in, the result should be an empty sequence", () => {
  expect(exercise("")).toEqual([]);
});

test("A single job 'a' passed in, the result should be a sequence containing only 'a'", () => {
  let collection = "a =>";
  expect(exercise(collection)).toEqual(["a"]);
});

test("Three jobs 'a, b, c' passed in, the result should be a sequence containing all three jobs - in no significant order", () => {
  let collection = `a =>
b =>
c =>`;
  expect(exercise(collection)).toIncludeSameMembers(["a", "b", "c"]);
});
