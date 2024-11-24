INSERT INTO `departments` VALUES (1,100,'CSE');
INSERT INTO `departments` VALUES (2,50,'ECE');
INSERT INTO `departments` VALUES (3,30,'Mathematics');

INSERT INTO `employees` VALUES (1,'bhumikajindal@gmail.com','Bhumika','Jindal','/path/to/photo','Software Engineer',1);
INSERT INTO `employees` VALUES (2,'asijit@gmail.com','Asijit','Paul','/path/to/photo','Software Engineer',1);
INSERT INTO `employees` VALUES (3,'priyanka@iiitb.ac.in','Priyanka','Das','/path/to/photo','Professor',2);
INSERT INTO `employees` VALUES (4,'sachit.rao@iiitb.ac.in','Sachit','Rao','/path/to/photo','Professor',3);
INSERT INTO `employees` VALUES (5,'tapan@iiitb.ac.in','Tapan','Saha','/path/to/photo','Professor',3);
INSERT INTO `employees` VALUES (6,'murali@iiitb.ac.in','Muralidhara','V N','/path/to/photo','Professor',1);
INSERT INTO `employees` VALUES (7,'moutushi@iiitb.ac.in','Moutushi','Banerjee','/path/to/photo','Professor',1);

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

INSERT INTO `course_prerequisite` VALUES (9,10);
INSERT INTO `course_prerequisite` VALUES (17,10);
INSERT INTO `course_prerequisite` VALUES (14,11);
INSERT INTO `course_prerequisite` VALUES (9,12);
INSERT INTO `course_prerequisite` VALUES (14,12);
INSERT INTO `course_prerequisite` VALUES (15,13);
INSERT INTO `course_prerequisite` VALUES (16,13);
INSERT INTO `course_prerequisite` VALUES (16,14);
