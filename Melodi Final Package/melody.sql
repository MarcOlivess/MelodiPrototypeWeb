-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: database-1.czwemuuyibvi.us-east-1.rds.amazonaws.com    Database: melody
-- ------------------------------------------------------
-- Server version	8.0.35

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `forumn_messages`
--

DROP TABLE IF EXISTS `forumn_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forumn_messages` (
  `message_id` int NOT NULL AUTO_INCREMENT,
  `forumn_id` int DEFAULT NULL,
  `message` varchar(4000) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `stamp` datetime DEFAULT NULL,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forumn_messages`
--

LOCK TABLES `forumn_messages` WRITE;
/*!40000 ALTER TABLE `forumn_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `forumn_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `goals` varchar(45) DEFAULT NULL,
  `gamesWon` int DEFAULT NULL,
  `highestRank` int DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `match_score` int DEFAULT NULL,
  `quiz_score` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Steri','piano',0,100,'steri.jpeg','steri','Test1234','steri@gmail.com',NULL,2,1,60,'[0,20,20,0]'),(2,'Sam','piano',0,20,'sam.jpeg','sam','Test1234','sam@test.com',NULL,2,1,100,'[0,20,0,0]'),(3,'Francis','piano',0,3,'francis.jpeg','francis','Test1234','francis@test.com',NULL,2,1,0,'[0,0,0,0]'),(4,'Mark','music theory',0,4,'mark.jpeg','mark','Test1234','mark@test.com',NULL,2,1,0,'[0,0,0,0]');
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_forumn_messages`
--

DROP TABLE IF EXISTS `view_forumn_messages`;
/*!50001 DROP VIEW IF EXISTS `view_forumn_messages`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_forumn_messages` AS SELECT 
 1 AS `message_id`,
 1 AS `forumn_id`,
 1 AS `message`,
 1 AS `user_id`,
 1 AS `stamp`,
 1 AS `name`,
 1 AS `username`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_forumn_messages`
--

/*!50001 DROP VIEW IF EXISTS `view_forumn_messages`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`admin`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_forumn_messages` AS select `f`.`message_id` AS `message_id`,`f`.`forumn_id` AS `forumn_id`,`f`.`message` AS `message`,`f`.`user_id` AS `user_id`,`f`.`stamp` AS `stamp`,`p`.`name` AS `name`,`p`.`username` AS `username` from (`forumn_messages` `f` join `profiles` `p` on((`f`.`user_id` = `p`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23 17:53:35
