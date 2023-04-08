function search(arr, t, li, ri) {
  if (li > ri) {
    return -1;
  }

  let midindex = Math.floor((li + ri) / 2);
  if (t === arr[midindex]) {
    return midindex;
  }
  if (t < arr[midindex]) {
    return search(arr, t, li, midindex - 1);
  } else {
    return search(arr, t, li + 1, ri);
  }
}
const recurnsive_binary_search = (arr, t) => {
  return search(arr, t, 0, arr.length - 1);
};

console.log(recurnsive_binary_search([-5, 2, 10, 4, 6], 10));
console.log(recurnsive_binary_search([-5, 2, 10, 4, 6], 20));
