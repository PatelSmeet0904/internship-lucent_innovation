const fName = document.querySelector("#inputfname");
const lName = document.querySelector("#inputlname");
const phone = document.querySelector("#phone");
const email = document.querySelector("#inputemail");
const address1 = document.querySelector("#inputAddress");
const address2 = document.querySelector("#inputAddress2");
const pincode = document.querySelector("#inputZip");
const studentEditForm = document.getElementById("studentEditForm");

// get data from local storage
let students = [];
if (localStorage.getItem("Students") === null) {
  studentTable.innerHTML = "No Students Found";
} else {
  students = JSON.parse(localStorage.getItem("Students"));
  getStudetsData();
}

function getStudetsData() {
  let table = `<table>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th></th>
                        <th></th>
                    </tr>`;

  students.map((student, index) => {
    table += `
                <tr>
                    <td>${student.Sid}</td>
                    <td>${student.fname}</td>
                    <td>${student.lname}</td>
                    <td>${student.phone}</td>
                    <td>${student.email}</td>
                    <td>${student.address1}, ${student.address2}, pincode - ${student.pincode}</td>
                    <td><button type="submit" class="btn table-button" onclick="removeStudent(${student.Sid})">DELETE</button></td>
                    <td><button type="submit" class="btn table-button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onclick="setCurrentdataBeforEdit(${student.Sid}, ${index})">
                    EDIT
                    </button></td>
                </tr>
            `;
  });

  table += `        
                </table>
            `;

  const studentTable = document.getElementById("studentsTable");
  studentTable.innerHTML = table;
}

// Remove student data
function removeStudent(Sid) {
  console.log(Sid, students);
  students = students.filter((student) => student.Sid !== +Sid);
  localStorage.setItem("Students", JSON.stringify(students));
  getStudetsData();
}

let key;
function setCurrentdataBeforEdit(Sid, index) {
  key = index;
  const editStudent = students[key];
  console.log(Sid, editStudent);
  fName.value = editStudent.fname;
  lName.value = editStudent.lname;
  email.value = editStudent.email;
  phone.value = editStudent.phone;
  address1.value = editStudent.address1;
  address2.value = editStudent.address2;
  pincode.value = editStudent.pincode;
}

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

function editStudentData() {
  students[key] = {
    Sid: students[key].Sid,
    fname: fName.value,
    lname: lName.value,
    phone: phone.value,
    email: email.value,
    address1: address1.value,
    address2: address2.value,
    pincode: pincode.value,
  };
  localStorage.setItem("Students", JSON.stringify(students));
}
