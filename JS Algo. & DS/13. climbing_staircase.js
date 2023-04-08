// O(mn)

function climbing_staircase(n) {
  let res = [1, 2];
  for (let i = 2; i < n; i++) {
    res[i] = res[i - 1] + res[i - 2];
  }
  return res[n - 1];
}

console.log(climbing_staircase(5));
