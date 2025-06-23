function findUnique(arr) {
  const seen = {};
  const result = [];

  for (let num of arr) {
    if (seen[num] === undefined) {
      seen[num] = 1;
    } else {
      seen[num]++;
    }
  }

  for (let num of arr) {
    if (seen[num] === 1) {
      result.push(num);
    }
  }

  return result;
}
function findMissing(arr) {
  const n = arr.length + 1;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  return expectedSum - actualSum;
}

function reversePrint(linkedList) {
  if (linkedList.next) {
    reversePrint(linkedList.next);
  }
  console.log(linkedList.value);
}