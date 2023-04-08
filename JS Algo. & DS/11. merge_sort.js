// worst case --> O(n log(n))

function merge_sort(a) {
  if (a.length < 2) {
    return a;
  }

  let mid = Math.floor(a.length / 2);
  let left = a.slice(0, mid);
  let right = a.slice(mid);

  return merge(merge_sort(left), merge_sort(right));
}

function merge(left, right) {
  let sortedArr = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      sortedArr.push(left.shift());
    } else {
      sortedArr.push(right.shift());
    }
  }
  return [...sortedArr, ...left, ...right];
}

const arr = [15, 20, 10, 6, -1];
console.log(merge_sort(arr));
