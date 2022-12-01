-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: extreme_bank
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `user_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `balance` bigint DEFAULT NULL,
  `income` bigint DEFAULT NULL,
  `withdraw` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `account_no` int NOT NULL,
  `is_loan_eligible` int DEFAULT '1',
  `current_loan_id` int DEFAULT NULL,
  PRIMARY KEY (`id`,`account_no`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `acount_user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `account_no_UNIQUE` (`account_no`),
  KEY `current_loan_id` (`current_loan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`user_id`, `id`, `balance`, `income`, `withdraw`, `created_at`, `updated_at`, `account_no`, `is_loan_eligible`, `current_loan_id`) VALUES (1,1,9796,6100,12000,'2022-11-16 12:38:50','2022-11-16 12:38:50',12345,0,3),(2,2,74560,10,7000,'2022-11-16 12:38:50','2022-11-16 12:38:50',12346,1,NULL);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emi`
--

DROP TABLE IF EXISTS `emi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emi` (
  `user_id` int NOT NULL,
  `loan_id` int NOT NULL,
  `amount` varchar(45) DEFAULT NULL,
  `emi_no` tinyint DEFAULT NULL,
  `description` mediumtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`,`user_id`,`loan_id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emi`
--

LOCK TABLES `emi` WRITE;
/*!40000 ALTER TABLE `emi` DISABLE KEYS */;
INSERT INTO `emi` (`user_id`, `loan_id`, `amount`, `emi_no`, `description`, `created_at`, `updated_at`, `id`) VALUES (1,3,'3611.11',1,'ewrwer','2022-11-30 14:29:19','2022-11-30 14:29:19',14),(1,3,'3611.11',2,'ewrwer','2022-12-30 14:29:19','2022-12-30 14:29:19',15),(1,3,'3611.11',3,'ewrwer','2023-01-29 14:29:19','2023-01-29 14:29:19',16),(1,3,'3611.11',4,'ewrwer','2023-02-28 14:29:19','2023-02-28 14:29:19',17),(1,3,'3611.11',5,'ewrwer','2023-03-30 14:29:19','2023-03-30 14:29:19',18),(1,3,'3611.11',6,'ewrwer','2023-04-29 14:29:19','2023-04-29 14:29:19',19),(1,3,'3611.11',7,'ewrwer','2023-05-29 14:29:19','2023-05-29 14:29:19',20),(1,3,'3611.11',8,'ewrwer','2023-06-28 14:29:19','2023-06-28 14:29:19',21),(1,3,'3611.11',9,'ewrwer','2023-07-28 14:29:19','2023-07-28 14:29:19',22),(1,3,'3611.11',10,'ewrwer','2023-08-27 14:29:19','2023-08-27 14:29:19',23),(1,3,'3611.11',11,'ewrwer','2023-09-26 14:29:19','2023-09-26 14:29:19',24),(1,3,'3611.11',12,'ewrwer','2023-10-26 14:29:19','2023-10-26 14:29:19',25),(1,3,'3611.11',13,'ewrwer','2023-11-25 14:29:19','2023-11-25 14:29:19',26),(1,3,'3611.11',14,'ewrwer','2023-12-25 14:29:19','2023-12-25 14:29:19',27),(1,3,'3611.11',15,'ewrwer','2024-01-24 14:29:19','2024-01-24 14:29:19',28),(1,3,'3611.11',16,'ewrwer','2024-02-23 14:29:19','2024-02-23 14:29:19',29),(1,3,'3611.11',17,'ewrwer','2024-03-24 14:29:19','2024-03-24 14:29:19',30),(1,3,'3611.11',18,'ewrwer','2024-04-23 14:29:19','2024-04-23 14:29:19',31),(1,3,'3611.11',19,'ewrwer','2024-05-23 14:29:19','2024-05-23 14:29:19',32),(1,3,'3611.11',20,'ewrwer','2024-06-22 14:29:19','2024-06-22 14:29:19',33),(1,3,'3611.11',21,'ewrwer','2024-07-22 14:29:19','2024-07-22 14:29:19',34),(1,3,'3611.11',22,'ewrwer','2024-08-21 14:29:19','2024-08-21 14:29:19',35),(1,3,'3611.11',23,'ewrwer','2024-09-20 14:29:19','2024-09-20 14:29:19',36),(1,3,'3611.11',24,'ewrwer','2024-10-20 14:29:19','2024-10-20 14:29:19',37),(1,3,'3611.11',25,'ewrwer','2024-11-19 14:29:19','2024-11-19 14:29:19',38),(1,3,'3611.11',26,'ewrwer','2024-12-19 14:29:19','2024-12-19 14:29:19',39),(1,3,'3611.11',27,'ewrwer','2025-01-18 14:29:19','2025-01-18 14:29:19',40),(1,3,'3611.11',28,'ewrwer','2025-02-17 14:29:19','2025-02-17 14:29:19',41),(1,3,'3611.11',29,'ewrwer','2025-03-19 14:29:19','2025-03-19 14:29:19',42),(1,3,'3611.11',30,'ewrwer','2025-04-18 14:29:19','2025-04-18 14:29:19',43),(1,3,'3611.11',31,'ewrwer','2025-05-18 14:29:19','2025-05-18 14:29:19',44),(1,3,'3611.11',32,'ewrwer','2025-06-17 14:29:19','2025-06-17 14:29:19',45),(1,3,'3611.11',33,'ewrwer','2025-07-17 14:29:19','2025-07-17 14:29:19',46),(1,3,'3611.11',34,'ewrwer','2025-08-16 14:29:19','2025-08-16 14:29:19',47),(1,3,'3611.11',35,'ewrwer','2025-09-15 14:29:19','2025-09-15 14:29:19',48),(1,3,'3611.11',36,'ewrwer','2025-10-15 14:29:19','2025-10-15 14:29:19',49),(1,3,'3611.11',37,'ewrwer','2025-11-14 14:29:19','2025-11-14 14:29:19',50),(1,3,'3611.11',38,'ewrwer','2025-12-14 14:29:19','2025-12-14 14:29:19',51),(1,3,'3611.11',39,'ewrwer','2026-01-13 14:29:19','2026-01-13 14:29:19',52);
/*!40000 ALTER TABLE `emi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `account_no` int NOT NULL,
  `nid` varchar(45) NOT NULL,
  `loan_purpose` varchar(200) DEFAULT NULL,
  `amount` int NOT NULL,
  `loan_duration` tinyint DEFAULT NULL,
  `expired_at` timestamp NULL DEFAULT NULL,
  `description` mediumtext,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `interest_rate` tinyint NOT NULL,
  `monthly_emi` double DEFAULT NULL,
  `loanscol` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_id`,`account_no`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` (`id`, `user_id`, `account_no`, `nid`, `loan_purpose`, `amount`, `loan_duration`, `expired_at`, `description`, `created_at`, `updated_at`, `interest_rate`, `monthly_emi`, `loanscol`) VALUES (1,1,12345,'4864241254656545','education',50000,2,'2022-11-28 20:45:43',NULL,'2021-11-29 20:45:43','2022-11-29 20:45:43',10,2500,NULL),(2,1,12345,'4864241254656545','education',1233,1,'2022-11-28 20:45:54',NULL,'2022-11-29 20:45:54','2022-11-29 20:45:54',10,113.03,NULL),(3,1,12345,'4864241254656545','education',100000,3,'2022-11-28 20:47:20',NULL,'2022-12-29 20:47:20','2022-11-29 20:47:20',10,3611.11,NULL),(4,1,12345,'4864241254656545','education',40000,1,'2022-11-28 20:47:34',NULL,'2022-10-19 20:47:34','2022-11-29 20:47:34',5,3500,NULL),(5,1,12345,'4864241254656545','education',1233,1,'2022-11-28 20:48:05',NULL,'2022-11-29 20:48:05','2022-11-29 20:48:05',0,102.75,NULL);
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `amount` int NOT NULL,
  `description` longtext,
  `payment_type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`transaction_id`,`sender`,`receiver`),
  UNIQUE KEY `transaction_id` (`transaction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` (`sender`, `receiver`, `amount`, `description`, `payment_type`, `created_at`, `updated_at`, `transaction_id`) VALUES (1,1,123,'Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 17:40:17','2022-11-21 17:40:17',8),(1,1,1000,'Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Vivamus suscipit tortor eget felis porttitor volutpat.',NULL,'2022-11-21 18:18:39','2022-11-21 18:18:39',10),(1,2,5000,'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Pellentesque in ipsum id orci porta dapibus. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nVivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Vivamus suscipit tortor eget felis porttitor volutpat. Nulla quis lorem ut libero malesuada feugiat. Cras ultricies ligula sed magna dictum porta. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.','Bank','2022-11-21 19:10:42','2022-11-21 19:10:42',13),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:03','2022-11-21 19:12:03',14),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:06','2022-11-21 19:12:06',15),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:08','2022-11-21 19:12:08',16),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:10','2022-11-21 19:12:10',17),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:12','2022-11-21 19:12:12',18),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:14','2022-11-21 19:12:14',19),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:15','2022-11-21 19:12:15',20),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:18','2022-11-21 19:12:18',21),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:18','2022-11-21 19:12:18',22),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:20','2022-11-21 19:12:20',23),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:23','2022-11-21 19:12:23',24),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:27','2022-11-21 19:12:27',25),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:27','2022-11-21 19:12:27',26),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:28','2022-11-21 19:12:28',27),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:29','2022-11-21 19:12:29',28),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:29','2022-11-21 19:12:29',29),(1,2,3000,'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec sollicitudin molestie malesuada.\n\nCurabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Nulla porttitor accumsan tincidunt. Curabitur aliquet quam id dui posuere blandit. Vivamus suscipit tortor eget felis porttitor volutpat.','Bank','2022-11-21 19:12:33','2022-11-21 19:12:33',30),(1,2,2000,'Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.\n\nPellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat.\n\nDonec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada.','Bank','2022-11-21 19:33:09','2022-11-21 19:33:09',31),(1,2,5000,'Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.\n\nPellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat.\n\nDonec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada.','Bank','2022-11-21 19:33:43','2022-11-21 19:33:43',32),(1,2,5000,'Donec sollicitudin molestie malesuada. Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta.\n\nPellentesque in ipsum id orci porta dapibus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vivamus suscipit tortor eget felis porttitor volutpat.\n\nDonec rutrum congue leo eget malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Donec sollicitudin molestie malesuada.','Bank','2022-11-21 19:33:50','2022-11-21 19:33:50',33),(2,1,1000,'Nulla quis lorem ut libero malesuada feugiat. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.\n\nNulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta.\n\nDonec sollicitudin molestie malesuada. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.','Bank','2022-11-21 19:40:15','2022-11-21 19:40:15',34),(2,1,5000,'Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh.\n\nVestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim.\n\nVivamus suscipit tortor eget felis porttitor volutpat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.','Bank','2022-11-21 19:42:10','2022-11-21 19:42:10',35),(2,1,1000,'Nulla porttitor accumsan tincidunt. Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh.\n\nVestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut lacinia in, elementum id enim.\n\nVivamus suscipit tortor eget felis porttitor volutpat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.','Bank','2022-11-21 19:42:15','2022-11-21 19:42:15',36);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `user_id` int NOT NULL AUTO_INCREMENT,
  `avatar` varchar(300) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `roles` json DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id_UNIQUE` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`username`, `email`, `password`, `created_at`, `first_name`, `last_name`, `user_id`, `avatar`, `updated_at`, `roles`) VALUES ('Rasel mahmud','rasel.mahmud.dev@gmail.com','$2a$14$4hB09bFbvq2gbbNqvJ68r.ABq5U9VBkH2ISISGIlnOppLpR0I0QHe','2022-11-15 12:47:51','Rasel','mahmud',1,'/core-avatar-250.jpg','2022-11-15 12:47:51','[\"CUSTOMER\"]'),('Raju Sarker','raju@sarker.com','$2a$14$fJjbdRihBcGIzAan1gugsubsWTxBwun6tC9ISpJG.MGmKJPcZMdbG','2022-11-15 12:49:15','Raju','sarker',2,NULL,'2022-11-15 12:49:15','[\"CUSTOMER\"]'),('Rasel mahmud','rasel.mahmud.dev3@gmail.com','$2a$14$1HJqENuKZv3p3UVHh1JjJecS06XXYThjA7bi.oDknAhLNGp30jjmK','2022-11-15 12:57:18','Rasel','mahmud',3,NULL,'2022-11-15 12:57:18',NULL),('Rasel mahmud','rasel.mahmud.dev4@gmail.com','$2a$14$glIpJikZtAwG6bPOjoka.e.pOGXEKWMDFtLgAopucHiR0dLpk0ve6','2022-11-15 12:59:43','Rasel','mahmud',4,NULL,'2022-11-15 12:59:43',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-01  0:25:38
