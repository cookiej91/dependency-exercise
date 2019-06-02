/**
 * Convert a list of jobs to an array of pairs.
 *
 * @param {String} jobsList a list of jobs to convert to pairs
 * @returns {Array} pairs for the jobs that were passed in
 */
function jobsToPairs(jobsList) {
  const lines = jobsList.split("\n");
  let pairs = [];

  for (let i = 0; i < lines.length; i++) {
    const pair = lines[i].split(/ => ?/);

    if (pair[0] === pair[1]) {
      throw new Error("Cyclic Dependency Detected");
    }

    pairs.push(pair);
  }

  return pairs;
}

/**
 * Returns the jobs that have nothing depending on them
 *
 * @param {Array} pairs
 * @returns {Array} mapped names
 */
function findJobsWithoutDependents(pairs) {
  // pairs [["a", "b"], ["b", "c"]] etc

  // Check right side of pairs against current left side
  return pairs
    .filter(currentJob => {
      const hasDependents = pairs.some(
        otherJob => otherJob[1] === currentJob[0]
      );

      return !hasDependents;
    })
    .map(pair => pair[0]);
}

/**
 * Returns a sorted array of jobs based on their dependents
 *
 * @param {String} jobsList
 * @returns {Array} sorted list
 */
function jobs(jobsList) {
  if (!jobsList) {
    return [];
  }

  const pairs = jobsToPairs(jobsList);

  // sorted is an empty array that will contain the sorted elements
  let sorted = [];

  // Queue is set of all nodes with no incoming edge
  const queue = findJobsWithoutDependents(pairs);

  // while the queue is not empty
  while (queue.length > 0) {
    // remove a job from the queue
    const jobName = queue.pop();

    // and add the job to tail of the sorted array
    sorted.push(jobName);

    const job = pairs.find(job => job[0] === jobName);

    // if the job has a dependency
    if (job[1].length) {
      // insert the job into the queue
      queue.push(job[1]);
    }
  }

  // If we have not received the same amount of jobs back as originally given
  // we can assume that a circular reference has been found.
  if (sorted.length !== pairs.length) {
    throw new Error("Circular Dependency Detected");
  }

  return sorted.reverse();
}

module.exports = jobs;
