function jobs(jobsList) {
  if (!jobsList) {
    return [];
  }

  const pairs = jobsToPairs(jobsList);

  // L ← Empty list that will contain the sorted elements
  let sorted = [];

  // S ← Set of all nodes with no incoming edge
  let queue = findJobsWithoutDependents(pairs);

  // while S is non-empty do
  while (queue.length !== 0) {
    // remove a node n from S
    let jobName = queue.pop();

    // add n to tail of L
    sorted.push(jobName);

    let job = pairs.find(job => job[0] === jobName);

    // if node n has a dependency m
    if (job[1].length) {
      // insert m into S
      queue.push(job[1]);
    }
  }

  return sorted.reverse();
}

function jobsToPairs(jobsList) {
  let lines = jobsList.split("\n");
  let pairs = [];

  for (let i = 0; i < lines.length; i++) {
    pairs.push(lines[i].split(/ => ?/));
  }

  return pairs;
}

function findJobsWithoutDependents(pairs) {
  // pairs [["a", "b"], ["b", "c"]] etc
  let withoutDependents = [];

  for (let i = 0; i < pairs.length; i++) {
    let jobName = pairs[i][0];

    // Check if any other jobs depend on the current job
    let hasDependents = pairs.some(job => job[1] === jobName);

    // We only want jobs which have nothing depending on them.
    if (!hasDependents) {
      withoutDependents.push(jobName);
    }
  }

  return withoutDependents;
}

module.exports = jobs;
