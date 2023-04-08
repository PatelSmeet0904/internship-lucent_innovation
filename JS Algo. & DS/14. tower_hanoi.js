// O(2^n)

function towerOfHanoi(n, a, c, b) {
  if (n === 1) {
    console.log(`Move disk 1 from ${a} to ${c}`);
    return;
  }
  towerOfHanoi(n - 1, a, b, c);
  console.log(`Move disk ${n} from ${a} to ${c}`);
  towerOfHanoi(n - 1, b, c, a);
}

towerOfHanoi(3, "A", "C", "B");
