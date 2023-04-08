// Big-o = O(log n)
function power_of_two(n) {
  if (n < 1) {
    return false;
  }
  while (n > 1) {
    if (n % 2 !== 0) {
      return false;
    }
    n /= 2;
  }
  return true;
}

console.log(power_of_two(1));
console.log(power_of_two(2));
console.log(power_of_two(5));

// Big-o = O(1)
function power_of_two(n) {
  if (n < 1) {
    return false;
  }

  return (n & (n - 1)) === 0;
}

console.log(power_of_two(1));
console.log(power_of_two(2));
console.log(power_of_two(5));
