const users = [
  { firstname: "Smeet", lastname: "Patel", rollno: 1, age: 20 },
  { firstname: "Bhargav", lastname: "Valani", rollno: 2, age: 18 },
  { firstname: "Mayank", lastname: "Bhadraka", rollno: 3, age: 16 },
  { firstname: "Milan", lastname: "Patel", rollno: 4, age: 25 },
  {
    firstname: "Harsh",
    lastname: "Makadiya",
    rollno: 5,
    age: 12,
  },
];

// FIND METHOD
const users_find = users.find((ele) => {
  return ele.age < 15;
});
console.log(
  "Find first user whose age is less than 15 using FIND: ",
  users_find
);

// REDUCE METHOD
// example 1
const sum_age = users.reduce((acc, user) => {
  return acc + user.age;
}, 0);
console.log("Calculate the SUM of all users age using REDUCE: ", sum_age);

// example 2
const ans_reduce2 = users.reduce((acc, curr) => {
  if (curr.rollno > 2) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log(
  "Create a array of users whose rollno is greater than 2 using REDUCE: ",
  ans_reduce2
);

// FILTER METHOD
const users_filter = users.filter((ele) => ele.rollno < 3);
console.log(
  "filter users whose rollno is less than 3 using FILTER: ",
  users_filter
);

//MAP METHOD
const users_map = users.map((key) => {
  if (key.age < 18) {
    return { ...key, age: 18 };
  }
  return key;
});
console.log(
  "change the age of user if it is less than 18 using MAP: ",
  users_map
);
