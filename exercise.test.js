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

test("Three jobs 'a, b, c' passed in, the result should be a sequence that positions c before b", () => {
  let result = exercise(`a =>
b => c
c =>`);
  expect(result).toIncludeSameMembers(["a", "b", "c"]);
  expect(result.indexOf("c")).toBeLessThan(result.indexOf("b"));
});

test("Three jobs 'a, b, c, d, e, f' passed in, sorts jobs into dependency order", () => {
  let result = exercise(`a =>
b => c
c => f
d => a
e => b
f =>`);
  expect(result).toIncludeSameMembers(["a", "b", "c", "d", "e", "f"]);
  expect(result.indexOf("f")).toBeLessThan(result.indexOf("c"));
  expect(result.indexOf("c")).toBeLessThan(result.indexOf("b"));
  expect(result.indexOf("b")).toBeLessThan(result.indexOf("e"));
  expect(result.indexOf("a")).toBeLessThan(result.indexOf("d"));
});

test("An error should be thrown when a job depends upon itself", () => {
  expect(() => {
    exercise(`a =>
b =>
c => c`);
  }).toThrow("Cyclic Dependency Detected");
});

test("An error should be thrown when a circular dependency is found", () => {
  expect(() => {
    exercise(`a =>
b => c
c => f
d => a
e =>
f => b`);
  }).toThrow("Circular Dependency Detected");
});
