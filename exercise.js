function jobs(a) {
  if (!a) {
    return [];
  }

  let tempArr = a.split("\n");
  let result = [];
  for (let i = 0; i < tempArr.length; i++) {
    result.push(tempArr[i][0]);
  }

  return result;
}

module.exports = jobs;
