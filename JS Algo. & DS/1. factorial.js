// Big-o = O(n)
const factorial = (n) => {
  let ans = 1;
  let temp = 1;
  while (temp <= n) {
    ans *= temp;
    temp += 1;
  }

  return ans;
};

console.log(factorial(0));

// Big-o = O(n)
const fact_rec = (n) => {
  if (n === 0) {
    return 1;
  }

  return n * fact_rec(n - 1);
};

console.log(fact_rec(0));
