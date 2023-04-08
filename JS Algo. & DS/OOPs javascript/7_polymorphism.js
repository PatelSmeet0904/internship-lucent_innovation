// // Run-time polymorphism --> overriding
// class firstClass {
//   add() {
//     console.log("First Method");
//   }
// }
// class secondClass extends firstClass {
//   add() {
//     console.log(30 + 40);
//   }
// }
// class thirdClass extends secondClass {
//   add() {
//     console.log("Last Method");
//   }
// }
// var ob = new firstClass();
// var ob2 = new secondClass();
// var ob3 = new thirdClass();
// ob.add();
// ob2.add();
// ob3.add();

// compile-time polymorphism --> overloading --> not supported
class firstClass {
  add(a, b) {
    console.log("addition of 2 numbers: ", a + b);
  }
  add(a, b, c) {
    console.log("addition of 3 numbers: ", a + b + c);
  }
}
class secondClass extends firstClass {
  add() {
    console.log(30 + 40);
  }
}
class thirdClass extends secondClass {
  add() {
    console.log("Last Method");
  }
}
var ob = new firstClass();
var ob2 = new secondClass();
var ob3 = new thirdClass();
ob.add(1, 2);
ob.add(1, 2, 3);
// ob2.add();
// ob3.add();
