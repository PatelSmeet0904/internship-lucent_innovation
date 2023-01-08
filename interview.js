// Que-1
function fact(x) {
  if (x === 1 || x === 0) {
    return 1;
  }
  return x * fact(x - 1);
}

console.log(fact(5));

// Que-2
for (let i = 0; i < 101; i++) {
  if (i % 10 == 0) {
    console.log(i);
  } else if (i % 5 == 0) {
    continue;
  } else {
    console.log(i);
  }
}

// Que-3
String.prototype.replaceAt = function (index, replacement) {
  if (index >= this.length) {
    return this.valueOf();
  }

  return this.substring(0, index) + replacement + this.substring(index + 1);
};

function arr(a, l) {
  let lis = "";
  for (let i = 0; i < a; i++) {
    // 0->tail
    lis = lis.concat("0");
  }
  for (const v of l) {
    let b = v.split(" ");
    if (b[0] === "0") {
      for (let i = +b[1]; i <= +b[2]; i++) {
        if (lis[i] === "0") {
          lis = lis.replaceAt(i, "1");
        } else if (lis[i] === "1") {
          lis = lis.replaceAt(i, "0");
        }
      }
      console.log(lis);
    } else {
      let li = lis.slice(+b[1], +b[2] + 1);
      let c = 0;
      for (i of li) {
        if (i === "1") {
          c++;
        }
      }
      console.log(c);
    }
  }
}

arr(4, ["1 0 3", "0 1 2", "1 0 1", "1 0 0", "0 0 3", "1 0 3", "1 3 3"]);
