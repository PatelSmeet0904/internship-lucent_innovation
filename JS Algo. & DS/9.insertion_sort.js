function insertion_sort(a) {
  for (let i = 1; i < a.length; i++) {
    let j = i - 1;
    let k = a[i];
    while (j >= 0 && a[j] > k) {
      a[j + 1] = a[j];
      j = j - 1;
    }
    a[j + 1] = k;
  }
}

const arr = [15, 20, 10, 6, -1];
insertion_sort(arr);
console.log(arr);
