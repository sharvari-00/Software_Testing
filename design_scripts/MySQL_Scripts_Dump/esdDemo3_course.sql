-- MySQL dump 10.13  Distrib 8.0.35, for Linux (x86_64)
--
-- Host: localhost    Database: esdDemo3
-- ------------------------------------------------------
-- Server version	8.0.35-0ubuntu0.23.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `capacity` int NOT NULL,
  `course_code` varchar(255) NOT NULL,
  `credits` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `term` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `employee_id` int NOT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `UK_pbtxfti950chth4yw1wafaf9f` (`course_code`),
  KEY `FKfrthkra6k3s4jhnwkyj0uv9i3` (`employee_id`),
  CONSTRAINT `FKfrthkra6k3s4jhnwkyj0uv9i3` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES (8,60,'CS-301',4,'Database Management Systems','DBMS','Spring',2023,7);
INSERT INTO `course` VALUES (9,100,'CS-511',10,'Data Structures & Algorithms','Algorithms','Fall',2023,6);
INSERT INTO `course` VALUES (10,200,'CS-501',10,'Coding in C and C++','Programming','Spring',2023,2);
INSERT INTO `course` VALUES (11,50,'M-101',5,'Engineering Mathematics','Probability & Statistics','Summer',2021,3);
INSERT INTO `course` VALUES (12,100,'M-102',4,'Engineering Mathematics','Linear Algebra','Winter',2022,4);
INSERT INTO `course` VALUES (13,50,'AI-511',6,'Data Science','Machine Learning','Spring',2023,5);
INSERT INTO `course` VALUES (14,40,'AI-512',10,'Mathematics for ML & AI','Maths for Machine Learning','Spring',2023,1);
INSERT INTO `course` VALUES (15,100,'AI-611',10,'Natural Langauage Processing','NLP','Spring',2023,2);
INSERT INTO `course` VALUES (16,100,'AI-612',10,'Few-Shot Learning','FSL','Fall',2023,3);
INSERT INTO `course` VALUES (17,150,'CS-512',8,'Linux and Full-Stack Development','Software Systems','Fall',2023,5);
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-01  1:53:57
