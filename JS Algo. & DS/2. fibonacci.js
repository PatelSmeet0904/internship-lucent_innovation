// Big-o = O(n)
const fibonacci = (n) => {
  let l = [0, 1];
  for (let i = 2; i <= n; i++) {
    // l[i] = l[i - 1] + l[i - 2];
    l.push(l[i - 1] + l[i - 2]);
  }
  return l;
};

console.log(fibonacci(7));

// Big-o = O(2^n) --> not good
const fib_rec = (n) => {
  //   if (n === 0) return 0;
  //   if (n === 1) return 1;
  if (n < 2) return n;

  return fib_rec(n - 1) + fib_rec(n - 2);
};

console.log(fib_rec(7));
