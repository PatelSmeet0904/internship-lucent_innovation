// worst case --> O(n^2)
// avg case --> O(n log(n))

function quick_sort(a) {
  if (a.length < 2) {
    return a;
  }
  let pivot = a[a.length - 1];
  let left = [];
  let right = [];
  for (let i = 0; i < a.length - 1; i++) {
    if (a[i] < pivot) {
      left.push(a[i]);
    } else {
      right.push(a[i]);
    }
  }
  return [...quick_sort(left), pivot, ...quick_sort(right)];
}

const arr = [15, 20, 10, 6, -1];
console.log(quick_sort(arr));
