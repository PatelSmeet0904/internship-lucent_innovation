const set = new Set([1, 2, 3]);
set.add(4);
set.has(4);
set.delete(3);
set.size;
set.clear();

for (const item of set) {
  console.log(item);
}

const map = new Map([
  ["a", 1],
  ["b", 2],
]);
map.set("c", 3);
map.has("c");
map.delete("c");
map.size;
map.clear();

for (const [key, val] of map) {
  console.log(key, val);
}
