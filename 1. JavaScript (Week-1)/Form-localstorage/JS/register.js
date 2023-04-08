// creating class for Student
class StudentAccount {
  Sid;
  fName;
  lname;
  phone;
  email;
  address1;
  address2;
  pincode;

  constructor(fName, lName, phone, email, address1, address2, pincode) {
    this.Sid = Date.now();
    this.fname = fName;
    this.lname = lName;
    this.phone = phone;
    this.email = email;
    this.address1 = address1;
    this.address2 = address2;
    this.pincode = pincode;
  }
}

// getting students data
let students = JSON.parse(localStorage.getItem("Students")) || [];
console.log(students);

// get html elements
const studentForm = document.getElementById("studentForm");
const fName = document.querySelector("#fName");
const lName = document.querySelector("#lName");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const pincode = document.querySelector("#pincode");


// Validation for Email, Phone, Pincode
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

phone.onkeypress = function (e) {
  var a = [];
  var k = e.which;
  console.log("phone");

  for (i = 48; i < 58; i++) a.push(i);

  if (!(a.indexOf(k) >= 0)) e.preventDefault();
};

pincode.onkeypress = function (e) {
  var a = [];
  var k = e.which;

  for (i = 48; i < 58; i++) a.push(i);

  if (!(a.indexOf(k) >= 0)) e.preventDefault();
};

// student-form submit handler
studentForm.addEventListener("submit", (e) => {
  const registeredStudent = students.filter(
    (student) => student.email === email.value
  ).length;
  console.log(registeredStudent);
  
  if (registeredStudent === 0 && validateEmail(email.value)) {
    const student = new StudentAccount(
      fName.value,
      lName.value,
      phone.value,
      email.value,
      address1.value,
      address2.value,
      pincode.value
    );
    students.push(student);
    localStorage.setItem("Students", JSON.stringify(students));
  } else if (!validateEmail(email.value)) {
    e.preventDefault();
    alert("Wrong email!! format: example@gmail.com");
  } else {
    e.preventDefault();
    alert("Student already exists!! change the email");
  }
});
