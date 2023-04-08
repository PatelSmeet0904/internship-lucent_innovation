const binary_search = (arr, t) => {
  let leftindex = 0;
  let rightindex = arr.length - 1;

  while (leftindex <= rightindex) {
    let midindex = Math.floor((leftindex + rightindex) / 2);
    if (t === arr[midindex]) {
      return midindex;
    }
    if (t < arr[midindex]) {
      rightindex = midindex - 1;
    } else {
      leftindex = midindex + 1;
    }
  }
  return -1;
};
console.log(binary_search([-5, 2, 10, 4, 6], 10));
console.log(binary_search([-5, 2, 10, 4, 6], 20));
