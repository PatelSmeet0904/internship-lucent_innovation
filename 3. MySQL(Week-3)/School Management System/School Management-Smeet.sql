-- create database
create database school_management_system;
use school_management_system;

-- create users
CREATE USER 'adminuser'@'localhost' IDENTIFIED BY 'admin1234';
CREATE USER 'dbuser'@'localhost' IDENTIFIED BY '1234';

-- grant privileges

GRANT CREATE, ALTER, DROP ON school_management_system.* TO 'adminuser'@'localhost';
GRANT INSERT, UPDATE, DELETE, SELECT on school_management_system.* TO 'dbuser'@'localhost';
SHOW GRANTS FOR 'adminuser'@'localhost';

--              -------------------- All Tables ----------------------

-- Main table
CREATE TABLE User (
  user_id varchar(10) NOT NULL,
  role_name varchar(50) NOT NULL,
  PRIMARY KEY (user_id)
);

INSERT INTO User VALUES ('A', 'Admin'), ('T','Teacher'), ('S','Student');

ALTER TABLE User
ADD description varchar(50);

ALTER TABLE `question`
  CHANGE COLUMN `question` `question` VARCHAR(10000);


-- student table
CREATE TABLE Student (
  Sid int NOT NULL auto_increment,
  full_name varchar(50) NOT NULL,
  date_of_admission timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leaving_date timestamp DEFAULT null,
  date_of_birth date NOT NULL,
  Uid varchar(10) not null,
  Cid int(3) not null,
  PRIMARY KEY (sid),
  foreign key (Uid) references User(user_id),
  foreign key (Cid) references Class(Cid)
)auto_increment=2101;

INSERT INTO `school_management_system`.`student` (`full_name`, `date_of_birth`, `Uid`, `Cid`) 
VALUES ('Smeet patel', '2002-09-04', 'S', '1005'),
('Rudra Patel', '2002-09-04', 'S', '1005'),
('Milan patel', '2010-03-12', 'S', '1001'),
('Harsh Makadiya', '2010-04-21', 'S', '1001'),
('Yuvraj Baser', '2009-02-17', 'S', '1002'),
('Mahak Mujavadiya', '2009-10-17', 'S', '1002'),
('Smriti Kimtee', '2008-09-15', 'S', '1003'),
('Bhargav Valani', '2008-05-13', 'S', '1003'),
('Mire Patel', '2007-06-26', 'S', '1004'),
('Mit Patel', '2007-05-25', 'S', '1004');


-- teacher table
CREATE TABLE Teacher (
  Tid int NOT NULL auto_increment,
  full_name varchar(50) NOT NULL,
  date_of_joining timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  leaving_date timestamp DEFAULT null,
  date_of_birth date NOT NULL,
  Uid varchar(10) not null,
  PRIMARY KEY (Tid),
  foreign key (Uid) references User(user_id)
)auto_increment=1101;

INSERT INTO `school_management_system`.`teacher` (`full_name`, `date_of_birth`, `Uid`) 
VALUES ('Praful Patel', '1976-12-15', 'T'), ('Neeta Patel', '1976-05-31', 'T'), ('Vrushank Ariwala', '1986-12-15', 'T');


-- class table
create table Class (
	Cid int NOT NULL auto_increment,
    class_name varchar(50) not null,
    primary key (Cid)
)auto_increment=1001;

INSERT INTO `school_management_system`.`class` (`class_name`) VALUES ('1st standard');
INSERT INTO `school_management_system`.`class` (`class_name`) VALUES ('2nd standard');
INSERT INTO `school_management_system`.`class` (`class_name`) VALUES ('3rd standard');
INSERT INTO `school_management_system`.`class` (`class_name`) VALUES ('4th standard');
INSERT INTO `school_management_system`.`class` (`class_name`) VALUES ('5th standard');


-- subject table
create table Subject(
	sub_id int NOT NULL auto_increment,
    sub_name varchar(50) not null,
    primary key (sub_id)
)auto_increment=2001;

INSERT INTO `school_management_system`.`subject` (`sub_name`) VALUES ('Drawing');
INSERT INTO `school_management_system`.`subject` (`sub_name`) VALUES ('Maths');
INSERT INTO `school_management_system`.`subject` (`sub_name`) VALUES ('Science');
INSERT INTO `school_management_system`.`subject` (`sub_name`) VALUES ('English');


-- teacher-class-subject table
create table TeacherClassSubject(
	Tid int not null,
	Cid int not null,
    sub_id int not null,
    primary key (Tid, Cid, sub_id),
	foreign key (Tid) references Teacher(Tid),
    foreign key (Cid) references Class(Cid),
    foreign key (sub_id) references Subject(sub_id)
);

INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1101', '1001', '2001');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1103', '1001', '2002');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1101', '1002', '2001');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1103', '1002', '2002');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1101', '1003', '2002');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1102', '1003', '2004');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1102', '1004', '2002');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1103', '1004', '2003');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1102', '1005', '2002');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1102', '1005', '2003');
INSERT INTO `school_management_system`.`teacherclasssubject` (`Tid`, `Cid`, `sub_id`) VALUES ('1103', '1005', '2004');


-- chapter table
create table Chapter(
	ch_id int NOT NULL auto_increment,
    ch_name varchar(50) not null,
    sub_id int not null,
    primary key (ch_id),
    foreign key (sub_id) references Subject(sub_id)
)auto_increment=3001;

INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Graphic Design', '2001');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Visual arts', '2001');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Complex Numbers and Quadratic Equations', '2002');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Permutations and Combinations', '2002');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Quantum Numbers', '2003');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Periodic Properties of Elements', '2003');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('The Lazy Frog', '2004');
INSERT INTO `school_management_system`.`chapter` (`ch_name`, `sub_id`) VALUES ('Topsy Turvey Land', '2004');


-- Question Table
create table Question(
	Qid int NOT NULL auto_increment,
    question varchar(50) not null,
    ch_id int not null,
    que_type_id int not null,
    primary key (Qid),
    foreign key (ch_id) references Chapter(ch_id),
    foreign key (que_type_id) references QuestionType(que_type_id)
)auto_increment=4001;

INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('The _____ arts are those that pertain to writing or drawing.', '3001', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('Draw a painting of sunset at hill station.', '3002', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('If arg (z – 1) = arg (z + 3i), then find x – 1 : y. where z = x + iy', '3003', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('Using all the letters of the word GIFT how many distinct words can be formed?', '3004', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('_____ quantum numbers can distinguish between two electrons present in the same orbital?', '3005', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('___ and ____ can be tested using a litmus paper.', '3006', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES (' His poor old mother calls in vain_____________', '3007', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('In the topsy- turvy land, the people walk on their.......', '3008', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('he sum of the series i + i2 + i3 + …. Upto 1000 terms is………… ', '3003', '4401');
INSERT INTO `school_management_system`.`question` (`question`, `ch_id`, `que_type_id`) VALUES ('Find out ____ distinct three-digit numbers can be formed using all the digits of 1, 2, and 3.', '3004', '4401');


-- question type table
create table QuestionType(
	que_type_id int(3) NOT NULL auto_increment,
    que_type_name varchar(20) not null,
    primary key (que_type_id)
)auto_increment=4401;

INSERT INTO `school_management_system`.`questiontype` (`que_type_name`) VALUES ('Fill in the blanks');


-- answer table
create table Answer(
	ans_id int NOT NULL auto_increment,
    answer varchar(50) not null,
    Qid int not null,
    primary key (ans_id),
    foreign key (Qid) references Question(Qid)
)auto_increment=5001;

INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('graphic', '4001');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('Painting', '4002');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES (' (x – 1): y = 1: 3', '4003');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES (' 0', '4009');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('24', '4004');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('6', '4010');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('Spin quantum number', '4005');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('acidic nature', '4006');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('basic nature', '4006');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('come in and help', '4007');
INSERT INTO `school_management_system`.`answer` (`answer`, `Qid`) VALUES ('feet', '4008');


-- exam table
create table Exam(
	exam_id int NOT NULL auto_increment,
    date_of_exam timestamp not null default current_timestamp,
    marks int(3) default 100,
    Cid int not null,
    sub_id int not null,
    primary key (exam_id),
    foreign key (Cid) references Class(Cid),
    foreign key (sub_id) references Subject(sub_id)
)auto_increment=6001;

INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1001', '2001');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1002', '2001');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1003', '2002');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1004', '2003');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1005', '2004');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1001', '2002');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1002', '2004');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1003', '2004');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1004', '2002');
INSERT INTO `school_management_system`.`exam` (`Cid`, `sub_id`) VALUES ('1005', '2003');


-- exam result table
create table ExamResult(
	exam_id int not null,
    Sid int not null,
	date_of_result timestamp not null default current_timestamp,
    score int(3) not null,
    foreign key (exam_id) references Exam(exam_id),
    foreign key (Sid) references Student(Sid),
    primary key (exam_id, Sid)
);

INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6001', '2101', '75');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6001', '2102', '84');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6002', '2103', '99');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6002', '2104', '67');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6003', '2105', '89');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6003', '2106', '78');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6004', '2107', '27');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6004', '2108', '76');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6005', '2109', '78');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6015', '2110', '97');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6006', '2101', '84');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6006', '2102', '99');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6007', '2103', '79');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6007', '2104', '80');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6008', '2107', '57');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6008', '2108', '31');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6009', '2109', '49');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6009', '2110', '100');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6010', '2109', '43');
INSERT INTO `school_management_system`.`examresult` (`exam_id`, `Sid`, `score`) VALUES ('6010', '2110', '100');
