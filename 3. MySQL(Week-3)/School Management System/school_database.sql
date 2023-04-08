-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: localhost    Database: school_management_system
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `ans_id` int NOT NULL AUTO_INCREMENT,
  `answer` varchar(50) NOT NULL,
  `Qid` int NOT NULL,
  PRIMARY KEY (`ans_id`),
  KEY `Qid` (`Qid`),
  CONSTRAINT `answer_ibfk_1` FOREIGN KEY (`Qid`) REFERENCES `question` (`Qid`)
) ENGINE=InnoDB AUTO_INCREMENT=5012 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (5001,'graphic',4001),(5002,'Painting',4002),(5003,' (x – 1): y = 1: 3',4003),(5004,' 0',4009),(5005,'24',4004),(5006,'6',4010),(5007,'Spin quantum number',4005),(5008,'acidic nature',4006),(5009,'basic nature',4006),(5010,'come in and help',4007),(5011,'feet',4008);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapter` (
  `ch_id` int NOT NULL AUTO_INCREMENT,
  `ch_name` varchar(50) NOT NULL,
  `sub_id` int NOT NULL,
  PRIMARY KEY (`ch_id`),
  KEY `sub_id` (`sub_id`),
  CONSTRAINT `chapter_ibfk_1` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (3001,'Graphic Design',2001),(3002,'Visual arts',2001),(3003,'Complex Numbers and Quadratic Equations',2002),(3004,'Permutations and Combinations',2002),(3005,'Quantum Numbers',2003),(3006,'Periodic Properties of Elements',2003),(3007,'The Lazy Frog',2004),(3008,'Topsy Turvey Land',2004);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class`
--

DROP TABLE IF EXISTS `class`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class` (
  `Cid` int NOT NULL AUTO_INCREMENT,
  `class_name` varchar(50) NOT NULL,
  PRIMARY KEY (`Cid`)
) ENGINE=InnoDB AUTO_INCREMENT=1006 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class`
--

LOCK TABLES `class` WRITE;
/*!40000 ALTER TABLE `class` DISABLE KEYS */;
INSERT INTO `class` VALUES (1001,'1st standard'),(1002,'2nd standard'),(1003,'3rd standard'),(1004,'4th standard'),(1005,'5th standard');
/*!40000 ALTER TABLE `class` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam`
--

DROP TABLE IF EXISTS `exam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exam` (
  `exam_id` int NOT NULL AUTO_INCREMENT,
  `date_of_exam` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `marks` int DEFAULT '100',
  `Cid` int NOT NULL,
  `sub_id` int NOT NULL,
  PRIMARY KEY (`exam_id`),
  KEY `Cid` (`Cid`),
  KEY `sub_id` (`sub_id`),
  CONSTRAINT `exam_ibfk_1` FOREIGN KEY (`Cid`) REFERENCES `class` (`Cid`),
  CONSTRAINT `exam_ibfk_2` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6011 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam`
--

LOCK TABLES `exam` WRITE;
/*!40000 ALTER TABLE `exam` DISABLE KEYS */;
INSERT INTO `exam` VALUES (6001,'2023-01-16 12:23:05',100,1001,2001),(6002,'2023-01-16 12:23:05',100,1002,2001),(6003,'2023-01-16 12:23:05',100,1003,2002),(6004,'2023-01-16 12:23:05',100,1004,2004),(6005,'2023-01-16 12:23:05',100,1005,2004),(6006,'2023-01-16 12:23:05',100,1001,2002),(6007,'2023-01-16 12:23:05',100,1002,2002),(6008,'2023-01-16 12:23:05',100,1004,2002),(6009,'2023-01-16 12:23:05',100,1005,2002),(6010,'2023-01-16 12:23:05',100,1005,2003);
/*!40000 ALTER TABLE `exam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examresult`
--

DROP TABLE IF EXISTS `examresult`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `examresult` (
  `exam_id` int NOT NULL,
  `Sid` int NOT NULL,
  `date_of_result` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `score` int NOT NULL,
  PRIMARY KEY (`exam_id`,`Sid`),
  KEY `Sid` (`Sid`),
  CONSTRAINT `examresult_ibfk_1` FOREIGN KEY (`exam_id`) REFERENCES `exam` (`exam_id`),
  CONSTRAINT `examresult_ibfk_2` FOREIGN KEY (`Sid`) REFERENCES `student` (`Sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examresult`
--

LOCK TABLES `examresult` WRITE;
/*!40000 ALTER TABLE `examresult` DISABLE KEYS */;
INSERT INTO `examresult` VALUES (6001,2101,'2023-01-16 12:51:57',75),(6001,2102,'2023-01-16 12:51:57',84),(6002,2103,'2023-01-16 12:51:57',99),(6002,2104,'2023-01-16 12:51:57',67),(6003,2105,'2023-01-16 12:51:57',84),(6003,2106,'2023-01-16 12:51:57',79),(6004,2107,'2023-01-16 12:51:57',27),(6004,2108,'2023-01-16 12:51:57',80),(6005,2109,'2023-01-16 12:51:57',89),(6005,2110,'2023-01-16 12:51:57',97),(6006,2101,'2023-01-16 12:51:57',31),(6006,2102,'2023-01-16 12:51:57',78),(6007,2103,'2023-01-16 12:51:57',96),(6007,2104,'2023-01-16 12:51:57',49),(6008,2107,'2023-01-16 12:51:57',81),(6008,2108,'2023-01-16 12:51:57',76),(6009,2109,'2023-01-16 12:51:57',78),(6009,2110,'2023-01-16 12:51:57',100),(6010,2109,'2023-01-16 12:51:57',82),(6010,2110,'2023-01-16 12:51:57',100);
/*!40000 ALTER TABLE `examresult` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `Qid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(10000) DEFAULT NULL,
  `ch_id` int NOT NULL,
  `que_type_id` int NOT NULL,
  PRIMARY KEY (`Qid`),
  KEY `ch_id` (`ch_id`),
  KEY `que_type_id` (`que_type_id`),
  CONSTRAINT `question_ibfk_1` FOREIGN KEY (`ch_id`) REFERENCES `chapter` (`ch_id`),
  CONSTRAINT `question_ibfk_2` FOREIGN KEY (`que_type_id`) REFERENCES `questiontype` (`que_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4034 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (4001,'The _____ arts are those that pertain to writing or drawing.',3001,4401),(4002,'Draw a painting of sunset at hill station.',3002,4401),(4003,'If arg (z â€“ 1) = arg (z + 3i), then find x â€“ 1 : y. where z = x + iy',3003,4401),(4004,'Using all the letters of the word GIFT how many distinct words can be formed?',3004,4401),(4005,'_____ quantum numbers can distinguish between two electrons present in the same orbital?',3005,4401),(4006,'___ and ____ can be tested using a litmus paper.',3006,4401),(4007,' His poor old mother calls in vain_____________',3007,4401),(4008,'In the topsy- turvy land, the people walk on their.......',3008,4401),(4009,'he sum of the series i + i2 + i3 + â€¦. Upto 1000 terms isâ€¦â€¦â€¦â€¦ ',3003,4401),(4010,'Find out ____ distinct three-digit numbers can be formed using all the digits of 1, 2, and 3.',3004,4401);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questiontype`
--

DROP TABLE IF EXISTS `questiontype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questiontype` (
  `que_type_id` int NOT NULL AUTO_INCREMENT,
  `que_type_name` varchar(20) NOT NULL,
  PRIMARY KEY (`que_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4402 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questiontype`
--

LOCK TABLES `questiontype` WRITE;
/*!40000 ALTER TABLE `questiontype` DISABLE KEYS */;
INSERT INTO `questiontype` VALUES (4401,'Fill in the blanks');
/*!40000 ALTER TABLE `questiontype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `Sid` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `date_of_admission` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `leaving_date` timestamp NULL DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  `Uid` varchar(10) NOT NULL,
  `Cid` int NOT NULL,
  PRIMARY KEY (`Sid`),
  KEY `Uid` (`Uid`),
  KEY `Cid` (`Cid`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`user_id`),
  CONSTRAINT `student_ibfk_2` FOREIGN KEY (`Cid`) REFERENCES `class` (`Cid`)
) ENGINE=InnoDB AUTO_INCREMENT=2111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (2101,'Mit patel','2023-01-16 10:38:11',NULL,'2002-09-04','S',1001),(2102,'Rudra Patel','2023-01-16 10:38:11',NULL,'2002-09-04','S',1001),(2103,'Milan patel','2023-01-16 10:38:11',NULL,'2010-03-12','S',1002),(2104,'Harsh Makadiya','2023-01-16 10:38:11',NULL,'2010-04-21','S',1002),(2105,'Yuvraj Baser','2023-01-16 10:38:11',NULL,'2009-02-17','S',1003),(2106,'Mahak Mujavadiya','2023-01-16 10:38:11',NULL,'2009-10-17','S',1003),(2107,'Smriti Kimtee','2023-01-16 10:38:11',NULL,'2008-09-15','S',1004),(2108,'Bhargav Valani','2023-01-16 10:38:11',NULL,'2008-05-13','S',1004),(2109,'Mire Patel','2023-01-16 10:38:11',NULL,'2007-06-26','S',1005),(2110,'Smeet Patel','2023-01-16 10:38:11',NULL,'2007-05-25','S',1005);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `sub_id` int NOT NULL AUTO_INCREMENT,
  `sub_name` varchar(50) NOT NULL,
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2005 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
INSERT INTO `subject` VALUES (2001,'Drawing'),(2002,'Maths'),(2003,'Science'),(2004,'English');
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `Tid` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(50) NOT NULL,
  `date_of_joining` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `leaving_date` timestamp NULL DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  `Uid` varchar(10) NOT NULL,
  PRIMARY KEY (`Tid`),
  KEY `Uid` (`Uid`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`Uid`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1101,'Praful Patel','2023-01-16 10:20:31',NULL,'1976-12-15','T'),(1102,'Neeta Patel','2023-01-16 10:24:09',NULL,'1976-05-31','T'),(1103,'Vrushank Ariwala','2023-01-16 10:24:09',NULL,'1986-12-15','T');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacherclasssubject`
--

DROP TABLE IF EXISTS `teacherclasssubject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacherclasssubject` (
  `Tid` int NOT NULL,
  `Cid` int NOT NULL,
  `sub_id` int NOT NULL,
  PRIMARY KEY (`Tid`,`Cid`,`sub_id`),
  KEY `Cid` (`Cid`),
  KEY `sub_id` (`sub_id`),
  CONSTRAINT `teacherclasssubject_ibfk_1` FOREIGN KEY (`Tid`) REFERENCES `teacher` (`Tid`),
  CONSTRAINT `teacherclasssubject_ibfk_2` FOREIGN KEY (`Cid`) REFERENCES `class` (`Cid`),
  CONSTRAINT `teacherclasssubject_ibfk_3` FOREIGN KEY (`sub_id`) REFERENCES `subject` (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacherclasssubject`
--

LOCK TABLES `teacherclasssubject` WRITE;
/*!40000 ALTER TABLE `teacherclasssubject` DISABLE KEYS */;
INSERT INTO `teacherclasssubject` VALUES (1101,1001,2001),(1103,1001,2002),(1101,1002,2001),(1103,1002,2002),(1101,1003,2002),(1102,1003,2004),(1102,1004,2002),(1103,1004,2003),(1102,1005,2002),(1102,1005,2003),(1103,1005,2004);
/*!40000 ALTER TABLE `teacherclasssubject` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(10) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('A','Admin'),('S','Student'),('T','Teacher');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-28 21:56:08
