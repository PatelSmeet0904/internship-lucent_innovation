function bubble_sort(a) {
  let swap;
  do {
    swap = false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] > a[i + 1]) {
        const temp = arr[i];
        a[i] = a[i + 1];
        a[i + 1] = temp;
        swap = true;
      }
    }
  } while (swap);
}

const arr = [-6, 2, 10, 6, -1];
bubble_sort(arr);
console.log(arr);
